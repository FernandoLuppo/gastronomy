import { Request, Response } from 'express'
import { userService } from '../../services/user'
import { STATUS_CODE } from '../../settings/http'

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = process.env

export const userController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    const { success, error, userTokens } = await userService.login({
      email,
      password
    })
    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res
      .status(STATUS_CODE.SUCCESS)
      .cookie('accessToken', userTokens?.tokens?.accessToken, {
        maxAge: Number(ACCESS_TOKEN_MAX_AGE),
        httpOnly: false,
        sameSite: 'lax'
      })
      .cookie('refreshToken', userTokens?.tokens?.refreshToken, {
        maxAge: Number(REFRESH_TOKEN_MAX_AGE),
        httpOnly: false,
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
    const _id = req.user.token.sub
    const { success, error, user } = await userService.userPersonalInfos({
      _id
    })

    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res.status(STATUS_CODE.SUCCESS).send({ success, user })
  },

  updatePersonalInfos: async (req: Request, res: Response) => {
    const data = req.body
    const _id = req.user.token.sub

    const { success, error, user } = await userService.updatePersonalInfos({
      _id,
      data
    })

    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res.status(STATUS_CODE.SUCCESS).send({ success, user })
  },

  deleteAccount: async (req: Request, res: Response) => {
    const _id = req.user.token.sub
    const { success, error } = await userService.deleteAccount({ _id })

    if (!success)
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error)
    return res.status(STATUS_CODE.SUCCESS).send({ success })
  },

  logout: async (res: Response) => {
    try {
      return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .status(STATUS_CODE.NO_CONTENT)
        .send()
    } catch (error) {}
  }
}
