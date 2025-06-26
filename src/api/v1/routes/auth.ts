import express from 'express'

import {
  signInRateLimiter,
  signUpRateLimiter,
} from '../../middlewares/ratelimiter/authRateLimiter'
import { signIn, signOut, signUp } from '../controllers/auth'

const authRouter = express.Router()

authRouter.post('/sign-in', signInRateLimiter, signIn)
authRouter.post('/sign-out', signOut)
authRouter.post('/sign-up', signUpRateLimiter, signUp)

export default authRouter
