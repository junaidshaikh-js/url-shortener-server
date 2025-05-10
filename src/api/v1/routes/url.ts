import express from 'express'

import { redirectShorten, shorten } from '../controllers/url'
import shortenRateLimiter from '../../middlewares/ratelimiter/shortenRateLimiter'

const router = express.Router()

router.post('/shorten', shortenRateLimiter, shorten)
router.get('/:shortCode', redirectShorten)

export default router
