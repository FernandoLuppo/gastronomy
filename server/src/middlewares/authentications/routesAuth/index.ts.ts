import { Request, Response, NextFunction } from 'express'
import {
  checkCodeSchema,
  loginSchema,
  checkEmailSchema,
  registerSchema,
  updateUserInfosSchema,
  newPasswordSchema
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
  },

  recoverPasswordCheckEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await checkEmailSchema.validate(req.body, {
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

  recoverPasswordCheckCode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await checkCodeSchema.validate(req.body, {
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

  newPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await newPasswordSchema.validate(req.body, {
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
