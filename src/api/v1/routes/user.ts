import express from 'express'

import auth from '../../middlewares/auth'
import {
  deleteLink,
  getDetails,
  getLinks,
  getTrashLinks,
  restoreLink,
  deleteLinkPermanent,
  deleteTrashLinks,
} from '../controllers/user'

const router = express.Router()

router.use(auth)

router.get('/details', getDetails)
router.get('/links', getLinks)
router.get('/links/trash', getTrashLinks)

router.delete('/links/trash', deleteTrashLinks)
router.delete('/links/:id', deleteLink)
router.patch('/links/:id/restore', restoreLink)
router.delete('/links/:id/permanent', deleteLinkPermanent)

export default router
