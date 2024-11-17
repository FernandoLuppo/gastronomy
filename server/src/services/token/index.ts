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
import { handleErrors } from '../../utils'

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EMAIL_TOKEN_SECRET,
  REFRESH_TOKEN_MAX_AGE,
  ACCESS_TOKEN_MAX_AGE,
  EMAIL_TOKEN_MAX_AGE
} = process.env

export const tokenService = {
  createUserToken: async ({ _id, content }: IPayload) => {
    try {
      if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
        throw new Error('Token secret is missing!')

      const accessToken = _createToken({
        payload: { content, role: 'accessToken' },
        sub: _id,
        expiresIn: `${ACCESS_TOKEN_MAX_AGE}m`,
        secret: ACCESS_TOKEN_SECRET
      })
      if (!accessToken.success)
        throw new Error('Error in access token creation.')

      const refreshToken = _createToken({
        payload: { content, role: 'refreshToken' },
        sub: _id,
        expiresIn: `${REFRESH_TOKEN_MAX_AGE}d`,
        secret: REFRESH_TOKEN_SECRET
      })
      if (!refreshToken.success)
        throw new Error('Error in refresh token creation.')

      const refreshTokenExpiresDate = dayjs()
        .add(Number(REFRESH_TOKEN_MAX_AGE), 'day')
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
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in creating user token'
      })
      return { error, success }
    }
  },

  createEmailToken: ({ _id, content = {} }: IPayload) => {
    try {
      if (!EMAIL_TOKEN_SECRET) throw new Error('Token secret is missing!')

      const emailToken = _createToken({
        payload: { content, role: 'emailToken' },
        sub: _id,
        expiresIn: `${EMAIL_TOKEN_MAX_AGE}m`,
        secret: EMAIL_TOKEN_SECRET
      })
      if (!emailToken.success) throw new Error('Error in email token creation.')

      return { success: true, emailToken: emailToken.token }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in creating email token'
      })
      return { error, success }
    }
  },

  validateToken: ({ req, token, secret }: ITokenValidate) => {
    try {
      const secretKey = _searchTokenSecretKey({ secret })
      if (!secretKey) throw new Error('Token secret key is undefined!')
      const tokenWithoutBearer = token.replace('Bearer ', '')

      const decodedToken = verify(tokenWithoutBearer, secretKey) as {
        sub: string
        content: any
      }
      req.authenticatedUser = {
        token: {
          sub: decodedToken.sub,
          content: decodedToken.content
        }
      }

      return { success: true, decodedToken }
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in validation token'
      })
      return { error, success }
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
    } catch (err) {
      const { error, success } = handleErrors({
        err,
        errorMessage: 'Error in creating token'
      })
      return { error, success }
    }
  }
}

const _createToken = ({ payload, sub, expiresIn, secret }: ICreateToken) => {
  console.log({ payload, sub, expiresIn, secret })

  try {
    const token = sign(payload, secret, {
      subject: sub,
      expiresIn
    })

    return { success: true, token }
  } catch (err) {
    const { error, success } = handleErrors({
      err,
      errorMessage: 'Error in creating token'
    })
    return { error, success }
  }
}

const _saveToken = async ({ _id, refreshToken }: ISaveToken) => {
  try {
    const token = await Token.findOneAndUpdate(
      { userToken: _id },
      { $set: refreshToken },
      { upsert: true, new: true }
    )

    if (!token) throw new Error('Error saving token!')
  } catch (err) {
    const { error, success } = handleErrors({
      err,
      errorMessage: 'Error in save user token'
    })
    return { error, success }
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
