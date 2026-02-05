import app from './server'
import Env from './env'
import logger from './libs/logger'

app.listen(Env.PORT, () => {
  logger.info(`Server is running on port ${Env.PORT}`)
})
