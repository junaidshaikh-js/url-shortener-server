import { rateLimit } from 'express-rate-limit'

const shortenRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: {
    ok: false,
    error: 'Too many requests, please try again after one minute.',
  },
})

export default shortenRateLimiter
