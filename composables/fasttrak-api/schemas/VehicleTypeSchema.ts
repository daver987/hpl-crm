import { z } from 'zod'

const VehicleTypeSchema = z.object({
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

export const VehicleTypeResponseSchema = z.object({
  items: z.array(VehicleTypeSchema),
  status: z.string(),
  message: z.string(),
  includesOperationalMessage: z.boolean(),
})

export type VehicleTypeResponse = z.infer<typeof VehicleTypeResponseSchema>
export type VehicleType = z.infer<typeof VehicleTypeSchema>
