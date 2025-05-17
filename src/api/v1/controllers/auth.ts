import { z } from 'zod'

import asyncHandler from '../../../libs/asyncHandler'
import config from '../../../config/config'
import prisma from '../../../prismaClient'
import { AUTH_TOKEN } from '../../../constants'
import { comparePassword, getToken, hashPassword } from '../../../libs/auth'
import { validate } from '../../../libs/validation'

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = validate(SignInSchema, req.body)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  })

  if (!user) {
    res
      .status(404)
      .json({ ok: false, error: 'Account does not exits. Please sign up.' })
    return
  }

  const isPasswordCorrect = await comparePassword(password, user.password)
  if (!isPasswordCorrect) {
    res.status(403).json({ ok: false, error: 'Invalid password' })
    return
  }

  const token = await getToken({ id: user.id, email: user.email })
  res.cookie(AUTH_TOKEN, token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: config.nodeEnv === 'production',
  })

  res.status(200).json({ ok: true, data: { token } })
})

const SignUpSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = validate(SignUpSchema, req.body)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    res.status(403).json({ ok: false, error: 'Account already exists.' })
    return
  }

  const hashedPassword = await hashPassword(password)
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      signInType: 'BASIC',
    },
    select: {
      id: true,
      email: true,
    },
  })

  const token = await getToken({ id: newUser.id, email: newUser.email })
  res.cookie(AUTH_TOKEN, token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: config.nodeEnv === 'production',
  })

  res.status(200).json({
    ok: true,
    data: {
      token,
    },
  })
})

export const signOut = asyncHandler(async (req, res) => {
  res.clearCookie(AUTH_TOKEN)
  res.status(200).json({ ok: true, data: 'Sign out successfully' })
})
