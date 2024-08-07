import { Request, Response } from 'express'
import { User } from '../services'

export class UserController {
  public constructor(
    private readonly _req: Request,
    private readonly _res: Response,
    private readonly _user: User
  ) {}

  public async userPersonalInfos() {}

  public async updatePersonalInfos() {}

  public async login() {}

  public async register() {}

  public async deleteAccount() {}
}
