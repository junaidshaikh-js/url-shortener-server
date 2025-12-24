import prisma from '../prismaClient'

export default async function testCronJob() {
  await prisma.shortCode.create({
    data: {
      longUrl: 'http://.test-url.com',
      shortCode: 'test',
    },
  })
  return 'User deleted'
}
