import Token from '../../models/Token'
import { sign, verify } from 'jsonwebtoken'
import dayjs from 'dayjs'
import {
  ICreateToken,
  IPayload,
  ISaveToken,
  IToken,
  ITokenValidate
} from '../../types'

const REFRESH_TOKEN_EXPIRES_IN = 3 // Days
const TOKEN_EXPIRES_IN = 60 // Minutes
const EMAIL_TOKEN_EXPIRES_IN = 5 // Minutes
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EMAIL_TOKEN_SECRET } =
  process.env

export class TokenService {
  public constructor() {}

  public async createUserToken({ _id, content }: IPayload) {
    try {
      if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
        throw new Error('Token secret is missing!')

      const accessToken = this._createToken({
        payload: {
          content,
          role: 'accessToken'
        },
        sub: _id,
        expiresIn: `${TOKEN_EXPIRES_IN}m`,
        secret: ACCESS_TOKEN_SECRET
      })
      if (!accessToken.success)
        throw new Error('Error in access token creation.')

      const refreshToken = this._createToken({
        payload: {
          content,
          role: 'refreshToken'
        },
        sub: _id,
        expiresIn: `${REFRESH_TOKEN_EXPIRES_IN}d`,
        secret: REFRESH_TOKEN_SECRET
      })
      if (!refreshToken.success)
        throw new Error('Error in refresh token creation.')

      const refreshTokenExpiresDate = dayjs()
        .add(REFRESH_TOKEN_EXPIRES_IN, 'day')
        .toDate()

      const newRefreshToken = {
        refreshToken: refreshToken.token,
        expireDat: refreshTokenExpiresDate,
        userToken: _id
      }

      await this._saveToken({ _id, refreshToken: newRefreshToken })

      return {
        success: true,
        tokens: {
          accessToken: accessToken.token,
          refreshToken: refreshToken.token
        }
      }
    } catch (error) {
      console.error('Error in creating user token:', error)
      return { success: false, error }
    }
  }

  public emailToken({ _id, content }: IPayload) {
    try {
      if (!EMAIL_TOKEN_SECRET) throw new Error('Token secret is missing!')

      const emailToken = this._createToken({
        payload: {
          content,
          role: 'emailToken'
        },
        sub: _id,
        expiresIn: `${EMAIL_TOKEN_EXPIRES_IN}m`,
        secret: EMAIL_TOKEN_SECRET
      })
      if (!emailToken.success) throw new Error('Error in email token creation.')

      return { success: true, emailToken: emailToken.token }
    } catch (error) {
      console.error('Error in creating email token:', error)
      return { success: false, error }
    }
  }

  public validateToken({ req, token, secret }: ITokenValidate) {
    try {
      const secretKey = this._searchTokenSecretKey({ secret })
      if (!secretKey) throw new Error('Token secret key is undefined!')

      const decodedToken = verify(token, secretKey) as IToken
      if (!decodedToken.sub) {
        req.user.token = {
          sub: decodedToken.sub,
          payload: decodedToken.payload
        }
      }

      return { success: true, decodedToken }
    } catch (error) {
      console.error('Error in validation token:', error)
      return { success: false, error }
    }
  }

  private _createToken({ payload, sub, expiresIn, secret }: ICreateToken) {
    try {
      const token = sign(payload, secret, {
        subject: sub,
        expiresIn
      })

      return { success: true, token }
    } catch (error) {
      console.error('Error in creating token:', error)
      return { success: false, error }
    }
  }

  private async _saveToken({ _id, refreshToken }: ISaveToken) {
    try {
      const token = await Token.findByIdAndUpdate(
        { userToken: _id },
        { $set: refreshToken },
        { upsert: true }
      )

      if (!token) throw new Error('Error cant save token')
    } catch (error) {
      console.error('Error in save user token:', error)
      return { success: false, error }
    }
  }

  private _searchTokenSecretKey({ secret }: { secret: string }) {
    switch (secret) {
      case 'accessToken':
        return ACCESS_TOKEN_SECRET
      case 'refreshToken':
        return REFRESH_TOKEN_SECRET
      case 'emailToken':
        return EMAIL_TOKEN_SECRET
      default:
        return ''
    }
  }
}
