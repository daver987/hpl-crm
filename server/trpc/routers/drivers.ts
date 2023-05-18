import { publicProcedure, router } from '../trpc'
import type { FasttrakRequestOptions } from '~/services/fasttrakRequest'
import type { DriverResponse } from '~/composables/fasttrak-api/schemas'
import { fasttrakRequest } from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'
import { z } from 'zod'

export const driverRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await fasttrakAuth()
    const endpoint = 'employees'
    const queryParams = {
      includeInactive: false,
    }

    const requestOptions: FasttrakRequestOptions = {
      method: 'GET',
      endpoint: endpoint,
      token: accessToken,
      queryParams: queryParams,
    }

    const drivers: DriverResponse = await fasttrakRequest(requestOptions)
    return drivers
  }),

  getAffiliates: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await fasttrakAuth()
    const endpoint = 'affiliates'

    const requestOptions: FasttrakRequestOptions = {
      method: 'GET',
      endpoint: endpoint,
      token: accessToken,
    }
    return await fasttrakRequest(requestOptions)
  }),

  getPay: publicProcedure.query(async ({ ctx }) => {
    const accessToken = await fasttrakAuth()
    const endpoint = 'affiliates'

    const requestOptions: FasttrakRequestOptions = {
      method: 'GET',
      endpoint: endpoint,
      token: accessToken,
    }

    return await fasttrakRequest(requestOptions)
  }),

  getEmployeePay: publicProcedure
    .input(
      z.object({
        affiliateId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const accessToken = await fasttrakAuth()
      const endpoint = `employee-pays/search`

      const requestOptions: FasttrakRequestOptions = {
        method: 'POST',
        endpoint: endpoint,
        token: accessToken,
        body: {
          PayDisplayType: 'DriversOnly',
          PayStatusType: 'All',
        },
      }

      return await fasttrakRequest(requestOptions)
    }),
})
