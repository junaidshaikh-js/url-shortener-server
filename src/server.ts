import type { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import express from 'express'

import config from './config/config'
import corsOptions from './config/cors'
import v1Router from './api/v1'

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.status(200).send('URL Shortener Server')
})

app.use('/api/v1', v1Router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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
  console.log(`Server is running on port ${config.port}`)
})
