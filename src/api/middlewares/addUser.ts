import { NextFunction, Request, Response } from 'express'

import prisma from '../../prismaClient'
import { verifyToken } from '../../libs/auth'

export default async function addUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]

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
