import { format } from 'date-fns'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

import asyncHandler from '../../../libs/asyncHandler'
import prisma from '../../../prismaClient'
import { validate } from '../../../libs/validation'

const linkIdParams = z.object({
  id: z.string(),
})

export const getDetails = asyncHandler(async (req, res) => {
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

export const getLinks = asyncHandler(async (req, res) => {
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

export const getTrashLinks = asyncHandler(async (req, res) => {
  const { id } = req.user ?? {}

  const links = await prisma.shortCode.findMany({
    where: {
      userId: id,
      deletedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      longUrl: true,
      shortCode: true,
      createdAt: true,
      deletedAt: true,
    },
    orderBy: {
      deletedAt: 'desc',
    },
  })

  res.status(200).json({ ok: true, data: links })
})

export const deleteLink = asyncHandler(async (req, res) => {
  const { id } = validate(linkIdParams, req.params)
  const { user } = req

  if (!user) {
    res.status(401).json({ ok: false, error: 'Unauthorized' })
    return
  }

  try {
    await prisma.shortCode.update({
      where: {
        id: Number(id),
        userId: user.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    res.status(200).json({ ok: true, message: 'Link deleted successfully' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // "An operation failed because it depends on one or more records that were required but not found"
      if (error.code === 'P2025') {
        res.status(404).json({ ok: false, error: 'Link not found' })
        return
      }
    }
    throw error
  }
})

export const restoreLink = asyncHandler(async (req, res) => {
  const { id } = validate(linkIdParams, req.params)
  const { user } = req

  if (!user) {
    res.status(401).json({ ok: false, error: 'Unauthorized' })
    return
  }

  try {
    await prisma.shortCode.update({
      where: {
        id: Number(id),
        userId: user.id,
      },
      data: {
        deletedAt: null,
      },
    })

    res.status(200).json({ ok: true, message: 'Link restored successfully' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // "An operation failed because it depends on one or more records that were required but not found"
      if (error.code === 'P2025') {
        res.status(404).json({ ok: false, error: 'Link not found' })
        return
      }
    }
    throw error
  }
})
