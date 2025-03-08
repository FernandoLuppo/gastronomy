import { NextFunction, Request, Response } from 'express'

import { STATUS_CODE } from '../../../constants/HTTP'
import { tokenService } from '../../../services/token'
import { IPayload } from '../../../types'
import { CustomError } from '../../../utils/error'
import { cookiesCalc } from '../../../utils/helpers'

interface TokenExtracted {
  accessToken: string
  refreshToken: string
}

interface TokenValidationResult {
  decodedToken?: {
    sub: string
    content: IPayload
  }
  message?: string
  statusCode?: number
}

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

export const tokenAuthentication = {
  privateRoutes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenExtracted: TokenExtracted =
        tokenService.extractTokenFromHeader({
          authorization: req.headers.authorization as string
        })

      const accessTokenValidate: TokenValidationResult =
        tokenService.validateToken({
          req,
          secret: 'accessToken',
          token: tokenExtracted.accessToken
        })

      if (accessTokenValidate) return next()

      const refreshTokenValidate: TokenValidationResult =
        tokenService.validateToken({
          req,
          secret: 'refreshToken',
          token: tokenExtracted.refreshToken
        })

      const newTokens = await tokenService.createUserToken(
        refreshTokenValidate.decodedToken?.content as IPayload
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
