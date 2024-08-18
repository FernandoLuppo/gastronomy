import { Request, Response } from 'express'
import { TokenService, UserService } from '../../services'
import { EncryptPassword } from '../../services/user/encryptPassword/EncryptPassword'
import { IEncryptPassword, ILogin } from '../../types'

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = process.env

export class UserController {
  public constructor(
    private readonly _res: Response,
    private readonly _userService: UserService
  ) {}

  public async login({ tokenService, encryptPassword }: ILogin) {
    const { success, error, userTokens } = await this._userService.login({
      tokenService,
      encryptPassword
    })
    if (!success) return this._res.status(500).send(error)
    return this._res
      .status(200)
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
  }

  public async register({ encryptPassword }: IEncryptPassword) {
    const { success, error } = await this._userService.register({
      encryptPassword
    })
    if (!success) return this._res.status(500).send(error)

    return this._res.status(201).send({ success })
  }

  public async userPersonalInfos() {
    const { success, error, user } = await this._userService.userPersonalInfos()

    if (!success) return this._res.status(500).send(error)
    return this._res.status(201).send({ success, user })
  }

  public async updatePersonalInfos({ encryptPassword }: IEncryptPassword) {
    const { success, error, user } =
      await this._userService.updatePersonalInfos({ encryptPassword })

    if (!success) return this._res.status(500).send(error)
    return this._res.status(201).send({ success, user })
  }

  public async deleteAccount() {
    const { success, error } = await this._userService.deleteAccount()

    if (!success) return this._res.status(500).send(error)
    return this._res.status(200).send({ success })
  }
}
