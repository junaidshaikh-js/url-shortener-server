import type { NextFunction, Request, Response } from 'express'

import { verifyToken } from '../../libs/auth'

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ ok: false, error: 'Unauthorized' })
    return
  }

  const user = await verifyToken(token)
  if (!user) {
    res.clearCookie('auth_token')
    res.status(401).json({ ok: false, error: 'Invalid token' })
    return
  }

  if (typeof user !== 'string') {
    req.user = {
      id: user.id,
      email: user.email,
    }
  }

  next()
}
