import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { corsConfig } from './config/cors'
import { initDb } from './config/db'
import {
  githubSocialLogin,
  googleSocialLoginConfig
} from './config/socialLogin'
import {
  userRouter,
  recoverPasswordRouter,
  socialLoginRouter,
  recipesRouter
} from './routes'

dotenv.config()
const app = express()

app.use(express.json())

app.use(cors(corsConfig))

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
)

app.use(passport.initialize())
app.use(passport.session())
googleSocialLoginConfig()
githubSocialLogin()

app.use('/user', userRouter)
app.use('/recover-password', recoverPasswordRouter)
app.use('/social-login', socialLoginRouter)
app.use('/recipes', recipesRouter)

initDb()

export { app }
