import express from 'express'

import auth from '../../middlewares/auth'
import {
  deleteUserLink,
  getUserDetails,
  getUserLinks,
} from '../controllers/user'

const router = express.Router()

router.use(auth)

router.get('/details', getUserDetails)

router.get('/links', getUserLinks)

router.delete('/links/:id', deleteUserLink)

export default router
