import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import {
  ReservationDateAndTotalSchema,
  ReservationResponse,
} from '~/composables'

export default defineEventHandler(async (event) => {
  let accessToken
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
  const pickedReservations = ReservationDateAndTotalSchema.array().parse(
    fasttrakData?.items
  )
  console.log(pickedReservations)
  const response = await event.context.prisma.fasttrak.upsert({
    where: {
      id: 1,
    },
    update: { reservations: pickedReservations },
    create: { reservations: pickedReservations },
  })
  console.log('Picked Reservations', response)
  return pickedReservations
})
