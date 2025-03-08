import dayjs from 'dayjs'
import { verify } from 'jsonwebtoken'

import { STATUS_CODE } from '../../constants'
import { IPayload, ITokenValidate } from '../../types'
import {
  createToken,
  saveToken,
  searchTokenSecretKey
} from '../../utils/domain'
import { CustomError } from '../../utils/error'

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
      throw new CustomError({
        message: 'Token secret is missing!',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    if (!_id)
      throw new CustomError({
        message: '_id is missing!',
        statusCode: STATUS_CODE.BAD_REQUEST
      })

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
      tokens: {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token
      }
    }
  },

  createEmailToken: ({ _id, content = {} }: IPayload) => {
    if (!EMAIL_TOKEN_SECRET)
      throw new CustomError({
        message: 'Token secret is missing!',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })
    if (!_id)
      throw new CustomError({
        message: '_id is missing!',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    const emailToken = createToken({
      payload: { content, role: 'emailToken' },
      sub: _id,
      expiresIn: `${EMAIL_TOKEN_MAX_AGE}m`,
      secret: EMAIL_TOKEN_SECRET
    })

    return { emailToken: emailToken.token }
  },

  validateToken: ({ req, token, secret }: ITokenValidate) => {
    if (!token)
      throw new CustomError({
        message: 'Token is missing!',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    const secretKey = searchTokenSecretKey({ secret })
    if (!secretKey)
      throw new CustomError({
        message: 'Token secret key is undefined!',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    const tokenWithoutBearer = token.replace('Bearer ', '')
    const decodedToken = verify(tokenWithoutBearer, secretKey) as {
      sub: string
      content: IPayload
    }

    console.log('validateToken.decodedToken ---> ', { decodedToken })

    req.authenticatedUser = {
      token: {
        sub: decodedToken.sub,
        content: decodedToken.content
      }
    }

    return { decodedToken }
  },

  extractTokenFromHeader: ({ authorization }: { authorization: string }) => {
    if (!authorization)
      throw new CustomError({
        message: 'Authorization header is missing',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    const [type, tokens] = authorization.split(' ')
    if (type !== 'Bearer' || !tokens)
      throw new CustomError({
        message: 'Invalid token format',
        statusCode: STATUS_CODE.UNAUTHORIZED
      })

    return {
      accessToken: JSON.parse(tokens).accessToken,
      refreshToken: JSON.parse(tokens).refreshToken
    }
  }
}
