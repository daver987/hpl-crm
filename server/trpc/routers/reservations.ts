import { router, publicProcedure } from '../trpc'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  ReservationDetailSchema,
  CustomerSummarySchema,
} from '~/composables/fasttrak-api/schemas'
import { ReservationResponse } from '~/schema/reservationSchema'
import { z } from 'zod'

export const reservationsRouter = router({
  add: publicProcedure
    .input(
      z
        .object({
          reservationDetail: ReservationDetailSchema.optional(),
          customerSummary: CustomerSummarySchema.optional(),
        })
        .passthrough()
    )
    .mutation(async ({ ctx, input }) => {
      console.log('Parsed Reservation Options:', input)
      const accessToken = await fasttrakAuth()
      const endpoint = 'reservations/new-customer'
      const body = {
        reservationDetail: input.reservationDetail,
        customerSummary: input.customerSummary,
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
