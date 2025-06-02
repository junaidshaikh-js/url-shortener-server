import express from 'express'

import auth from '../../middlewares/auth'
import { getUserDetails } from '../controllers/user'

const router = express.Router()

router.use(auth)

router.get('/details', getUserDetails)

export default router
