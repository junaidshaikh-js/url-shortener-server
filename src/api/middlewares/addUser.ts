import { NextFunction, Request, Response } from 'express'

import prisma from '../../prismaClient'
import { AUTH_TOKEN } from '../../constants'
import { verifyToken } from '../../libs/auth'

export default async function addUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies
  const token = cookies[AUTH_TOKEN]

  if (!token) return next()

  const user = await verifyToken(token)

  if (user && typeof user !== 'string') {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    if (userData) {
      req.user = {
        id: userData.id,
        email: userData.email,
      }
    }
  }

  next()
}
