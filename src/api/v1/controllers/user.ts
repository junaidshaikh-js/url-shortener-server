import { format } from 'date-fns'
import { z } from 'zod'

import asyncHandler from '../../../libs/asyncHandler'
import prisma from '../../../prismaClient'
import { validate } from '../../../libs/validation'

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

export const getUserLinks = asyncHandler(async (req, res) => {
  const { id } = req.user ?? {}

  const links = await prisma.shortCode.findMany({
    where: {
      userId: id,
      deletedAt: null,
    },
    select: {
      id: true,
      longUrl: true,
      shortCode: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.status(200).json({ ok: true, data: links })
})

const deleteUserLinkParamsSchema = z.object({
  id: z.string(),
})

export const deleteUserLink = asyncHandler(async (req, res) => {
  const { id } = validate(deleteUserLinkParamsSchema, req.params)
  const { user } = req

  if (!user) {
    res.status(401).json({ ok: false, error: 'Unauthorized' })
    return
  }

  const link = await prisma.shortCode.findUnique({
    where: {
      id: Number(id),
      userId: user.id,
    },
  })

  if (!link) {
    res.status(404).json({ ok: false, error: 'Link not found' })
    return
  }

  await prisma.shortCode.update({
    where: {
      id: link.id,
    },
    data: {
      deletedAt: new Date(),
    },
  })

  res.status(200).json({ ok: true, message: 'Link deleted successfully' })
})
