import { Request, Response } from 'express'
import { userService } from '../../services/user'
import { STATUS_CODE } from '../../constants/HTTP'
import { IToken } from '../../types'
import { cookiesCalc } from '../../utils/helpers'
import { recoverPassword } from '../../services/user/recoverPassword'
import { handleError } from '@src/utils/error'

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

      const { userTokens } = await userService.login({
        email,
        password
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
        .send({ success: true })
    } catch (error) {
      handleError({ error, res })
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const data = req.body
      await userService.register({ data })

      return res.status(STATUS_CODE.CREATED).send({ success: true })
    } catch (error) {
      handleError({ error, res })
    }
  },

  userPersonalInfos: async (req: Request, res: Response) => {
    try {
      const _id = req.authenticatedUser.token.sub

      const { user } = await userService.userPersonalInfos({
        _id
      })

      return res.status(STATUS_CODE.SUCCESS).send({ success: true, user })
    } catch (error) {
      handleError({ error, res })
    }
  },

  updatePersonalInfos: async (req: Request, res: Response) => {
    try {
      const data = req.body
      const _id = req.authenticatedUser.token.sub

      const { user } = await userService.updatePersonalInfos({
        _id,
        data
      })

      return res.status(STATUS_CODE.SUCCESS).send({ success: true, user })
    } catch (error) {
      handleError({ error, res })
    }
  },

  deleteAccount: async (req: Request, res: Response) => {
    try {
      const _id = req.authenticatedUser.token.sub

      await userService.deleteAccount({ _id })

      return res.status(STATUS_CODE.SUCCESS).send({ success: true })
    } catch (error) {
      handleError({ error, res })
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
