import { NextFunction, Router } from 'express'
import { socialLoginController } from '../controllers/socialLogin'
import passport from 'passport'

const socialLoginRouter = Router()

//  Google
socialLoginRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
socialLoginRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/social-login/google/failure',
    successRedirect: '/social-login/google/success'
  })
)
socialLoginRouter.get('/google/success', socialLoginController.googleSuccess)
socialLoginRouter.get('/google/failure', socialLoginController.googleFailure)

//  Github
socialLoginRouter.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
)
socialLoginRouter.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/social-login/github/failure',
    successRedirect: '/social-login/github/success'
  })
)
socialLoginRouter.get('/github/success', socialLoginController.githubSuccess)
socialLoginRouter.get('/github/failure', socialLoginController.githubFalse)

export { socialLoginRouter }
