import { env as loadEnv } from 'custom-env'
import { z } from 'zod'

process.env.APP_STAGE = process.env.APP_STAGE || 'dev'

const isDevelopment = process.env.APP_STAGE === 'dev'
const isTesting = process.env.APP_STAGE === 'test'

if (isDevelopment) {
  loadEnv()
} else if (isTesting) {
  loadEnv('test')
}

const envSchema = z.object({
  APP_STAGE: z.enum(['dev', 'test', 'production']).default('dev'),

  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters long'),

  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().positive().default(5500),

  SALT_ROUNDS: z.coerce.number().min(10).max(20).default(10),

  DATABASE_URL: z.string().startsWith('postgresql://'),

  CORS_ORIGIN: z
    .union([
      z.string().transform((str) => str.split(',').map((s) => s.trim())),
      z.array(z.string()),
    ])
    .default([]),
})

type EnvType = z.infer<typeof envSchema>

let Env: EnvType

try {
  Env = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(error.format(), null, 2)
    )

    error.issues.forEach((err) => {
      const path = err.path.join('.')
      console.log(`${path}: ${err.message}`)
    })

    process.exit(1)
  }
  throw error
}

export const isProduction = () => Env.APP_STAGE === 'production'
export const isDev = () => Env.APP_STAGE === 'dev'
export const isTest = () => Env.APP_STAGE === 'test'

export default Env
