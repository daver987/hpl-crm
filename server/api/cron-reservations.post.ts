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
    const body = await readBody(event)
    const accessToken = await fasttrakAuth()
    const currentYear = new Date().getFullYear()
    // const startDate = new Date(currentYear, 0, 1)
    // const endDate = new Date(currentYear, 11, 31)
    const startDate = new Date(2015, 0, 1) // November 1, 2022
    const endDate = new Date(2023, 11, 31) // December 31, 2023

    const requestOptions: FasttrakRequestOptions = {
      method: 'POST',
      endpoint: 'reservations/search-advanced',
      token: accessToken,
      body: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        maxResults: body.maxResults,
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
      update: { reservations: fasttrakData.items },
      create: { reservations: fasttrakData.items },
    })

    return {
      status: 200,
      message: 'Success: Data has been successfully updated.',
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    return {
      status: 500,
      message: `Error: ${error.message}`,
    }
  }
})
