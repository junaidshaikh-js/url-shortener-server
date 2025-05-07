import express from 'express'

import { redirectShorten, shorten } from '../controllers/url'

const router = express.Router()

router.post('/shorten', shorten)
router.get('/:shortCode', redirectShorten)

export default router
