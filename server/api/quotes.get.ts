// import { isToday, isFuture } from 'date-fns'
// import useDayjs from 'dayjs-nuxt'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  // const dayjs = useDayjs()

  const allRecords = await prisma.quote.findMany({
    include: {
      user: true,
      trips: true,
    },
  })
  console.log('prisma return quotes', allRecords)
  // Filter records to only include those with a pickup_date and pickup_time that is today or in the future

  // const filteredRecords = allRecords.filter((record) => {
  // Parse the date
  //
  // const pickupDate = dayjs(record.trips[0].pickup_date!, 'MMM Do, YYYY')
  // console.log('pickup date', pickupDate)

  // Format the date to 'yyyy-MM-dd'
  // const formattedPickupDate = format(pickupDate, 'yyyy-MM-dd')

  // // Parse the formatted date back to a Date object
  // const pickupDateTime = parse(
  //   `${formattedPickupDate} ${record.trips[0].pickup_time}`,
  //   'yyyy-MM-dd h:mm aa',
  //   new Date()
  // )

  // Verify the parsed date is valid
  //   if (pickupDate instanceof Date) {
  //     return isFuture(pickupDate) || isToday(pickupDate)
  //   } else {
  //     console.error(`Invalid date and/or time: ${record.trips[0].pickup_date}`)
  //   }
  // })

  // console.log('Filtered records', filteredRecords)

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
  return allRecords
})
