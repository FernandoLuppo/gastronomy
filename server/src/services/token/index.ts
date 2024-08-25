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

export const tokenService = {
  createUserToken: async ({ _id, content }: IPayload) => {
    try {
      if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
        throw new Error('Token secret is missing!')

      const accessToken = _createToken({
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

      const refreshToken = _createToken({
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

      await _saveToken({ _id, refreshToken: newRefreshToken })

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
  },

  createEmailToken: ({ _id, content }: IPayload) => {
    try {
      if (!EMAIL_TOKEN_SECRET) throw new Error('Token secret is missing!')

      const emailToken = _createToken({
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
  },

  validateToken: ({ req, token, secret }: ITokenValidate) => {
    try {
      const secretKey = _searchTokenSecretKey({ secret })
      if (!secretKey) throw new Error('Token secret key is undefined!')

      const decodedToken = verify(token, secretKey) as IToken

      req.user = {
        token: {
          sub: decodedToken.sub,
          payload: decodedToken.payload
        }
      }

      return { success: true, decodedToken }
    } catch (error) {
      console.error('Error in validation token:', error)
      return { success: false, error }
    }
  },

  extractTokenFromHeader: ({ authorization }: { authorization: string }) => {
    try {
      if (!authorization) throw new Error('Authorization header is missing')

      const [type, tokens] = authorization.split(' ')
      if (type !== 'Bearer' || !tokens) throw new Error('Invalid token format')

      return {
        success: true,
        accessToken: JSON.parse(tokens).accessToken,
        refreshToken: JSON.parse(tokens).refreshToken
      }
    } catch (error) {
      console.error('Error in creating token:', error)
      return { success: false, error }
    }
  }
}

const _createToken = ({ payload, sub, expiresIn, secret }: ICreateToken) => {
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

const _saveToken = async ({ _id, refreshToken }: ISaveToken) => {
  try {
    const token = await Token.findByIdAndUpdate(
      { userToken: _id },
      { $set: refreshToken },
      { upsert: true, new: true }
    )

    if (!token) throw new Error('Error saving token!')
  } catch (error) {
    console.error('Error in save user token:', error)
    return { success: false, error }
  }
}

const _searchTokenSecretKey = ({
  secret
}: {
  secret: 'accessToken' | 'refreshToken' | 'emailToken'
}) => {
  const tokens = {
    accessToken: ACCESS_TOKEN_SECRET,
    refreshToken: REFRESH_TOKEN_SECRET,
    emailToken: EMAIL_TOKEN_SECRET
  }

  return tokens[secret]
}
