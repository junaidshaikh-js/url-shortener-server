import express from 'express'

import auth from '../../middlewares/auth'
import {
  deleteLink,
  getDetails,
  getLinks,
  getTrashLinks,
  restoreLink,
} from '../controllers/user'

const router = express.Router()

router.use(auth)

router.get('/details', getDetails)
router.get('/links', getLinks)
router.get('/links/trash', getTrashLinks)

router.delete('/links/:id', deleteLink)

router.patch('/links/:id/restore', restoreLink)

export default router
