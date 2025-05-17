import dotenv from 'dotenv'

dotenv.config()

interface Config {
  jwtSecret: string
  nodeEnv: string
  port: number
  saltRounds: number
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET || 'abcdef123456',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5500,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
}

export default config
