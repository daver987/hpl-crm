import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { prismaDb } from '~/server/prismadb'
import { stripe } from '~/services/stripeInit'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(_event: H3Event) {
  /**
   * Add any trpc-request context here. E.g., you could add `prisma` like this (if you've added it via sidebase):
   * ```ts
   * return { prisma: _event.context.prisma }
   * ```
   */
  return {
    prisma: prismaDb,
    stripe: stripe,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
