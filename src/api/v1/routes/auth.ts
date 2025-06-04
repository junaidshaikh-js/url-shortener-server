import express from 'express'

import authRateLimiter from '../../middlewares/ratelimiter/authRateLimiter'
import { signIn, signOut, signUp } from '../controllers/auth'

const authRouter = express.Router()

authRouter.post('/signin', authRateLimiter, signIn)
authRouter.post('/signout', signOut)
authRouter.post('/signup', authRateLimiter, signUp)

export default authRouter
