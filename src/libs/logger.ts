import winston from 'winston'

import { isDev } from '../env'

const { combine, timestamp, prettyPrint, errors } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    ...(isDev() ? [prettyPrint()] : [])
  ),
  transports: [new winston.transports.Console()],
})

export default logger
