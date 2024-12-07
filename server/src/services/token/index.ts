import { verify } from 'jsonwebtoken'
import dayjs from 'dayjs'
import { IPayload, ITokenValidate } from '../../types'
import {
  createToken,
  saveToken,
  searchTokenSecretKey
} from '../../utils/domain'

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
    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
      return { error: 'Token secret is missing!', success: false }

    if (!_id) return { error: '_id is missing!', success: false }

    const accessToken = createToken({
      payload: { content, role: 'accessToken' },
      sub: _id,
      expiresIn: `${ACCESS_TOKEN_MAX_AGE}m`,
      secret: ACCESS_TOKEN_SECRET
    })
    const refreshToken = createToken({
      payload: { content, role: 'refreshToken' },
      sub: _id,
      expiresIn: `${REFRESH_TOKEN_MAX_AGE}d`,
      secret: REFRESH_TOKEN_SECRET
    })

    const refreshTokenExpiresDate = dayjs()
      .add(Number(REFRESH_TOKEN_MAX_AGE), 'day')
      .toDate()

    const newRefreshToken = {
      refreshToken: refreshToken.token,
      expireDat: refreshTokenExpiresDate,
      userToken: _id
    }

    await saveToken({ _id, refreshToken: newRefreshToken })

    return {
      success: true,
      tokens: {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token
      }
    }
  },

  createEmailToken: ({ _id, content = {} }: IPayload) => {
    if (!EMAIL_TOKEN_SECRET)
      return { error: 'Token secret is missing!', success: false }

    if (!_id) return { error: '_id is missing!', success: false }

    const emailToken = createToken({
      payload: { content, role: 'emailToken' },
      sub: _id,
      expiresIn: `${EMAIL_TOKEN_MAX_AGE}m`,
      secret: EMAIL_TOKEN_SECRET
    })
    if (!emailToken.success)
      return { error: 'Error in email token creation.', success: false }

    return { success: true, emailToken: emailToken.token }
  },

  validateToken: ({ req, token, secret }: ITokenValidate) => {
    if (!token) return { error: 'Token is missing', success: false }

    const secretKey = searchTokenSecretKey({ secret })
    if (!secretKey)
      return { error: 'Token secret key is undefined!', success: false }

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
  },

  extractTokenFromHeader: ({ authorization }: { authorization: string }) => {
    if (!authorization)
      return { error: 'Authorization header is missing', success: false }

    const [type, tokens] = authorization.split(' ')
    if (type !== 'Bearer' || !tokens)
      return { error: 'Invalid token format', success: false }

    return {
      success: true,
      accessToken: JSON.parse(tokens).accessToken,
      refreshToken: JSON.parse(tokens).refreshToken
    }
  }
}
