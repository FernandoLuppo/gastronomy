import { Request, Response } from 'express'

import { STATUS_CODE } from '../../constants/HTTP'
import { socialLoginService } from '../../services/socialLogin'
import { handleError } from '../../utils/error'
import { cookiesCalc } from '../../utils/helpers'

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, HTTP_ONLY, WEBSITE_URL } =
  process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

const redirectUrl = `${WEBSITE_URL as string}/social-callback`

const socialLoginController = {
  googleSuccess: async (req: Request, res: Response) => {
    try {
      const user = req.user as { _json: { email: string; name: string } }
      const { userTokens } = await socialLoginService.login({
        email: user._json.email,
        name: user._json.name
      })

      return res
        .status(STATUS_CODE.SUCCESS)
        .cookie('accessToken', userTokens?.tokens?.accessToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: ACCESS_TOKEN_MAX_AGE,
            dataType: 'minutes'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .cookie('refreshToken', userTokens?.tokens?.refreshToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: REFRESH_TOKEN_MAX_AGE,
            dataType: 'days'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .redirect(redirectUrl)
    } catch (error) {
      handleError({ error, res })
    }
  },

  googleFailure: (req: Request, res: Response) =>
    res
      .status(500)
      .send({ success: false, message: 'Error during Google social login' }),

  githubSuccess: async (req: Request, res: Response) => {
    try {
      const userEmail = req.user as { emails: [{ value: string }] }
      const userName = req.user as { _json: { name: string } }
      const email = userEmail.emails[0].value
      const name = userName._json.name

      const { userTokens } = await socialLoginService.login({
        email,
        name
      })

      return res
        .status(STATUS_CODE.SUCCESS)
        .cookie('accessToken', userTokens?.tokens?.accessToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: ACCESS_TOKEN_MAX_AGE,
            dataType: 'minutes'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .cookie('refreshToken', userTokens?.tokens?.refreshToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: REFRESH_TOKEN_MAX_AGE,
            dataType: 'days'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .redirect(redirectUrl)
    } catch (error) {
      handleError({ error, res })
    }
  },
  githubFalse: (req: Request, res: Response) =>
    res
      .status(500)
      .send({ success: false, message: 'Error during Github social login' })
}

export { socialLoginController }
