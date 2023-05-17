import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const quoteRouter = router({
  getFiltered: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const quoteReturn = await ctx.prisma.quote.findMany({
        where: {
          AND: [
            {
              quote_number: {
                equals: input.quote_number,
              },
            },
            {
              created_at: {
                gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
              },
            },
            {
              is_booked: {
                equals: false,
              },
            },
          ],
        },
        select: {
          quote_number: true,
          selected_hours: true,
          selected_passengers: true,
          is_round_trip: true,
          quote_total: true,
          quote_subtotal: true,
          quote_tax_total: true,
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
          vehicle: {
            select: {
              label: true,
              vehicle_image: true,
            },
          },
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
              locations: {
                orderBy: {
                  route_order: 'asc',
                },
              },
            },
          },
        },
      })
      console.log(quoteReturn)
      return quoteReturn
    }),

  countToday: publicProcedure.query(async ({ ctx }) => {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    return await ctx.prisma.quote.count({
      where: {
        created_at: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    })
  }),
  countLastSevenDays: publicProcedure.query(async ({ ctx }) => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    return await ctx.prisma.quote.count({
      where: {
        created_at: {
          gte: sevenDaysAgo,
          lte: todayEnd,
        },
        is_booked: false,
      },
    })
  }),

  countBooked: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.quote.count({
      where: {
        is_booked: {
          equals: true,
        },
      },
    })
  }),
  countAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quote.count()
  }),

  getMany: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.quote.findMany({
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
  }),

  getUnique: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.quote.findUnique({
        where: { quote_number: input.quote_number },
        select: {
          quote_number: true,
          selected_hours: true,
          selected_passengers: true,
          is_round_trip: true,
          combined_line_items: true,
          quote_total: true,
          quote_subtotal: true,
          quote_tax_total: true,
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
              locations: {
                orderBy: {
                  route_order: 'asc',
                },
              },
            },
          },
        },
      })
    }),

  delete: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.quote.delete({
        where: { quote_number: input.quote_number },
        include: {
          trips: {
            include: {
              locations: true,
              payment: true,
            },
          },
          service: true,
          vehicle: true,
          line_items: true,
          sales_tax: true,
        },
      })
    }),
})
