import { router } from '../trpc'
import { serviceRouter } from '~/server/trpc/routers/service'
import { lineItemsRouter } from '~/server/trpc/routers/lineitems'
import { salesTaxRouter } from '~/server/trpc/routers/salesTax'
import { vehicleRouter } from '~/server/trpc/routers/vehicle'
import { stripeRouter } from '~/server/trpc/routers/stripe'
import { quoteRouter } from '~/server/trpc/routers/quote'
import { userRouter } from '~/server/trpc/routers/users'
import { customerRouter } from '~/server/trpc/routers/customers'
import { rideRouter } from '~/server/trpc/routers/rides'

export const appRouter = router({
  lineItem: lineItemsRouter,
  service: serviceRouter,
  salesTax: salesTaxRouter,
  vehicle: vehicleRouter,
  stripe: stripeRouter,
  quote: quoteRouter,
  user: userRouter,
  customer: customerRouter,
  ride: rideRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
