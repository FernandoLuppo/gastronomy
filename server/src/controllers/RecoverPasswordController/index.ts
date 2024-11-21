import { Request, Response } from 'express'
import { STATUS_CODE } from '../../constants/HTTP'
import { recoverPassword } from '../../services/user/recoverPassword'
import { cookiesCalc } from '../../utils'

const { EMAIL_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

const recoverPasswordController = {
  checkEmail: async (req: Request, res: Response) => {
    try {
      const { success, emailToken, securityCode, error } =
        await recoverPassword.checkEmailService({ email: req.body.email })

      if (!success) throw new Error(error)

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
        .send({ success, securityCode })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  },

  checkCode: async (req: Request, res: Response) => {
    try {
      const securityCode = req.body.securityCode
      const tokenCode = req.authenticatedUser.token.content
      const userId = req.authenticatedUser.token.sub

      const { success, emailToken, error } =
        await recoverPassword.checkCodeService({
          securityCode,
          tokenCode,
          userId
        })
      if (!success) throw new Error(error)

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
        .send({ success })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  },

  newPassword: async (req: Request, res: Response) => {
    try {
      const userId = req.authenticatedUser.token.sub
      const password = req.body.password

      const { success, error } = await recoverPassword.newPassword({
        _id: userId,
        password
      })
      if (!success) throw new Error(error)

      return res.status(STATUS_CODE.SUCCESS).send({ success })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  }
}

export { recoverPasswordController }
