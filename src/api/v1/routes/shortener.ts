import express from 'express'

import { redirectShorten, shorten } from '../controllers/shortener'

const router = express.Router()

router.post('/shorten', shorten)
router.get('/:shortCode', redirectShorten)

export default router
