import Token from '../../../models/Token'
import { ICreateToken, ISaveToken } from '@src/types'
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
    return { error: 'data to create token is missing', success: false }

  const token = sign(payload, secret, {
    subject: sub,
    expiresIn
  })

  return { success: true, token }
}

export const saveToken = async ({ _id, refreshToken }: ISaveToken) => {
  const token = await Token.findOneAndUpdate(
    { userToken: _id },
    { $set: refreshToken },
    { upsert: true, new: true }
  )

  if (!token) return { error: 'Error saving token!', success: false }
  return { success: true }
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
