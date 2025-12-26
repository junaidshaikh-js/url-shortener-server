import express from 'express'

import emptyTrash from './emptyTrash'
import logger from '../libs/logger'

const cronRouter = express.Router()
export default cronRouter

cronRouter.get('/empty-trash', async (req, res) => {
  try {
    const count = await emptyTrash()
    res.status(200).json({ ok: true, message: `Deleted ${count} records` })
  } catch (error) {
    logger.error('Error: emptyTrash', error)
    res.status(500).json({ ok: false, error })
  }
})
