import { STATUS_CODE } from '@src/constants'
import Token from '../../../models/Token'
import { ICreateToken, ISaveToken } from '@src/types'
import { CustomError } from '@src/utils/error'
import { sign } from 'jsonwebtoken'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EMAIL_TOKEN_SECRET } =
  process.env

export const createToken = ({
  payload,
  sub,
  expiresIn,
  secret
}: ICreateToken) => {
  if (!payload || !sub || !expiresIn || !secret)
    throw new CustomError({
      message: 'data to create token is missing',
      statusCode: STATUS_CODE.UNAUTHORIZED
    })

  const token = sign(payload, secret, {
    subject: sub,
    expiresIn
  })

  return { token }
}

export const saveToken = async ({ _id, refreshToken }: ISaveToken) => {
  const token = await Token.findOneAndUpdate(
    { userToken: _id },
    { $set: refreshToken },
    { upsert: true, new: true }
  )

  if (!token)
    throw new CustomError({
      message: 'Error saving token!',
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR
    })
}

export const searchTokenSecretKey = ({
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
