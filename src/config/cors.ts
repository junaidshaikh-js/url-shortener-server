import type { CorsOptions } from 'cors'

import config from './config'

const corsOptions: CorsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  origin: [/url-shortener-client/],
}

if (config.nodeEnv === 'development') {
  corsOptions.origin = [/localhost/]
}

export default corsOptions
