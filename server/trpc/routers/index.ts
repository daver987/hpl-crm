import { router } from '../trpc'
import { serviceRouter } from '~/server/trpc/routers/service'
import { lineItemsRouter } from '~/server/trpc/routers/lineitems'
import { salesTaxRouter } from '~/server/trpc/routers/salesTax'
import { vehicleRouter } from '~/server/trpc/routers/vehicle'
import { stripeRouter } from '~/server/trpc/routers/stripe'
import { quoteRouter } from '~/server/trpc/routers/quote'
import { userRouter } from '~/server/trpc/routers/users'
import { stripeCustomersRouter } from '~/server/trpc/routers/stripeCustomers'
import { rideRouter } from '~/server/trpc/routers/rides'
import { fasttrakRouter } from '~/server/trpc/routers/fasttrak'
import { reservationsRouter } from '~/server/trpc/routers/reservations'
import { fasttrakCustomersRouter } from '~/server/trpc/routers/fasttrakCustomers'

export const appRouter = router({
  lineItem: lineItemsRouter,
  service: serviceRouter,
  salesTax: salesTaxRouter,
  vehicle: vehicleRouter,
  stripe: stripeRouter,
  quote: quoteRouter,
  user: userRouter,
  stripeCustomers: stripeCustomersRouter,
  fasttrakCustomers: fasttrakCustomersRouter,
  ride: rideRouter,
  fasttrak: fasttrakRouter,
  reservations: reservationsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
