import prisma from '../prismaClient'

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

// generate base62 <length> long code
export const generateCode = (length = 6) => {
  return Array.from({ length }, () => {
    return characters[Math.floor(Math.random() * characters.length)]
  }).join('')
}

export const generateUniqueCode = async (length = 6, maxTries = 5) => {
  for (let i = 0; i < maxTries; i++) {
    const shortCode = generateCode(length)
    const doesCodeExists = await prisma.shortCode.findUnique({
      where: {
        shortCode,
      },
    })
    if (!doesCodeExists) {
      return shortCode
    }
  }

  throw new Error('Could not generate unique code')
}
