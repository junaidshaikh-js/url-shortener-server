import express from 'express'

import { redirectShorten, shorten } from '../controllers/url'
import shortenRateLimiter from '../../middlewares/ratelimiter/shortenRateLimiter'
import addUser from '../../middlewares/addUser'

const router = express.Router()

router.post('/shorten', shortenRateLimiter, addUser, shorten)
router.get('/:shortCode', redirectShorten)

export default router
