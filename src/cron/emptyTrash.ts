import prisma from '../prismaClient'

export default async function emptyTrash() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const { count } = await prisma.shortCode.deleteMany({
    where: {
      deletedAt: {
        not: null,
        lt: thirtyDaysAgo,
      },
    },
  })

  return count
}
