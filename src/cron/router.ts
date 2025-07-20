import express from 'express'

import numberOfShortCodes from './numberOfShortCodes'
import logger from '../libs/logger'

const cronRouter = express.Router()
export default cronRouter

cronRouter.get('/number-of-short-codes', async (req, res) => {
  try {
    await numberOfShortCodes()
    res.status(200).json({ ok: true })
  } catch (error) {
    logger.error('Error: numberOfShortCodes', error)
    res.status(500).json({ ok: false, error })
  }
})
