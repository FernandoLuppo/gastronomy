import { Request, Response, NextFunction } from 'express'

import { handleError } from '../../../utils/error'
import {
  checkCodeSchema,
  loginSchema,
  checkEmailSchema,
  registerSchema,
  updateUserInfosSchema,
  newPasswordSchema,
  searchBarIngredientsSchema
} from '../../schemas'

export const routesAuthentication = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      handleError({ error, res })
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      handleError({ error, res })
    }
  },

  updateUserInfos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUserInfosSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      handleError({ error, res })
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
      handleError({ error, res })
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
      handleError({ error, res })
    }
  },

  newPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await newPasswordSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      handleError({ error, res })
    }
  },

  searchIngredient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await searchBarIngredientsSchema.validate(req.body, {
        abortEarly: false
      })
      return next()
    } catch (error) {
      handleError({ error, res })
    }
  }
}
