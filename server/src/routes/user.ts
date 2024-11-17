import { Router } from 'express'
import { userController } from '../controllers/UserController'
import { routesAuthentication } from '../middlewares/authentications/routesAuth/index.ts'
import { tokenAuthentication } from '../middlewares/authentications/tokenAuth/index.ts'

const userRouter = Router()

userRouter.post('/login', routesAuthentication.login, userController.login)

userRouter.post(
  '/register',
  routesAuthentication.register,
  userController.register
)

userRouter.get('/logout', userController.logout)

userRouter.get(
  '/personal-infos',
  tokenAuthentication.privateRoutes,
  userController.userPersonalInfos
)

userRouter.patch(
  '/update-infos',
  tokenAuthentication.privateRoutes,
  routesAuthentication.updateUserInfos,
  userController.updatePersonalInfos
)

userRouter.delete(
  '/delete',
  tokenAuthentication.privateRoutes,
  userController.deleteAccount
)

userRouter.post(
  '/recover-password/check-email',
  routesAuthentication.recoverPasswordCheckEmail,
  userController.checkEmail
)

userRouter.post(
  '/recover-password/check-security-code',
  tokenAuthentication.recoverPasswordPrivateRoutes,
  routesAuthentication.recoverPasswordCheckCode,
  userController.checkCode
)

userRouter.patch(
  '/recover-password/new-password',
  tokenAuthentication.recoverPasswordPrivateRoutes,
  routesAuthentication.newPassword,
  userController.newPassword
)

export { userRouter }
