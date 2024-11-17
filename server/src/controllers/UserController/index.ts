import { Request, Response } from 'express'
import { userService } from '../../services/user'
import { STATUS_CODE } from '../../constants/HTTP'
import { IToken } from '../../types'
import { cookiesCalc } from '../../utils'
import { recoverPassword } from '../../services/user/recoverPassword'

const {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  EMAIL_TOKEN_MAX_AGE,
  HTTP_ONLY
} = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

declare global {
  namespace Express {
    interface Request {
      authenticatedUser: {
        token: IToken
      }
    }
  }
}

export const userController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    const { success, error, userTokens } = await userService.login({
      email,
      password
    })

    if (!success)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })

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
      .send({ success })
  },

  register: async (req: Request, res: Response) => {
    const data = req.body

    const { success, error } = await userService.register({ data })
    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)

    return res.status(STATUS_CODE.CREATED).send({ success })
  },

  userPersonalInfos: async (req: Request, res: Response) => {
    const _id = req.authenticatedUser.token.sub
    const { success, error, user } = await userService.userPersonalInfos({
      _id
    })

    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res.status(STATUS_CODE.SUCCESS).send({ success, user })
  },

  updatePersonalInfos: async (req: Request, res: Response) => {
    const data = req.body
    const _id = req.authenticatedUser.token.sub

    const { success, error, user } = await userService.updatePersonalInfos({
      _id,
      data
    })

    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res.status(STATUS_CODE.SUCCESS).send({ success, user })
  },

  deleteAccount: async (req: Request, res: Response) => {
    const _id = req.authenticatedUser.token.sub
    const { success, error } = await userService.deleteAccount({ _id })

    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res.status(STATUS_CODE.SUCCESS).send({ success })
  },

  logout: async (res: Response) => {
    return res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(STATUS_CODE.NO_CONTENT)
      .send()
  },

  checkEmail: async (req: Request, res: Response) => {
    const { success, emailToken, securityCode, error } =
      await recoverPassword.checkEmailService({ email: req.body.email })

    if (!success)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success, error })

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
  },

  checkCode: async (req: Request, res: Response) => {
    const securityCode = req.body.securityCode
    const tokenCode = req.authenticatedUser.token.content
    const userId = req.authenticatedUser.token.sub
    const { success, emailToken, error } =
      await recoverPassword.checkCodeService({
        securityCode,
        tokenCode,
        userId
      })

    if (!success)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success, error })

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
  },

  newPassword: async (req: Request, res: Response) => {
    const userId = req.authenticatedUser.token.sub
    const password = req.body.password
    const { success, error } = await recoverPassword.newPassword({
      _id: userId,
      password
    })

    if (!success)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success, error })

    return res.status(STATUS_CODE.SUCCESS).send({ success })
  }
}
