import { z } from 'zod'

export const ReservationSchema = z.object({
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
    address: z.object({
      street1: z.string(),
      street2: z.string(),
      city: z.string(),
      region: z.string(),
      postalCode: z.string(),
      displayAddress: z.string(),
      geoLookupAddress: z.string(),
      cityRegionPostalCode: z.string(),
    }),
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
  customerSummary: z.object({
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
  }),
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
  items: z.array(
    z.object({
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
        address: z.array(z.null()),
        airportAirlineFlightInfo: z.array(z.null()),
        additionalInformation: z.string(),
        summaryAddress: z.string(),
        displayAddress: z.string(),
        geoLookupAddress: z.string(),
      }),
      toLocation: z.object({
        latitude: z.number(),
        longitude: z.number(),
        address: z.array(z.null()),
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
      farmInAffiliateSummary: z.object({
        affiliateId: z.number(),
        affiliateTypeId: z.number(),
        name: z.string(),
        affiliateReservationId: z.string(),
        isElectronicAffiliate: z.boolean(),
        emailAddress: z.string(),
        affiliateCode: z.string(),
        affiliateEquipmentId: z.number(),
      }),
      totalDeposits: z.number(),
      creditCardAuthorizationAmount: z.number(),
      pricingInformation: z.object({
        pricingId: z.number(),
        vehicleTypeId: z.number(),
        pricingVehicleTypeZoneId: z.number(),
        isFlatRate: z.boolean(),
        baseRate: z.array(z.null()),
        additionalCharge1: z.array(z.null()),
        additionalCharge2: z.array(z.null()),
        additionalPricingItems: z.array(z.unknown()),
        taxRateList: z.array(z.null()),
        incrementalCharge: z.number(),
        minimumCharge: z.number(),
        minimumRateIncludedAsBase: z.boolean(),
        totalCharge: z.number(),
      }),
      additionalPassengerStopList: z.array(z.unknown()),
      companySummary: z.object({
        companyId: z.number(),
        companyName: z.string(),
      }),
      customerSummary: z.object({
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
      }),
      vehicleSummary: z.object({
        vehicleId: z.number(),
        vehicleTypeId: z.number(),
        year: z.number(),
        capacity: z.number(),
        currentMileage: z.number(),
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
      customerContactId: z.number(),
      corporateProfileContactId: z.number(),
      cancelledBy: z.string(),
      confirmedBy: z.string(),
      createTime: z.string(),
      modifiedTime: z.string(),
    })
  ),
  status: z.string(),
  includesOperationalMessage: z.boolean(),
})

export const ReservationDateAndTotalSchema = ReservationSchema.pick({
  totalCharges: true,
  scheduledPickupTime: true,
  isFinalized: true,
  isInvoiced: true,
  reservationId: true,
})

export type Reservation = z.infer<typeof ReservationSchema>
export type ReservationResponse = z.infer<typeof ReservationResponseSchema>
