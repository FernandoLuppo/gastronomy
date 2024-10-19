import express, { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes'
import mongoose from 'mongoose'

import * as dotenv from 'dotenv'
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

app.use('/user', userRouter)

const { AMBIENT, MONGO_DEV_URI, MONGO_TEST_URI } = process.env

let mongoURI

switch (AMBIENT) {
  case 'test':
    mongoURI = MONGO_TEST_URI
    break
  case 'development':
  default:
    mongoURI = MONGO_DEV_URI
    break
}

if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log(`MongoDB connected successfully to ${AMBIENT} database`)
    })
    .catch(error => {
      console.error('MongoDB connection error:', error)
    })
}

export { app }
