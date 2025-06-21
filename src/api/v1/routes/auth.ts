import express from 'express'

import {
  signInRateLimiter,
  signUpRateLimiter,
} from '../../middlewares/ratelimiter/authRateLimiter'
import { signIn, signOut, signUp } from '../controllers/auth'

const authRouter = express.Router()

authRouter.post('/signin', signInRateLimiter, signIn)
authRouter.post('/signout', signOut)
authRouter.post('/signup', signUpRateLimiter, signUp)

export default authRouter
