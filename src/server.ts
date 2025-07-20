import type { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

import config from './config/config'
import corsOptions from './config/cors'
import logger from './libs/logger'
import v1Router from './api/v1'
import cronRouter from './cron/router'
import './cron'

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.status(200).send('URL Shortener Server')
})

app.use('/api/v1', v1Router)
app.use('/api/cron', cronRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  logger.error(err)

  if (err instanceof ZodError) {
    res.status(400).json({ ok: false, error: err.errors[0].message })
    return
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    res
      .status(500)
      .json({ ok: false, error: 'Internal Server Error. Try again!' })
    return
  }

  if (err instanceof Error) {
    res.status(500).json({ ok: false, error: err.message })
    return
  }

  // Handle unexpected errors
  res.status(500).json({ ok: false, error: 'Internal Server Error' })
})

app.all('*all', (req, res) => {
  res.status(404).json({ ok: false, error: 'Route not found' })
})

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`)
})
