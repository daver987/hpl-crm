import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const stripeCustomersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const stripe = ctx.stripe
    return await stripe.customers.list({
      limit: 100,
      expand: ['data.sources', 'data.invoice_settings'],
    })
  }),

  delete: publicProcedure
    .input(
      z.object({
        stripe_customer_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stripe = ctx.stripe
      return await stripe.customers.del(input.stripe_customer_id)
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        options: z.object({
          name: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stripe = ctx.stripe
      return await stripe.customers.update(input.id, input.options)
    }),
})
