import { z } from 'zod'

export const CustomerSummarySchema = z.object({
  doBillCorporate: z.boolean(),
  doUseCorporatePricingOverrides: z.boolean(),
  profileNotes: z.string(),
  invoiceMessage: z.string(),
  invoiceCreateHandlingType: z.string(),
  corporateProfileId: z.number(),
  deliveryMethod: z.string(),
  deliveryFrequency: z.string(),
  customerId: z.number(),
  companyId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  emailAddress: z.string(),
  phoneNumber1: z.string(),
  cellPhoneNumber: z.string(),
  accountNumber: z.string(),
  doRequireReferencePo: z.boolean(),
})
