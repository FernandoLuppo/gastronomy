import { Router } from 'express'

import { recoverPasswordController } from '../../controllers/RecoverPasswordController'
import { routesAuthentication } from '../../middlewares/authentications/routesAuth'
import { tokenAuthentication } from '../../middlewares/authentications/tokenAuth'

const recoverPasswordRouter = Router()

recoverPasswordRouter.post(
  '/check-email',
  routesAuthentication.recoverPasswordCheckEmail,
  recoverPasswordController.checkEmail
)

recoverPasswordRouter.post(
  '/check-security-code',
  tokenAuthentication.recoverPasswordPrivateRoutes,
  routesAuthentication.recoverPasswordCheckCode,
  recoverPasswordController.checkCode
)

recoverPasswordRouter.patch(
  '/new-password',
  tokenAuthentication.recoverPasswordPrivateRoutes,
  routesAuthentication.newPassword,
  recoverPasswordController.newPassword
)

export { recoverPasswordRouter }
