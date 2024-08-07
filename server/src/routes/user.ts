import { Request, Response, Router } from 'express'
import { User } from '../services'
import { UserController } from '../controllers'

const userRouter = Router()

userRouter.get('/personal-infos', async (req: Request, res: Response) => {})

userRouter.patch('/update-infos', async (req: Request, res: Response) => {})

userRouter.post('/login', async (req: Request, res: Response) => {})

userRouter.post('/register', async (req: Request, res: Response) => {})

userRouter.get('/logout', async (req: Request, res: Response) => {})

userRouter.delete('/delete', async (req: Request, res: Response) => {})

export { userRouter }
