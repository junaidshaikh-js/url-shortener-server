import express from 'express'

import authRouter from './routes/auth'
import urlRouter from './routes/url'
import userRouter from './routes/user'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('URL Shortener API v1')
})

router.use('/', authRouter)
router.use('/url', urlRouter)
router.use('/user', userRouter)

export default router
