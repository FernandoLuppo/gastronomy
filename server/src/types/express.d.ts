import { IToken } from './token/token'

declare global {
  namespace Express {
    interface Request {
      user: {
        token: IToken
      }
    }
  }
}
