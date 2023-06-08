import { z } from 'zod'
import { CustomerSummarySchema } from '~/composables'
import { SingleReservationSchema } from '~/composables/fasttrak-api/schemas/SingleReservation'

const AddressSchema = z.object({
  street1: z.string(),
  street2: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  displayAddress: z.string(),
  geoLookupAddress: z.string(),
  cityRegionPostalCode: z.string(),
})

export const ReservationSchemaTwo = z.object({
  createUser: z.string(),
  reservationId: z.number(),
  vehicleId: z.number(),
  employeeId: z.number(),
  greeterId: z.number(),
  externalBookingId: z.string(),
  companyId: z.number(),
  reservationGroupId: z.number(),
  customerId: z.number(),
  corporateProfileId: z.number(),
  pricingId: z.number(),
  vehicleTypeId: z.number(),
  reservationStatus: z.string(),
  travelType: z.string(),
  reservationPhoneNumber: z.string(),
  referencePO: z.string(),
  costCode: z.string(),
  bookingSource: z.string(),
  bookingCategory: z.string(),
  tripCategory: z.string(),
  tripType: z.string(),
  orderedBy: z.string(),
  orderedByPhone: z.string(),
  timeZoneName: z.string(),
  scheduledPickupTime: z.string(),
  estimatedEndTime: z.string(),
  isDatabaseTimezone: z.boolean(),
  timeZoneUTCOffsetMinutes: z.number(),
  timeZoneLocalOffsetMinutes: z.number(),
  driverInTime: z.null(),
  driverSpotTime: z.null(),
  enRouteTime: z.null(),
  onLocationTime: z.null(),
  actualPickupTime: z.null(),
  dropoffTime: z.null(),
  noShowTime: z.null(),
  cancelTime: z.null(),
  returnTime: z.null(),
  billingStartTime: z.null(),
  billingEndTime: z.null(),
  actualHours: z.number(),
  estimatedHours: z.number(),
  beginMileage: z.number(),
  endMileage: z.number(),
  driverNotes: z.string(),
  driverDispatchStatus: z.string(),
  dispatchNotes: z.string(),
  tripNotes: z.string(),
  affiliateNotes: z.string(),
  tripPreferences: z.string(),
  fromLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: AddressSchema,
    airportAirlineFlightInfo: z.object({
      airportId: z.number(),
      airportCode: z.string(),
      airportName: z.string(),
      airlineId: z.number(),
      airlineCode: z.string(),
      airlineName: z.string(),
      flightNumber: z.string(),
      connectingAirportID: z.number(),
      scheduledDateTime: z.string(),
      actualDateTime: z.null(),
      flightStatus: z.string(),
      flightStatusAdditional: z.string(),
      flightStatusType: z.string(),
    }),
    additionalInformation: z.string(),
    summaryAddress: z.string(),
    displayAddress: z.string(),
    geoLookupAddress: z.string(),
  }),
  toLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: AddressSchema,
    additionalInformation: z.string(),
    summaryAddress: z.string(),
    displayAddress: z.string(),
    geoLookupAddress: z.string(),
  }),
  passengerCount: z.number(),
  luggageCount: z.number(),
  primaryPassenger: z.object({
    name: z.string(),
    alias: z.string(),
    phoneNumber: z.string(),
    emailAddress: z.string(),
    doEnablePassengerEmail: z.boolean(),
    doEnablePassengerSMS: z.boolean(),
  }),
  numAdditionalStops: z.number(),
  numSupportDocuments: z.number(),
  reservationOrigin: z.string(),
  totalCharges: z.number(),
  affiliatePay: z.number(),
  isInBilling: z.boolean(),
  isExcludedFromBilling: z.boolean(),
  isFinalized: z.boolean(),
  isInvoiced: z.boolean(),
  isDriverPayProcessed: z.boolean(),
  isDriverPayReadyForProcessing: z.boolean(),
  isChangedDayOfDispatch: z.boolean(),
  isRecurring: z.boolean(),
  hasReservationNotes: z.boolean(),
  hasIncidents: z.boolean(),
  isCharter: z.boolean(),
  isCharterLeg: z.boolean(),
  charterReservationId: z.number(),
  charterMoveId: z.number(),
  charterMoveName: z.string(),
  charterLegType: z.string(),
  collectionMethod: z.string(),
  collectionType: z.string(),
  creditCardId: z.number(),
  isVip: z.boolean(),
  isSpecialHandling: z.boolean(),
  segmentId: z.string(),
  alternateContractId: z.number(),
  doInvoiceCustomerDirectly: z.boolean(),
  isFarmIn: z.boolean(),
  isFarmOut: z.boolean(),
  totalDeposits: z.number(),
  creditCardAuthorizationAmount: z.number(),
  companySummary: z.object({
    companyId: z.number(),
    companyName: z.string(),
  }),
  customerSummary: CustomerSummarySchema,
  vehicleSummary: z.object({
    vehicleId: z.number(),
    vehicleTypeId: z.number(),
    name: z.string(),
    make: z.string(),
    model: z.string(),
    color: z.string(),
    year: z.number(),
    capacity: z.number(),
    vehiclePlate: z.string(),
    currentMileage: z.number(),
    phoneNumber: z.string(),
    messageAddress: z.string(),
    vin: z.string(),
  }),
  vehicleTypeSummary: z.object({
    vehicleTypeId: z.number(),
    externalVehicleTypeId: z.number(),
    vehicleTypeName: z.string(),
    isExcludedFromInternetReservations: z.boolean(),
    passengerCapacity: z.number(),
    bagCapacity: z.number(),
    colorRed: z.number(),
    colorGreen: z.number(),
    colorBlue: z.number(),
  }),
  driverSummary: z.object({
    employeeId: z.number(),
    affiliateId: z.number(),
    affiliateDriverId: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    cellPhoneNumber: z.string(),
    emailAddress: z.string(),
    status: z.string(),
    driverType: z.string(),
  }),
  customerContactId: z.number(),
  corporateProfileContactId: z.number(),
  cancelledBy: z.string(),
  confirmedBy: z.string(),
  createTime: z.string(),
  modifiedTime: z.string(),
})

export const ReservationResponseSchema = z.object({
  items: z.array(SingleReservationSchema),
  status: z.string(),
  includesOperationalMessage: z.boolean(),
})

export const ReservationDateAndTotalSchema = ReservationSchemaTwo.pick({
  totalCharges: true,
  scheduledPickupTime: true,
  isFinalized: true,
  isInvoiced: true,
  reservationId: true,
})

export const ReservationSchema = z.object({
  customerId: z.number().nullable().optional(),
  pricingId: z.number().optional().default(208),
  vehicleId: z.number().default(1),
  vehicleTypeId: z.number().default(1),
  employeeId: z.number().optional().default(0),
  greeterId: z.number().optional().default(0),
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
  referencePO: z.string().nullable(),
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
  orderedBy: z.string().nullable(),
  orderedByPhone: z.string().optional().nullable(),
  confirmedBy: z.string().nullable(),
  scheduledPickupTime: z.string().optional(),
  estimatedEndTime: z.string().optional(),
  tripNotes: z.string().nullable().optional(),
  estimatedHours: z.number().optional().default(1),
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
      displayAddress: z.string().nullable(),
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
    displayAddress: z.string().nullable(),
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
      displayAddress: z.string().nullable(),
    })
    .optional(),
  passengerCount: z.number().default(1),
  luggageCount: z.number().default(0),
  reservationOrigin: z
    .enum(['None', 'FASTTRAK', 'Internet', 'Web_Service', 'Express'])
    .default('FASTTRAK'),
  primaryPassenger: z.object({
    name: z.string().nullable(),
    phoneNumber: z.string().optional().nullable(),
    emailAddress: z.string().optional().nullable(),
    doEnablePassengerEmail: z.boolean().default(false),
    doEnablePassengerSMS: z.boolean().default(true),
  }),
  affiliatePay: z.number().nullable().optional().nullable(),
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
  numAdditionalStops: z.number().default(0),
  segmentId: z.string().optional(),
  doInvoiceCustomerDirectly: z.boolean(),
  companySummary: z.object({
    companyId: z.number(),
    companyName: z.string(),
  }),
  corporateProfileSummary: z.object({
    corporateProfileId: z.number(),
    companyName: z.string().optional(),
  }),
  pricingInformation: z.object({
    pricingId: z.number(),
    vehicleTypeId: z.number(),
    pricingVehicleTypeZoneId: z.number(),
    isFlatRate: z.boolean(),
    baseRate: z.object({
      minimum: z.number(),
      estimated: z.number(),
      quantity: z.number(),
      rate: z.number(),
      name: z.string(),
      pricingItemType: z.string(),
    }),
    additionalPricingItems: z.array(
      z.union([
        z.object({
          pricingItemId: z.number(),
          isQuantifiable: z.boolean(),
          isFixedPrice: z.boolean(),
          applyToBaseCharge: z.boolean(),
          applyToAdditional1Charge: z.boolean(),
          applyToAdditional2Charge: z.boolean(),
          selectedTaxRateId: z.number(),
          doPayToDriver: z.boolean(),
          doPayToDriverOnlyContractor: z.boolean(),
          driverPayPercentage: z.number(),
          isCustomerOverride: z.boolean(),
          isCorporateOverride: z.boolean(),
          quantity: z.number(),
          rate: z.number(),
          name: z.string(),
          pricingItemType: z.string(),
        }),
        z.object({
          pricingItemId: z.number(),
          isQuantifiable: z.boolean(),
          isFixedPrice: z.boolean(),
          applyToBaseCharge: z.boolean(),
          applyToAdditional1Charge: z.boolean(),
          applyToAdditional2Charge: z.boolean(),
          appliesToFixedItemList: z.array(z.unknown()),
          appliesToAdditionalItemList: z.array(z.unknown()),
          selectedTaxRateId: z.number(),
          doPayToDriver: z.boolean(),
          doPayToDriverOnlyContractor: z.boolean(),
          driverPayPercentage: z.number(),
          isCustomerOverride: z.boolean(),
          isCorporateOverride: z.boolean(),
          quantity: z.number(),
          rate: z.number(),
          name: z.string(),
          pricingItemType: z.string(),
        }),
        z.object({
          pricingItemId: z.number(),
          isQuantifiable: z.boolean(),
          isFixedPrice: z.boolean(),
          applyToBaseCharge: z.boolean(),
          applyToAdditional1Charge: z.boolean(),
          applyToAdditional2Charge: z.boolean(),
          appliesToFixedItemList: z.array(z.number()),
          appliesToVariableItemList: z.array(z.number()),
          appliesToAdditionalItemList: z.array(z.unknown()),
          appliesToZoneAdditionalChargeItemList: z.array(z.unknown()),
          selectedTaxRateId: z.number(),
          doPayToDriver: z.boolean(),
          doPayToDriverOnlyContractor: z.boolean(),
          driverPayPercentage: z.number(),
          isCustomerOverride: z.boolean(),
          isCorporateOverride: z.boolean(),
          quantity: z.number(),
          rate: z.number(),
          name: z.string(),
          pricingItemType: z.string(),
        }),
      ])
    ),
    taxRateList: z.array(
      z.object({
        taxRateId: z.number(),
        applicableToPricingItemId: z.number(),
        name: z.string(),
        rate: z.number(),
      })
    ),
    incrementalCharge: z.number(),
    minimumCharge: z.number(),
    minimumRateIncludedAsBase: z.boolean(),
  }),
})

export type SingleReservation = z.infer<typeof SingleReservationSchema>
export type Reservation = z.infer<typeof ReservationSchema>
export type ReservationResponse = z.infer<typeof ReservationResponseSchema>
export type ReservationDateAndTotal = z.infer<
  typeof ReservationDateAndTotalSchema
>
