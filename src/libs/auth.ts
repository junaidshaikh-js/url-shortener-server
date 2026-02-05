import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import Env from '../env'

export const getToken = async (payload: Record<string, unknown>) => {
  return await jwt.sign(payload, Env.JWT_SECRET)
}

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token, Env.JWT_SECRET)
  } catch {
    return null
  }
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, Env.SALT_ROUNDS)
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
