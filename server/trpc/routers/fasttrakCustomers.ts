import { router, publicProcedure } from '../trpc'
import { CustomerSearchSchema } from '~/composables/fasttrak-api/schemas'
import type { CustomerResponse } from '~/composables/fasttrak-api/schemas'
import type { FasttrakRequestOptions } from '~/services/fasttrakRequest'
import { fasttrakRequest } from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'

export const fasttrakCustomersRouter = router({
  search: publicProcedure
    .input(CustomerSearchSchema)
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

      const fasttrakData: CustomerResponse = await fasttrakRequest(
        requestOptions
      )
      return fasttrakData
    }),
})
