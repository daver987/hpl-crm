import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const userRouter = router({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          stripe_customer_id: true,
        },
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany()
  }),
  getContactMessages: publicProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.message.findMany({
      include: {
        user: true,
      },
    })
    console.log('[USER]getContactMessages')
    return messages
  }),
})
