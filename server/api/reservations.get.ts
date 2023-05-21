import { ReservationDateAndTotalSchema } from '~/composables'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (query.howMany === '[ALL]') {
    const response = await event.context.prisma.fasttrak.findMany({
      select: {
        reservations: true,
      },
    })
    return response[0]
  } else if (query.howMany === '[PICKED]') {
    const response = await event.context.prisma.fasttrak.findMany({
      select: {
        reservations: true,
      },
    })

    return ReservationDateAndTotalSchema.array().parse(response[0])
  }
})
