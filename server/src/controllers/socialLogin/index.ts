import { Request, Response } from 'express'
import { socialLoginService } from '../../services/socialLogin'
import { STATUS_CODE } from '../../constants/HTTP'
import { cookiesCalc } from '../../utils'

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

const redirectUrl = `http://localhost:3001/`

const socialLoginController = {
  googleSuccess: async (req: Request, res: Response) => {
    const user = req.user as { _json: { email: string; name: string } }

    const { success, error, userTokens } = await socialLoginService.login({
      email: user._json.email,
      name: user._json.name
    })
    if (!success) return res.status(500).send({ success, error })

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
  },

  googleFailure: (req: Request, res: Response) =>
    res
      .status(500)
      .send({ success: false, error: 'Error during Google social login' }),

  githubSuccess: async (req: Request, res: Response) => {
    const userEmail = req.user as { emails: [{ value: string }] }
    const userName = req.user as { _json: { name: string } }
    const email = userEmail.emails[0].value
    const name = userName._json.name

    const { success, error, userTokens } = await socialLoginService.login({
      email,
      name
    })
    if (!success) return res.status(500).send({ success, error })

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
  },
  githubFalse: (req: Request, res: Response) =>
    res
      .status(500)
      .send({ success: false, error: 'Error during Github social login' })
}

export { socialLoginController }
