import { Request, Response } from 'express'

import { STATUS_CODE } from '../../constants/HTTP'
import { recoverPassword } from '../../services/user/recoverPassword'
import { handleError } from '../../utils/error'
import { cookiesCalc } from '../../utils/helpers'

const { EMAIL_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

const recoverPasswordController = {
  checkEmail: async (req: Request, res: Response) => {
    try {
      const { emailToken, securityCode } =
        await recoverPassword.checkEmailService({ email: req.body.email })

      return res
        .cookie('emailToken', emailToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: EMAIL_TOKEN_MAX_AGE,
            dataType: 'minutes'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .status(STATUS_CODE.SUCCESS)
        .send({ success: true, securityCode })
    } catch (error) {
      handleError({ error, res })
    }
  },

  checkCode: async (req: Request, res: Response) => {
    try {
      const securityCode = req.body.securityCode
      const tokenCode = req.authenticatedUser.token.content
      const userId = req.authenticatedUser.token.sub

      const { emailToken } = await recoverPassword.checkCodeService({
        securityCode,
        tokenCode: tokenCode as string,
        userId
      })

      return res
        .cookie('emailToken', emailToken, {
          maxAge: cookiesCalc({
            cookieMaxAge: EMAIL_TOKEN_MAX_AGE,
            dataType: 'minutes'
          }),
          httpOnly,
          sameSite: 'lax'
        })
        .status(STATUS_CODE.SUCCESS)
        .send({ success: true })
    } catch (error) {
      handleError({ error, res })
    }
  },

  newPassword: async (req: Request, res: Response) => {
    try {
      const userId = req.authenticatedUser.token.sub
      const password = req.body.password

      await recoverPassword.newPassword({
        _id: userId,
        password
      })

      return res.status(STATUS_CODE.SUCCESS).send({ success: true })
    } catch (error) {
      handleError({ error, res })
    }
  }
}

export { recoverPasswordController }
