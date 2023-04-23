import { z } from 'zod'

export const vehicleTypeSchema = z.object({
  items: z.array(
    z.object({
      vehicleTypeImageUrl: z.string(),
      vehicleTypeId: z.number(),
      externalVehicleTypeId: z.number(),
      vehicleTypeName: z.string(),
      isExcludedFromInternetReservations: z.boolean(),
      passengerCapacity: z.number(),
      bagCapacity: z.number(),
      colorRed: z.number(),
      colorGreen: z.number(),
      colorBlue: z.number(),
      vehicleTypeImageId: z.number(),
      externalVehicleTypeImageId: z.number(),
      externalVehicleTypeMappingSummary: z.object({
        externalVehicleTypeId: z.number(),
        vehicleTypeName: z.string(),
      }),
    })
  ),
  status: z.string(),
  message: z.string(),
  includesOperationalMessage: z.boolean(),
})

export type VehicleType = z.infer<typeof vehicleTypeSchema>
