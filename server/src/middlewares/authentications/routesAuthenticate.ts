import { Request, Response, NextFunction } from 'express'
import { loginSchema, registerSchema, updateUserInfosSchema } from '../schemas'

export class routesAuthenticate {
  public constructor(
    private readonly _req: Request,
    private readonly _res: Response,
    private readonly _next: NextFunction
  ) {}

  public async registerAuth() {
    try {
      await registerSchema.validate(this._req.body, {
        abortEarly: false
      })
      this._next()
    } catch (error) {
      this._res.status(401).send({ error, success: false })
    }
  }

  public async loginAuth() {
    try {
      await loginSchema.validate(this._req.body, {
        abortEarly: false
      })
      this._next()
    } catch (error) {
      this._res.status(401).send({ error, success: false })
    }
  }

  public async updateUserInfosAuth() {
    try {
      await updateUserInfosSchema.validate(this._req.body, {
        abortEarly: false
      })
      this._next()
    } catch (error) {
      this._res.status(401).send({ error, success: false })
    }
  }
}
