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
  try {
    const accessToken = await fasttrakAuth()
    console.log('Access token', accessToken, new Date().toISOString())

    const currentYear = new Date().getFullYear()
    const startDate = new Date(currentYear, 0, 1)
    const endDate = new Date(currentYear, 11, 31)

    const requestOptions: FasttrakRequestOptions = {
      method: 'POST',
      endpoint: 'reservations/search-advanced',
      token: accessToken,
      body: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }

    const fasttrakData: ReservationResponse = await fasttrakRequest(
      requestOptions
    )
    const parsedReservations = ReservationDateAndTotalSchema.array().parse(
      fasttrakData.items
    )

    await event.context.prisma.fasttrak.upsert({
      where: { id: 1 },
      update: { reservations: parsedReservations },
      create: { reservations: parsedReservations },
    })

    return {
      status: 200,
      message: 'Success: Data has been successfully updated.',
    }
  } catch (error) {
    console.error(`Error: ${error.message}`)
    return {
      status: 500,
      message: `Error: ${error.message}`,
    }
  }
})
