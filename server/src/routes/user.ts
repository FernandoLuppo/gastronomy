import { Router } from 'express'
import { userController } from '../controllers/UserController'
import { routesAuthentication } from '../middlewares/authentications/routesAuth'
import { tokenAuthentication } from '../middlewares/authentications/tokenAuth'

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

export { userRouter }
