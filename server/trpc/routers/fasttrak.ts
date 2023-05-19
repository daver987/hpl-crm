import { router, publicProcedure } from '../trpc'
import type { FasttrakRequestOptions } from '~/services/fasttrakRequest'
import type {
  PricingPlan,
  ReservationResponse,
  CustomerArray,
} from '~/composables/fasttrak-api/schemas'
import { fasttrakRequest } from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'
import chalk from 'chalk'
import { z } from 'zod'

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
    const reservations = await useStorage().getItem('fasttrak:reservations')
    let accessToken
    if (!reservations) {
      accessToken = await fasttrakAuth()
      console.log(
        'Access token',
        accessToken,
        'Calling authenticateFasttrak from [get]',
        new Date().toISOString()
      )
      const endpoint = 'reservations/search-advanced'
      const currentYear = new Date().getFullYear()

      const startDate = new Date()
      startDate.setFullYear(currentYear)
      startDate.setMonth(0)
      startDate.setDate(1)

      const endDate = new Date()
      endDate.setFullYear(currentYear)
      endDate.setMonth(11)
      endDate.setDate(31)

      const body = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
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
      await useStorage().setItem('fasttrak:reservations', fasttrakData)
      console.log(chalk.blue('[RESERVATIONS_NEW]'))
      return fasttrakData
    } else {
      console.log(
        chalk.green('[RESERVATIONS_OLD]', JSON.stringify(reservations))
      )
      return reservations as ReservationResponse
    }
  }),
  getPricingPlans: publicProcedure.query(async ({ ctx }) => {
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
      queryParams: { includeDisabled: false },
    }

    const fasttrakData: PricingPlan = await fasttrakRequest(requestOptions)
    return fasttrakData
  }),
  getReservationById: publicProcedure
    .input(z.object({ reservationId: z.number() }))
    .query(async ({ ctx, input }) => {
      const accessToken = await fasttrakAuth()
      console.log(
        'Access token',
        accessToken,
        'Calling authenticateFasttrak from [get]',
        new Date().toISOString()
      )
      const endpoint = `reservations/${input.reservationId}`

      const requestOptions: FasttrakRequestOptions = {
        method: 'GET',
        endpoint: endpoint,
        token: accessToken,
      }

      const fasttrakData: PricingPlan = await fasttrakRequest(requestOptions)
      return fasttrakData
    }),
})
