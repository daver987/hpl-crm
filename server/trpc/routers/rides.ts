import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

const baseURL = 'https://endpoints.evertransit.com/v2beta/'

export const rideRouter = router({
  getRide: publicProcedure
    .input(
      z.object({
        rideQuery: z.string(),
      })
    )
    .query(async ({ input }) => {
      const apiKey = useRuntimeConfig().EVER_TRANSIT_API_KEY
      const requestOptions = {
        method: 'GET',
      }

      try {
        const response = await fetch(
          `${baseURL}search/rides?apikey=${apiKey}&query=${input.rideQuery}&limit=10&page=1`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return await response.json()
      } catch (err) {
        console.error('Error searching rides:', err)
        return null
      }
    }),

  book: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const apiKey = useRuntimeConfig().EVER_TRANSIT_API_KEY
      const bookedOrder = await ctx.prisma.quote.findUnique({
        where: {
          quote_number: input.quote_number,
        },
        include: {
          user: true,
          trips: {
            include: {
              locations: true,
            },
          },
        },
      })
      const rideUser = bookedOrder?.user
      const rideTrip = bookedOrder?.trips[0]
      const locations = bookedOrder?.trips[0].locations
      try {
        const response = await fetch(`${baseURL}customers?apikey=${apiKey}`, {
          method: 'POST',
          body: JSON.stringify({
            firstName: rideUser?.first_name,
            lastName: rideUser?.last_name,
            phoneNumber: rideUser?.phone_number,
            emailAddress: rideUser?.email_address,
          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return await response.json()
      } catch (err) {
        console.error('Error searching rides:', err)
        return null
      }
    }),
})
