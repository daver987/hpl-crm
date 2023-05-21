import { QuoteReturnedPickedSchema } from '~/schema/QuoteFormSchema'

export default defineEventHandler(async (event) => {
  const quotes = await event.context.prisma.quote.findMany({
    orderBy: {
      quote_number: 'desc',
    },
    select: {
      quote_number: true,
      quote_total: true,
      is_booked: true,
      created_at: true,
      selected_passengers: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          phone_number: true,
          email_address: true,
          full_name: true,
        },
      },
      vehicle: true,
      service: {
        select: {
          label: true,
        },
      },
      trips: {
        orderBy: {
          trip_order: 'asc',
        },
        include: {
          price: {
            select: {
              line_items_list: true,
            },
          },
          locations: {
            orderBy: {
              route_order: 'asc',
            },
          },
        },
      },
    },
  })
  const pickedQuotes = QuoteReturnedPickedSchema.array().parse(quotes)
  return pickedQuotes
})
