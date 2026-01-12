import { z } from 'zod'

import asyncHandler from '../../../libs/asyncHandler'
import prisma from '../../../prismaClient'
import { generateUniqueCode } from '../../../libs/shorten'
import { validate } from '../../../libs/validation'

const ShortenSchema = z.object({
  url: z.string().url({ message: 'Invalid URL' }),
})

export const shorten = asyncHandler(async (req, res) => {
  const user = req.user
  const { url } = validate(ShortenSchema, req.body)
  const shortCode = await generateUniqueCode()

  const shortenedUrl = await prisma.shortCode.create({
    data: {
      longUrl: url,
      shortCode,
      userId: user ? user.id : null,
    },
    select: {
      id: true,
      longUrl: true,
      shortCode: true,
    },
  })

  res.status(200).json({ ok: true, data: shortenedUrl })
})

const redirectShortenSchema = z.object({
  shortCode: z.string().min(6),
})

export const redirectShorten = asyncHandler(async (req, res) => {
  const { shortCode } = validate(redirectShortenSchema, req.params)

  const data = await prisma.shortCode.findUnique({
    where: {
      shortCode,
      deletedAt: null,
    },
    select: {
      longUrl: true,
    },
  })

  if (!data) {
    res.status(404).json({ ok: false, error: 'Short code not found' })
    return
  }

  res.status(200).json({ ok: true, data })
})

const UpdateShortUrlSchema = z.object({
  url: z.string().url({ message: 'Invalid URL' }),
})

export const updateShortUrl = asyncHandler(async (req, res) => {
  const { shortCode } = validate(redirectShortenSchema, req.params)
  const { url } = validate(UpdateShortUrlSchema, req.body)
  const user = req.user

  if (!user) {
    res.status(401).json({ ok: false, error: 'Unauthorized' })
    return
  }

  const existingShortCode = await prisma.shortCode.findUnique({
    where: {
      shortCode,
      deletedAt: null,
    },
  })

  if (!existingShortCode) {
    res.status(404).json({ ok: false, error: 'Short code not found' })
    return
  }

  if (existingShortCode.userId !== user.id) {
    res.status(403).json({
      ok: false,
      error: 'You are not authorized to edit this short code',
    })
    return
  }

  const updatedShortCode = await prisma.shortCode.update({
    where: {
      shortCode,
    },
    data: {
      longUrl: url,
    },
    select: {
      id: true,
      longUrl: true,
      shortCode: true,
    },
  })

  res.status(200).json({ ok: true, data: updatedShortCode })
})
