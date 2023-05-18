import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import chalk from 'chalk'

export const vehicleRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedVehicles = await useStorage().getItem('formItems:vehicles')
    if (!storedVehicles) {
      const vehicles = await ctx.prisma.vehicle.findMany({
        orderBy: {
          vehicle_number: 'asc',
        },
      })
      await useStorage().setItem('formItems:vehicles', JSON.stringify(vehicles))
      console.log(chalk.blue('[NEW_VEHICLE]', vehicles))
      return vehicles
    } else {
      console.log(
        chalk.green('[STORED_VEHICLE]', JSON.stringify(storedVehicles))
      )
      return storedVehicles
    }
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        label: z.string().optional(),
        per_km: z.number().optional(),
        per_hour: z.number().optional(),
        min_rate: z.number().optional(),
        min_distance: z.number().optional(),
        is_active: z.boolean().optional().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.vehicle.update({
        where: {
          id: input.id,
        },
        data: input,
      })
    }),
})
