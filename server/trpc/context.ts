import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { stripe } from '~/server/services/stripeInit'
import { getServerSession } from '#auth'
import { prismaDb } from '../prismadb'

export const createContext = async (event: H3Event) => {
  return {
    stripe: stripe,
    session: await getServerSession(event),
    prisma: prismaDb,
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
