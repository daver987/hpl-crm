import { z } from 'zod'

export const PricingPlanSchema = z.object({
  items: z.array(
    z.object({
      pricingId: z.number(),
      externalPricingId: z.string(),
      customerProfileId: z.number(),
      corporateProfileId: z.number(),
      name: z.string(),
      friendlyName: z.string(),
      isGeoPricing: z.boolean(),
      isDefault: z.boolean(),
      isDisabled: z.boolean(),
      modifyDate: z.string(),
    })
  ),
  status: z.string(),
  message: z.string(),
  includesOperationalMessage: z.boolean(),
})

export type PricingPlan = z.infer<typeof PricingPlanSchema>
