import { z } from 'zod'

export const ReservationDetailSchema = z.object({
  customerId: z.number().nullable().optional(),
  pricingId: z.number().optional().default(208),
  vehicleTypeId: z.enum(['1', '2', '8', '9']).default('1'),
  companyId: z.number().optional().default(1),
  reservationStatus: z
    .enum([
      'None',
      'Quotation',
      'Trip_Confirmed',
      'Driver_Confirmed',
      'En_route',
      'On_Location',
      'Dropped',
      'No_Show',
      'Cancelled',
      'On_Board',
      'Booked',
      'Driver_Scheduled',
    ])
    .default('Booked'),
  travelType: z
    .enum(['None', 'Ground', 'Arrival', 'Departure', 'Transfer'])
    .default('None'),
  reservationPhoneNumber: z.string().optional(),
  referencePO: z.string(),
  bookingSource: z.enum(['Google Ads', 'LRS']).default('Google Ads'),
  bookingCategory: z
    .enum(['Personal', 'Corporate', 'Sub- Contract In'])
    .default('Personal'),
  tripCategory: z
    .enum([
      'Shuttle',
      'Departure',
      'Wedding',
      'Tours',
      'Road Show',
      'Livery',
      'Arrivals',
      'RideMyWay',
      'Transfer',
    ])
    .default('Shuttle'),
  tripType: z
    .enum([
      'Point to Point',
      'To Airport',
      'From Airport',
      'Livery',
      'Hourly As Directed',
    ])
    .default('Point to Point')
    .transform((val) => (val === 'Hourly As Directed' ? 'Livery' : val)),
  orderedBy: z.string(),
  orderedByPhone: z.string().optional(),
  scheduledPickupTime: z.string(),
  estimatedEndTime: z.string().optional(),
  tripNotes: z.string().nullable().optional(),
  fromLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.object({
      street1: z.string().nullable().optional(),
      street2: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      region: z.string().nullable().optional(),
      postalCode: z.string().nullable().optional(),
      country: z.string().nullable().optional(),
      displayAddress: z.string(),
      geoLookupAddress: z.string().nullable().optional(),
      cityRegionPostalCode: z.string().nullable().optional(),
    }),
    // airportAirlineFlightInfo: z
    //   .object({
    //     airportId: z.number(),
    //     airportCode: z.string(),
    //     airportName: z.string(),
    //     airlineId: z.number(),
    //     airlineCode: z.string(),
    //     airlineName: z.string(),
    //     flightNumber: z.string(),
    //     connectingAirportID: z.number(),
    //     scheduledDateTime: z.string(),
    //     actualDateTime: z.string(),
    //     flightStatus: z.string(),
    //     flightStatusAdditional: z.string(),
    //     flightStatusType: z.string(),
    //   })
    //   .optional(),
    displayAddress: z.string(),
  }),
  toLocation: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
      address: z.object({
        street1: z.string().nullable().optional(),
        street2: z.string().nullable().optional(),
        city: z.string().nullable().optional(),
        region: z.string().nullable().optional(),
        postalCode: z.string().nullable().optional(),
        country: z.string().nullable().optional(),
        displayAddress: z.string(),
        geoLookupAddress: z.string().nullable().optional(),
        cityRegionPostalCode: z.string().nullable().optional(),
      }),
      // airportAirlineFlightInfo: z
      //   .object({
      //     airportId: z.number(),
      //     airportCode: z.string(),
      //     airportName: z.string(),
      //     airlineId: z.number(),
      //     airlineCode: z.string(),
      //     airlineName: z.string(),
      //     flightNumber: z.string(),
      //     connectingAirportID: z.number(),
      //     scheduledDateTime: z.string(),
      //     actualDateTime: z.string(),
      //     flightStatus: z.string(),
      //     flightStatusAdditional: z.string(),
      //     flightStatusType: z.string(),
      //   })
      //   .optional(),
      displayAddress: z.string(),
    })
    .optional(),
  passengerCount: z.number().default(1),
  luggageCount: z.number().default(0),
  reservationOrigin: z
    .enum(['None', 'FASTTRAK', 'Internet', 'Web_Service', 'Express'])
    .default('FASTTRAK'),
  primaryPassenger: z.object({
    name: z.string(),
    phoneNumber: z.string().optional(),
    emailAddress: z.string().optional(),
    doEnablePassengerEmail: z.boolean().default(false),
    doEnablePassengerSMS: z.boolean().default(true),
  }),
  affiliatePay: z.number().nullable().optional(),
  isInBilling: z.boolean().default(false),
  isExcludedFromBilling: z.boolean().default(false),
  isFinalized: z.boolean().default(false),
  isInvoiced: z.boolean().default(false),
  isDriverPayProcessed: z.boolean().default(false),
  isDriverPayReadyForProcessing: z.boolean().default(false),
  isChangedDayOfDispatch: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  hasReservationNotes: z.boolean().default(false),
  hasIncidents: z.boolean().default(false),
  isCharter: z.boolean().default(false),
  collectionMethod: z
    .enum([
      'None',
      'Collect_Cash',
      'Collect_Credit_Card',
      'Collect_Check',
      'Collect_Accept_Any',
      'Collect_Voucher',
      'Collect_Gift_Certificate',
      'Billing_Credit_Card',
      'Billing_Room_Charge',
      'Billing_Hotel_Master_Account',
      'Billing_Sales_Dept',
      'Billing_Voucher',
      'Prepaid_Cash',
      'Prepaid_Credit_Card',
      'Prepaid_Check',
      'Prepaid_Trade',
      'Prepaid_Voucher',
      'Prepaid_Gift_Certificate',
      'Process_Credit_Card',
      'Billing_Account',
      'Billing_Wire',
      'Prepaid_Wire',
      'Collect_Cabcharge_',
      'Collect_Diners_Travel_Charge',
    ])
    .default('None'),
  collectionType: z
    .enum(['None', 'Collect', 'Billing', 'Prepaid', 'Process'])
    .default('None'),
  isCharterLeg: z.boolean().default(false),
  isVip: z.boolean().default(false),
  isSpecialHandling: z.boolean().default(false),
  isFarmIn: z.boolean().default(false),
  isFarmOut: z.boolean().default(false),
  // farmInAffiliateSummary: z
  //   .object({
  //     affiliateId: z.number(),
  //     affiliateTypeId: z.number(),
  //     name: z.string(),
  //     typeName: z.string(),
  //     affiliateReservationId: z.string(),
  //     isElectronicAffiliate: z.boolean(),
  //     emailAddress: z.string(),
  //     affiliateCode: z.string(),
  //     affiliateEquipmentId: z.number(),
  //   })
  //   .optional(),
  // farmOutAffiliateSummary: z
  //   .object({
  //     affiliateId: z.number(),
  //     affiliateTypeId: z.number(),
  //     name: z.string(),
  //     typeName: z.string(),
  //     affiliateReservationId: z.string(),
  //     isElectronicAffiliate: z.boolean(),
  //     emailAddress: z.string(),
  //     affiliateCode: z.string(),
  //     affiliateEquipmentId: z.number(),
  //   })
  //   .optional(),
  // pricingInformation: z
  //   .object({
  //     vehicleId: z.enum(['1', '2', '8', '9']).default('1'),
  //     isFlatRate: z.boolean().default(false),
  //     baseRate: z
  //       .object({
  //         minimum: z.number().optional(),
  //         estimated: z.number().optional(),
  //         quantity: z.number().default(1),
  //         rate: z.number().optional(),
  //         total: z.number().optional(),
  //         name: z.string().optional(),
  //         pricingItemType: z
  //           .enum([
  //             'None',
  //             'Vehicle_Type',
  //             'Flat_Rate_Vehicle_Type',
  //             'Fixed_Charge_Item',
  //             'Variable_Fee_Item',
  //             'Tax_Item',
  //             'Base_Charges',
  //             'Base_Additional_Charges_1',
  //             'Base_Additional_Charges_2',
  //             'Discount',
  //           ])
  //           .default('None'),
  //       })
  //       .optional(),
  //     additionalCharge1: z
  //       .object({
  //         minimum: z.number().optional(),
  //         estimated: z.number().optional(),
  //         quantity: z.number().optional(),
  //         rate: z.number().optional(),
  //         total: z.number().optional(),
  //         name: z.string().optional(),
  //         pricingItemType: z
  //           .enum([
  //             'None',
  //             'Vehicle_Type',
  //             'Flat_Rate_Vehicle_Type',
  //             'Fixed_Charge_Item',
  //             'Variable_Fee_Item',
  //             'Tax_Item',
  //             'Base_Charges',
  //             'Base_Additional_Charges_1',
  //             'Base_Additional_Charges_2',
  //             'Discount',
  //           ])
  //           .default('None'),
  //       })
  //       .optional(),
  //     additionalCharge2: z
  //       .object({
  //         minimum: z.number().optional(),
  //         estimated: z.number().optional(),
  //         quantity: z.number().default(1),
  //         rate: z.number().optional(),
  //         total: z.number().optional(),
  //         name: z.string().optional(),
  //         pricingItemType: z
  //           .enum([
  //             'None',
  //             'Vehicle_Type',
  //             'Flat_Rate_Vehicle_Type',
  //             'Fixed_Charge_Item',
  //             'Variable_Fee_Item',
  //             'Tax_Item',
  //             'Base_Charges',
  //             'Base_Additional_Charges_1',
  //             'Base_Additional_Charges_2',
  //             'Discount',
  //           ])
  //           .default('None'),
  //       })
  //       .optional(),
  // additionalPricingItems: z
  //   .array(
  //     z.object({
  //       pricingItemId: z.number(),
  //       zoneAdditionalChargeItemId: z.string(),
  //       isQuantifiable: z.boolean(),
  //       isFixedPrice: z.boolean(),
  //       applyToBaseCharge: z.boolean(),
  //       applyToAdditional1Charge: z.boolean(),
  //       applyToAdditional2Charge: z.boolean(),
  //       appliesToFixedItemList: z.array(z.number()),
  //       appliesToVariableItemList: z.array(z.number()),
  //       appliesToAdditionalItemList: z.array(z.number()),
  //       appliesToZoneAdditionalChargeItemList: z.array(z.string()),
  //       selectedTaxRateId: z.number(),
  //       doPayToDriver: z.boolean(),
  //       doPayToDriverOnlyContractor: z.boolean(),
  //       driverPayPercentage: z.number(),
  //       isCustomerOverride: z.boolean(),
  //       isCorporateOverride: z.boolean(),
  //       quantity: z.number(),
  //       rate: z.number(),
  //       total: z.number(),
  //       name: z.string(),
  //       pricingItemType: z.enum([
  //           "None",
  //           "Vehicle_Type",
  //           "Flat_Rate_Vehicle_Type",
  //           "Fixed_Charge_Item",
  //           "Variable_Fee_Item",
  //           "Tax_Item",
  //           "Base_Charges",
  //           "Base_Additional_Charges_1",
  //           "Base_Additional_Charges_2",
  //           "Discount"
  //         ]).default('None'),
  //     })
  //   )
  //   .optional(),
  //   taxRateList: z
  //     .array(
  //       z.object({
  //         taxRateId: z.number().optional(),
  //         applicableToPricingItemId: z.number().optional(),
  //         name: z.string().optional(),
  //         rate: z.number().optional(),
  //       })
  //     )
  //     .optional(),
  //   incrementalCharge: z.number().optional(),
  //   minimumCharge: z.number().optional(),
  //   minimumRateIncludedAsBase: z.boolean().optional(),
  //   totalCharge: z.number().optional(),
  // })
  // .optional(),
  // additionalPassengerStopList: z
  //   .array(
  //     z
  //       .object({
  //         additionalStopId: z.number(),
  //         reservationId: z.number(),
  //         order: z.number(),
  //         stopType: z.string(),
  //         stopTime: z.string(),
  //         description: z.string(),
  //         notes: z.string(),
  //         address: z
  //           .object({
  //             street1: z.string(),
  //             street2: z.string(),
  //             city: z.string(),
  //             region: z.string(),
  //             postalCode: z.string(),
  //             country: z.string(),
  //             displayAddress: z.string(),
  //             geoLookupAddress: z.string(),
  //             cityRegionPostalCode: z.string(),
  //           })
  //           .optional(),
  //         phoneNumber: z.string(),
  //         flightNumber: z.string(),
  //         airlineId: z.number(),
  //         airportId: z.number(),
  //         latitude: z.number(),
  //         longitude: z.number(),
  //         createTime: z.string(),
  //         modifiedTime: z.string(),
  //       })
  //       .optional()
  //   )
  //   .optional(),
  confirmedBy: z.string(),
})

export type ReservationDetail = z.infer<typeof ReservationDetailSchema>

export const CustomerSummarySchema = z
  .object({
    // doBillCorporate: z.boolean().default(false),
    // doUseCorporatePricingOverrides: z.boolean().default(false),
    customerId: z.number().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    emailAddress: z.string().optional(),
    phoneNumber1: z.string().optional(),
    cellPhoneNumber: z.string().optional(),
    // accountNumber: z.string().optional(),
    // doRequireReferencePo: z.boolean().default(false),
  })
  .optional()

export type CustomerSummary = z.infer<typeof CustomerSummarySchema>

export const CreditCardInfoSchema = z.object({
  creditCardType: z.string(),
  cardHolderName: z.string(),
  cardNumber: z.string(),
  expirationMonth: z.number(),
  expirationYear: z.number(),
  address: z.object({
    street1: z.string(),
    street2: z.string(),
    city: z.string(),
    region: z.string(),
    postalCode: z.string(),
    country: z.string(),
    displayAddress: z.string(),
    geoLookupAddress: z.string(),
    cityRegionPostalCode: z.string(),
  }),
})

export type CreditCardInfo = z.infer<typeof CreditCardInfoSchema>

export const ReservationUpdateOverridesSchema = z.object({
  disableLeadTimeChecks: z.boolean(),
  disableStatusUpdates: z.boolean(),
  disablePricingUpdates: z.boolean(),
  disableStopUpdates: z.boolean(),
  disableDayOfDispatchUpdates: z.boolean(),
  disableTotalChargeEstimateUpdates: z.boolean(),
  disablConfirmationUpdates: z.boolean(),
  disableStatusNotifications: z.boolean(),
  disableReservationChangeNotifications: z.boolean(),
  disableDriverAssignmentNotifications: z.boolean(),
  disableAffiliateUpdates: z.boolean(),
  disableAutomaticTimezoneLookup: z.boolean(),
  disableReservationRetrieveAfterUpdate: z.boolean(),
  disableOperatorNewBookingNotification: z.boolean(),
  disableOperatorUpdateBookingNotification: z.boolean(),
})

export type ReservationUpdateOverrides = z.infer<
  typeof ReservationUpdateOverridesSchema
>

export const ReservationAddWithNewCustomerRequestSchema = z.object({
  ReservationDetailSchema,
  CustomerSummarySchema,
  CreditCardInfoSchema,
  ReservationUpdateOverridesSchema,
})

export type ReservationAddWithNewCustomerRequest = z.infer<
  typeof ReservationAddWithNewCustomerRequestSchema
>
