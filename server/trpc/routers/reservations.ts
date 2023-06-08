import { router, publicProcedure } from '../trpc'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  ReservationSchema,
  CustomerSummarySchema,
} from '~/composables/fasttrak-api/schemas'
import { ReservationResponse } from '~/composables/fasttrak-api/schemas/ReservationSchema'
import { z } from 'zod'

export const reservationsRouter = router({
  add: publicProcedure
    .input(
      z
        .object({
          reservationDetail: ReservationSchema.optional(),
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
      console.log('[FASTTRAK_DATA]', fasttrakData)

      if (fasttrakData.status === 'SUCCESS') {
        let quoteNumber: number
        const quoteNumberAsString = fasttrakData.items.referencePO.match(/\d+/g)
        if (typeof quoteNumberAsString![0] === 'string') {
          quoteNumber = parseInt(quoteNumberAsString![0])
          await ctx.prisma.quote.update({
            where: {
              quote_number: quoteNumber,
            },
            data: {
              is_booked: true,
            },
          })
        }
      }
      return fasttrakData
    }),
})
