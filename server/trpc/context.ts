import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { prismaDb } from '~/server/prismadb'
import { fasttrakAuth } from '~/server/fasttrakInit'
import { stripe } from '~/server/services/stripeInit'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(event: H3Event) {
  /**
   * Add any trpc-request context here. E.g., you could add `prisma` like this (if you've added it via sidebase):
   * ```ts
   * return { prisma: _event.context.prisma }
   * ```
   */
  const auth = await fasttrakAuth()
  return {
    prisma: prismaDb,
    stripe: stripe,
    accessToken: auth.item.token.accessToken,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
