import { IToken } from './token'

declare global {
  namespace Express {
    interface Request {
      user: {
        token: IToken
      }
    }
  }
}
