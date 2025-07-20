import logger from '../libs/logger'
import prisma from '../prismaClient'

export default async function numberOfShortCodes() {
  const shortCodes = await prisma.shortCode.count()
  logger.info(`Total number of short codes: ${shortCodes}`)
}
