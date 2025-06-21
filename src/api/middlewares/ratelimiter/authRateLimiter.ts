import { rateLimit } from 'express-rate-limit'

export const signInRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    ok: false,
    error: 'Too many requests, please try again in ten minutes.',
  },
})

export const signUpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    ok: false,
    error: 'Too many requests, please try again in ten minutes.',
  },
})
