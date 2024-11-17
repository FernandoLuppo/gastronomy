import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter, socialLoginRouter } from './routes'
import * as dotenv from 'dotenv'
import { initDb } from './config/db'
import {
  githubSocialLogin,
  googleSocialLoginConfig
} from './config/socialLogin'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import session from 'express-session'

dotenv.config()

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: true,
    credentials: true
  })
)

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
googleSocialLoginConfig()
githubSocialLogin()

app.use('/user', userRouter)
app.use('/social-login', socialLoginRouter)

initDb()

export { app }
