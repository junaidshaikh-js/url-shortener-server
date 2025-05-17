import { rateLimit } from 'express-rate-limit'

const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    ok: false,
    error: 'Too many requests, please try again in ten minutes.',
  },
})

export default authRateLimiter
