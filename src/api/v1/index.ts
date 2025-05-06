import express from 'express'

import shortenerRouter from './routes/shortener'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('URL Shortener API v1')
})

router.use('/', shortenerRouter)

export default router
