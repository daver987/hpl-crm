import { router, publicProcedure } from '../trpc'
import type { CustomerArray } from '~/composables/fasttrak-api'
import type { ReservationResponse } from '~/schema/reservationSchema'
import type { FasttrakRequestOptions } from '~/server/services/fasttrakRequest'
import { fasttrakRequest } from '~/server/services/fasttrakRequest'

export const fasttrakRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const accessToken = ctx.accessToken
    const endpoint = 'customers'
    const queryParams = {
      includeInactive: false,
      maxResults: 100,
    }

    const requestOptions: FasttrakRequestOptions = {
      method: 'GET',
      endpoint: endpoint,
      token: accessToken,
      queryParams: queryParams,
    }

    const customers: CustomerArray = await fasttrakRequest(requestOptions)
    console.log('Customers', customers)
    return customers
  }),

  getReservations: publicProcedure.mutation(async ({ ctx }) => {
    const accessToken = ctx.accessToken
    const endpoint = 'reservations/search-advanced'
    const body = {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }

    const requestOptions: FasttrakRequestOptions = {
      method: 'POST',
      endpoint: endpoint,
      token: accessToken,
      body: body,
    }

    const fasttrakData: ReservationResponse = await fasttrakRequest(
      requestOptions
    )
    return fasttrakData
  }),
})
