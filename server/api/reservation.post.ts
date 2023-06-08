import { z } from 'zod'
import {
  CustomerSummarySchema,
  ReservationSchema,
  SingleReservationResponse,
} from '~/composables'
import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import chalk from 'chalk'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const eventBody = await readBody(event)
  console.log(chalk.magentaBright('[EVENT_BODY]', eventBody))
  const inputSchema = z
    .object({
      reservationDetail: ReservationSchema.optional(),
      customerSummary: CustomerSummarySchema.optional(),
    })
    .passthrough()
  const input = inputSchema.parse(eventBody)
  console.log(chalk.magentaBright('[INPUT]', input))
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

  const fasttrakData: SingleReservationResponse = await fasttrakRequest(
    requestOptions
  )
  console.log('[FASTTRAK_DATA]', fasttrakData)

  if (fasttrakData.status === 'SUCCESS') {
    let quoteNumber: number
    const quoteNumberAsString = fasttrakData.item.referencePO.match(/\d+/g)
    if (typeof quoteNumberAsString === 'string') {
      quoteNumber = parseInt(quoteNumberAsString)
      await prisma.quote.update({
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
})
