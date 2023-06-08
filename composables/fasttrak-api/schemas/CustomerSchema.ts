import { z } from 'zod'

export const CustomerSummarySchema = z
  .object({
    doBillCorporate: z.boolean().default(false),
    doUseCorporatePricingOverrides: z.boolean().default(false),
    customerId: z.number().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    emailAddress: z.string().optional(),
    phoneNumber1: z.string().optional(),
    cellPhoneNumber: z.string().optional(),
    accountNumber: z.string().optional(),
    doRequireReferencePo: z.boolean().default(false),
  })
  .optional()

export const CustomerSearchSchema = z.object({
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  emailAddress: z.string(),
  corporateProfileId: z.number().optional(),
  includeInactive: z.boolean().default(false).optional(),
})

export type CustomerSearch = z.infer<typeof CustomerSearchSchema>

export const CustomerResponseSchema = z.object({
  items: z.array(
    z.object({
      doBillCorporate: z.boolean(),
      doUseCorporatePricingOverrides: z.boolean(),
      profileNotes: z.string(),
      invoiceMessage: z.string(),
      invoiceCreateHandlingType: z.string(),
      deliveryMethod: z.string(),
      deliveryFrequency: z.string(),
      customerId: z.number(),
      corporateProfileCompanyName: z.string(),
      companyName: z.string(),
      companyId: z.number(),
      corporateProfileId: z.number(),
      lastName: z.string(),
      designation: z.string(),
      greetSignAlias: z.string(),
      phoneNumber2: z.string(),
      faxNumber: z.string(),
      firstName: z.string(),
      middleName: z.string(),
      emailAddress: z.string(),
      phoneNumber1: z.string(),
      referencePO: z.string(),
      tripNotes: z.string(),
      miscNotes: z.string(),
      preferences: z.string(),
      customerSinceDate: z.string(),
      lastModifyDate: z.string(),
      orderedByName: z.string(),
      orderedByPhone: z.string(),
      defaultTimezone: z.string(),
      cellPhoneNumber: z.string(),
      accountNumber: z.string(),
      doRequireReferencePo: z.boolean(),
      street1: z.string(),
      street2: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      bookingMessage: z.string(),
      costCode: z.string(),
      defaultVehicleTypeId: z.number(),
      defaultPricingId: z.number(),
      defaultPricingName: z.string(),
      bookingSourceId: z.number(),
      bookingCategoryId: z.number(),
      tripCategoryId: z.number(),
      tripTypeId: z.number(),
      collectionType: z.string(),
      collectionMethod: z.string(),
      collectionTermsDays: z.number(),
      collectionTermsDaysLateFees: z.number(),
      invoiceSortOrder: z.string(),
      alternateContractId: z.number(),
      isVip: z.boolean(),
      isSpecialHandling: z.boolean(),
      isInactive: z.boolean(),
      createDate: z.string(),
      lastReservationDate: z.string(),
      lastModifyFTUserId: z.number(),
      createdByFTUserId: z.number(),
      affiliateSystemGuid: z.string(),
      isQuickQuoteCustomer: z.boolean(),
      isAffiliateCustomer: z.boolean(),
      isTransientCustomer: z.boolean(),
      isTransponetAccountCatchall: z.boolean(),
      doAllowTransponetHourlyPricing: z.boolean(),
    })
  ),
  status: z.string(),
  message: z.string(),
  includesOperationalMessage: z.boolean(),
})

export type CustomerResponse = z.infer<typeof CustomerResponseSchema>
