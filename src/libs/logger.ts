import winston from 'winston'

const { combine, timestamp, prettyPrint, errors } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    ...(process.env.NODE_ENV === 'development' ? [prettyPrint()] : [])
  ),
  transports: [new winston.transports.Console()],
})

export default logger
