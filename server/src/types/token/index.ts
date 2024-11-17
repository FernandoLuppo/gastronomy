import { Request } from 'express'

export interface IPayload {
  _id: string
  content?: any
}

export interface IToken {
  sub: string
  content: any
}

export interface ICreateToken {
  payload: {
    content: any
    role?: string
  }
  sub: string
  expiresIn: string
  secret: string
}

export interface ITokenValidate {
  req: Request
  token: string
  secret: 'accessToken' | 'refreshToken' | 'emailToken'
}

export interface ISaveToken {
  _id: string
  refreshToken: {
    refreshToken: string | undefined
    expireDat: Date
    userToken: string
  }
}
