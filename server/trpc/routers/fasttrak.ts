import { router, publicProcedure } from '../trpc'
import type { CustomerArray } from '~/composables/fasttrak-api'
import type { ReservationResponse } from '~/schema/reservationSchema'
import type { FasttrakRequestOptions } from '~/services/fasttrakRequest'
import type { VehicleType } from '~/composables/fasttrak-api/schemas'

import { fasttrakRequest } from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'

export const fasttrakRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await fasttrakAuth()
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
    return customers
  }),

  getReservations: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await fasttrakAuth()
    console.log(
      'Access token',
      accessToken,
      'Calling authenticateFasttrak from [get]',
      new Date().toISOString()
    )
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
  getVehicleTypes: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await fasttrakAuth()
    console.log(
      'Access token',
      accessToken,
      'Calling authenticateFasttrak from [get]',
      new Date().toISOString()
    )
    const endpoint = 'pricing-plans'

    const requestOptions: FasttrakRequestOptions = {
      method: 'GET',
      endpoint: endpoint,
      token: accessToken,
      queryParams: { pricingId: 208 },
    }

    const fasttrakData: VehicleType = await fasttrakRequest(requestOptions)
    return fasttrakData
  }),
})
