import { Request, Response, NextFunction } from 'express'
import {
  loginSchema,
  registerSchema,
  updateUserInfosSchema
} from '../../schemas'
import { STATUS_CODE } from '../../../constants/HTTP'

export const routesAuthentication = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      console.log('Error in authentication: ', error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ error, success: false })
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      console.log('Error in authentication: ', error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ error, success: false })
    }
  },

  updateUserInfos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUserInfosSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      console.log('Error in authentication: ', error)
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .send({ error, success: false })
    }
  }
}
