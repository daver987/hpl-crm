import { router, publicProcedure } from '../trpc'
import { CustomerSummarySchema } from '~/composables'
import type { CustomerSummary } from '~/composables'
import type { FasttrakRequestOptions } from '~/services/fasttrakRequest'
import { fasttrakRequest } from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'

export const fasttrakCustomersRouter = router({
  search: publicProcedure
    .input(CustomerSummarySchema)
    .query(async ({ ctx, input }) => {
      const accessToken = await fasttrakAuth()

      const endpoint = 'customers/search'
      const body = {
        emailAddress: input.emailAddress,
      }

      const requestOptions: FasttrakRequestOptions = {
        method: 'POST',
        endpoint: endpoint,
        token: accessToken,
        body: body,
      }

      const fasttrakData: CustomerSummary = await fasttrakRequest(
        requestOptions
      )
      return fasttrakData
    }),
})
