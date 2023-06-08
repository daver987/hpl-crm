import chalk from 'chalk'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const messages = await prisma.message.findMany({
    include: {
      user: true,
    },
  })
  console.log(chalk.blue('[MESSAGES]', messages))
  return messages
})
