import { NextFunction, Request, Response } from 'express'
import { TokenService } from '../../services'
import { IPayload } from '../../types'

const REFRESH_TOKEN_EXPIRES_IN = 2.592e8 // 3 Days
const ACCESS_TOKEN_EXPIRES_IN = 3.6e6 // 60 Minutes

export class TokenAuthenticate {
  public constructor(
    private readonly _req: Request,
    private readonly _res: Response,
    private readonly _next: NextFunction
  ) {}

  public async privateRoutes(tokenService: TokenService) {
    try {
      const { accessToken, refreshToken } = JSON.parse(
        this._req.headers.authorization as string
      )

      const accessTokenValidate = tokenService.validateToken({
        req: this._req,
        secret: 'accessToken',
        token: accessToken
      })

      if (!accessTokenValidate.success) {
        const refreshTokenValidate = tokenService.validateToken({
          req: this._req,
          secret: 'refreshToken',
          token: refreshToken
        })

        if (!refreshTokenValidate.success)
          throw new Error(refreshTokenValidate.error as string)

        const newTokens = await tokenService.createUserToken(
          refreshTokenValidate.decodedToken?.payload as IPayload
        )

        if (!newTokens.success) throw new Error(newTokens.error as string)

        this._res
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

        this._next()
      }
      this._next()
    } catch (error) {
      console.log('Error private routes middleware: ', error)
      return this._res.status(401).send({ success: false, error })
    }
  }

  public async emailPrivateRoutes() {
    try {
      const { emailToken } = JSON.parse(
        this._req.headers.authorization as string
      )
      if (!emailToken) throw new Error('Token is missing!')

      const tokenService = new TokenService()
      const emailTokenValidated = tokenService.validateToken({
        req: this._req,
        token: emailToken,
        secret: 'emailToken'
      })

      if (!emailTokenValidated.success)
        throw new Error(emailTokenValidated.error as string)

      this._next()
    } catch (error) {
      console.log('Error email private routes middleware: ', error)
      return this._res.status(401).send({ success: false, error })
    }
  }
}
