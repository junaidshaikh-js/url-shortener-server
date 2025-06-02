import { format } from 'date-fns'

import asyncHandler from '../../../libs/asyncHandler'
import prisma from '../../../prismaClient'

export const getUserDetails = asyncHandler(async (req, res) => {
  const { email } = req.user ?? {}

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
      createdAt: true,
    },
  })

  if (!user) {
    res.status(404).json({ ok: false, error: "Account doesn't exits" })
    return
  }

  const joinedOn = format(user.createdAt, 'd MMM yyyy') // 2 Jun 2025

  const userResponse = {
    name: user.name,
    email: user.email,
    joinedOn,
  }

  res.status(200).json({
    ok: true,
    data: userResponse,
  })
})
