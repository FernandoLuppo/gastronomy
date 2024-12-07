import { Request, Response } from 'express'
import { userService } from '../../services/user'
import { STATUS_CODE } from '../../constants/HTTP'
import { IToken } from '../../types'
import { cookiesCalc } from '../../utils/helpers'
import { recoverPassword } from '../../services/user/recoverPassword'

declare global {
  namespace Express {
    interface Request {
      authenticatedUser: {
        token: IToken
      }
    }
  }
}

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE, HTTP_ONLY } = process.env
const httpOnly = HTTP_ONLY === 'true' ? true : false

export const userController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const { success, error, userTokens } = await userService.login({
        email,
        password
      })

      if (!success) throw new Error(error)

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
    } catch (error) {
      console.log(error)
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const data = req.body
      const { success, error } = await userService.register({ data })

      if (!success) throw new Error(error)
      return res.status(STATUS_CODE.CREATED).send({ success })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ success: false, error })
    }
  },

  userPersonalInfos: async (req: Request, res: Response) => {
    try {
      const _id = req.authenticatedUser.token.sub

      const { success, error, user } = await userService.userPersonalInfos({
        _id
      })
      if (!success) throw new Error(error)

      return res.status(STATUS_CODE.SUCCESS).send({ success, user })
    } catch (error) {
      console.log(error)
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ error, success: false })
    }
  },

  updatePersonalInfos: async (req: Request, res: Response) => {
    try {
      const data = req.body
      const _id = req.authenticatedUser.token.sub

      const { success, error, user } = await userService.updatePersonalInfos({
        _id,
        data
      })
      if (!success) throw new Error(error)

      return res.status(STATUS_CODE.SUCCESS).send({ success, user })
    } catch (error) {
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ error, success: false })
    }
  },

  deleteAccount: async (req: Request, res: Response) => {
    try {
      const _id = req.authenticatedUser.token.sub

      const { success, error } = await userService.deleteAccount({ _id })
      if (!success) throw new Error(error)

      return res.status(STATUS_CODE.SUCCESS).send({ success })
    } catch (error) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    }
  },

  logout: async (res: Response) => {
    return res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(STATUS_CODE.NO_CONTENT)
      .send()
  }
}
