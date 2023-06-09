import chalk from 'chalk'
import { parse, isFuture } from 'date-fns'

export default defineEventHandler(async (event) => {
  const now = new Date()
  const prisma = event.context.prisma

  const allRecords = await prisma.quote.findMany()
  // Filter records to only include those with a pickup_date and pickup_time that is today or in the future
  const filteredRecords = allRecords.filter((record) => {
    const pickupDateTime = parse(
      `${record.pickup_date} ${record.pickup_time}`,
      'MMMM do, yyyy h:mm aa',
      new Date()
    )

    return (
      isFuture(pickupDateTime) || pickupDateTime.getTime() === now.getTime()
    )
  })
  console.log('Filtered records', filteredRecords)

  // const quotes = await prisma.quote.findMany({
  //   orderBy: {
  //     quote_number: 'desc',
  //   },
  //   select: {
  //     quote_number: true,
  //     quote_total: true,
  //     is_booked: true,
  //     created_at: true,
  //     selected_passengers: true,
  //     user: {
  //       select: {
  //         id: true,
  //         first_name: true,
  //         last_name: true,
  //         phone_number: true,
  //         email_address: true,
  //         full_name: true,
  //       },
  //     },
  //     vehicle: true,
  //     service: {
  //       select: {
  //         label: true,
  //       },
  //     },
  //     trips: {
  //       orderBy: {
  //         trip_order: 'asc',
  //       },
  //       include: {
  //         price: {
  //           select: {
  //             line_items_list: true,
  //           },
  //         },
  //         locations: {
  //           orderBy: {
  //             route_order: 'asc',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // console.log(
  //   chalk.magentaBright(`[QUOTES_RETURNED] ${JSON.stringify(quotes)}`)
  // )
  return filteredRecords
})
