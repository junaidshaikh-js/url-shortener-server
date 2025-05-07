import express from 'express'

import urlRouter from './routes/url'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('URL Shortener API v1')
})

router.use('/url', urlRouter)

export default router
