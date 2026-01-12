import express from 'express'

import { redirectShorten, shorten, updateShortUrl } from '../controllers/url'
import addUser from '../../middlewares/addUser'
import auth from '../../middlewares/auth'
import shortenRateLimiter from '../../middlewares/ratelimiter/shortenRateLimiter'

const router = express.Router()

router.post('/shorten', shortenRateLimiter, addUser, shorten)
router.get('/:shortCode', redirectShorten)
router.patch('/:shortCode', auth, updateShortUrl)

export default router
