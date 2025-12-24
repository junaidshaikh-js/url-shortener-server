import express from 'express'

import testCronJob from './testCronJob'
import logger from '../libs/logger'

const cronRouter = express.Router()
export default cronRouter

cronRouter.get('/test-cron', async (req, res) => {
  try {
    await testCronJob()
    res.status(200).json({ ok: true })
  } catch (error) {
    logger.error('Error: testCronJob', error)
    res.status(500).json({ ok: false, error })
  }
})
