import express, { Router } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

const route = Router()

route.get('/test', (req, res) => {
  res.json({ message: 'olaa' })
})

// Usar a rota de teste
app.use('/', route)

export { app }
