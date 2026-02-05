import type { CorsOptions } from 'cors'

import Env from '../env'

const corsOptions: CorsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  origin: Env.CORS_ORIGIN,
}

export default corsOptions
