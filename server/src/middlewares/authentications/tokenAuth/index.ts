import { NextFunction, Request, Response } from 'express'
import { tokenService } from '../../../services/token'
import { IPayload } from '../../../types'
import { STATUS_CODE } from '../../../constants/HTTP'
import { cookiesCalc } from '../../../utils/helpers'
import { CustomError } from '@src/utils/error'

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

export const tokenAuthentication = {
  privateRoutes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenExtracted: any = tokenService.extractTokenFromHeader({
        authorization: req.headers.authorization as string
      })

      const accessTokenValidate = tokenService.validateToken({
        req,
        secret: 'accessToken',
        token: tokenExtracted.accessToken
      })
      if (accessTokenValidate) return next()

      const refreshTokenValidate: any = tokenService.validateToken({
        req,
        secret: 'refreshToken',
        token: tokenExtracted.refreshToken
      })

      if (!refreshTokenValidate) {
        throw new CustomError({
          message: refreshTokenValidate.message as string,
          statusCode: refreshTokenValidate.statusCode as number
        })
      }

      const newTokens = await tokenService.createUserToken(
        refreshTokenValidate.decodedToken.content as IPayload
      )

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
      if (!emailToken)
        throw new CustomError({
          message: 'Token is missing!',
          statusCode: STATUS_CODE.BAD_REQUEST
        })

      tokenService.validateToken({
        req,
        token: emailToken,
        secret: 'emailToken'
      })

      return next()
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ success: false, error: 'Unauthorized!' })
    }
  }
}
