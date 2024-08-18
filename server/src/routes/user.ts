import { NextFunction, Request, Response, Router } from 'express'
import { UserController } from '../controllers'
import { EncryptPassword, TokenService, UserService } from '../services'
import { TokenAuthenticate } from '../middlewares'

const userRouter = Router()

userRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    new TokenAuthenticate(req, res, next)

    const encryptPassword = new EncryptPassword(req.body.password)
    const tokenService = new TokenService()

    const userService = new UserService(req)
    const userController = new UserController(res, userService)

    userController.login({ encryptPassword, tokenService })
  }
)

userRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    new TokenAuthenticate(req, res, next)

    const encryptPassword = new EncryptPassword(req.body.password)
    const userService = new UserService(req)
    const userController = new UserController(res, userService)

    userController.register({ encryptPassword })
  }
)

userRouter.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('accessToken').clearCookie('refreshToken')
  res.status(204).send()
})

userRouter.get(
  '/personal-infos',
  async (req: Request, res: Response, next: NextFunction) => {
    new TokenAuthenticate(req, res, next)

    const userService = new UserService(req)
    const userController = new UserController(res, userService)

    userController.userPersonalInfos()
  }
)

userRouter.patch(
  '/update-infos',
  async (req: Request, res: Response, next: NextFunction) => {
    new TokenAuthenticate(req, res, next)

    const encryptPassword = new EncryptPassword(req.body.password)
    const userService = new UserService(req)
    const userController = new UserController(res, userService)

    userController.updatePersonalInfos({ encryptPassword })
  }
)

userRouter.delete(
  '/delete',
  async (req: Request, res: Response, next: NextFunction) => {
    new TokenAuthenticate(req, res, next)

    const userService = new UserService(req)
    const userController = new UserController(res, userService)

    userController.deleteAccount()
  }
)

export { userRouter }
