import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../config/config'

export const getToken = async (payload: Record<string, unknown>) => {
  return await jwt.sign(payload, config.jwtSecret)
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, config.saltRounds)
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
