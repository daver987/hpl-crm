import { PrismaClient } from '@prisma/client'
// import useAccelerate from '@prisma/extension-accelerate'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
})
