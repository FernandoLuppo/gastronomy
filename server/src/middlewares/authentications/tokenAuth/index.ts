import { NextFunction, Request, Response } from 'express'
import { tokenService } from '../../../services/token'
import { IPayload } from '../../../types'
import { STATUS_CODE } from '../../../constants/HTTP'
import { cookiesCalc } from '../../../utils'

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

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
        refreshTokenValidate.decodedToken?.content as IPayload
      )
      if (!newTokens.success) throw new Error(newTokens.error as string)

      res
        .cookie('accessToken', newTokens.tokens?.accessToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: ACCESS_TOKEN_MAX_AGE,
            dataType: 'minutes'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .cookie('refreshToken', newTokens.tokens?.refreshToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: REFRESH_TOKEN_MAX_AGE,
            dataType: 'days'
          }),
          httpOnly,
          sameSite: 'lax'
        })

      return next()
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ success: false, error: 'Unauthorized!' })
    }
  },

  recoverPasswordPrivateRoutes: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const emailToken = req.headers.authorization
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
      console.log(error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ success: false, error: 'Unauthorized!' })
    }
  }
}
