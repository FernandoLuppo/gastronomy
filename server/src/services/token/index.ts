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

    const accessToken = _createToken({
      payload: { content, role: 'accessToken' },
      sub: _id,
      expiresIn: `${ACCESS_TOKEN_MAX_AGE}m`,
      secret: ACCESS_TOKEN_SECRET
    })
    const refreshToken = _createToken({
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

    await _saveToken({ _id, refreshToken: newRefreshToken })

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

    const emailToken = _createToken({
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
    const secretKey = _searchTokenSecretKey({ secret })
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

const _createToken = ({ payload, sub, expiresIn, secret }: ICreateToken) => {
  const token = sign(payload, secret, {
    subject: sub,
    expiresIn
  })

  return { success: true, token }
}

const _saveToken = async ({ _id, refreshToken }: ISaveToken) => {
  const token = await Token.findOneAndUpdate(
    { userToken: _id },
    { $set: refreshToken },
    { upsert: true, new: true }
  )

  if (!token) return { error: 'Error saving token!', success: false }
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
