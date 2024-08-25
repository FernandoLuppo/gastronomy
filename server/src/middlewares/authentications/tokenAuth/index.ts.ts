import { NextFunction, Request, Response } from 'express'
import { tokenService } from '../../../services/token'
import { IPayload } from '../../../types'
import { STATUS_CODE } from '../../../settings/http'

const REFRESH_TOKEN_EXPIRES_IN = 2.592e8 // 3 Days
const ACCESS_TOKEN_EXPIRES_IN = 3.6e6 // 60 Minutes

export const tokenAuthentication = {
  privateRoutes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken, success, error } =
        tokenService.extractTokenFromHeader({
          authorization: req.headers.authorization as string
        })
      if (!success) throw new Error(error as string)

      const accessTokenValidate = tokenService.validateToken({
        req,
        secret: 'accessToken',
        token: accessToken
      })
      if (accessTokenValidate.success) return next()

      const refreshTokenValidate = tokenService.validateToken({
        req,
        secret: 'refreshToken',
        token: refreshToken
      })
      if (!refreshTokenValidate.success)
        throw new Error(refreshTokenValidate.error as string)

      const newTokens = await tokenService.createUserToken(
        refreshTokenValidate.decodedToken?.payload as IPayload
      )
      if (!newTokens.success) throw new Error(newTokens.error as string)

      res
        .cookie('accessToken', newTokens.tokens?.accessToken, {
          maxAge: ACCESS_TOKEN_EXPIRES_IN,
          httpOnly: false,
          sameSite: 'lax'
        })
        .cookie('refreshToken', newTokens.tokens?.refreshToken, {
          maxAge: REFRESH_TOKEN_EXPIRES_IN,
          httpOnly: false,
          sameSite: 'lax'
        })

      return next()
    } catch (error) {
      console.log('Token not authorized: ', error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ success: false, error: 'Unauthorized!' })
    }
  },

  emailPrivateRoutes: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { emailToken } = JSON.parse(req.headers.authorization as string)
      if (!emailToken) throw new Error('Token is missing!')

      const emailTokenValidated = tokenService.validateToken({
        req,
        token: emailToken,
        secret: 'emailToken'
      })

      if (!emailTokenValidated.success)
        throw new Error(emailTokenValidated.error as string)

      next()
    } catch (error) {
      console.log('Token not authorized: ', error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ success: false, error: 'Unauthorized!' })
    }
  }
}
