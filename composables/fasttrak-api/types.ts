import { z } from 'zod'

const ReservationStatus = {
  None: 'None',
  Quotation: 'Quotation',
  Trip_Confirmed: 'Trip_Confirmed',
  Driver_Confirmed: 'Driver_Confirmed',
  En_route: 'En_route',
  On_Location: 'On_Location',
  Dropped: 'Dropped',
  No_Show: 'No_Show',
  Cancelled: 'Cancelled',
  On_Board: 'On_Board',
  Booked: 'Booked',
  Driver_Scheduled: 'Driver_Scheduled',
} as const
export const ReservationStatusSchema = z.enum(Object.values(ReservationStatus))
type ReservationStatusEnum =
  (typeof ReservationStatus)[keyof typeof ReservationStatus]

const TravelType = {
  None: 'None',
  Ground: 'Ground',
  Arrival: 'Arrival',
  Departure: 'Departure',
  Transfer: 'Transfer',
} as const

type TravelTypeEnum = (typeof TravelType)[keyof typeof TravelType]

const BookingSource = {
  GoogleAds: 'Google Ads',
  LRS: 'LRS',
} as const

type BookingSourceEnum = (typeof BookingSource)[keyof typeof BookingSource]

const BookingCategory = {
  Personal: 'Personal',
  Corporate: 'Corporate',
  SubContractIn: 'Sub- Contract In',
} as const

type BookingCategoryEnum =
  (typeof BookingCategory)[keyof typeof BookingCategory]

const TripCategory = {
  Shuttle: 'Shuttle',
  Departure: 'Departure',
  Wedding: 'Wedding',
  Tours: 'Tours',
  RoadShow: 'Road Show',
  Livery: 'Livery',
  Arrivals: 'Arrivals',
  RideMyWay: 'RideMyWay',
  Transfer: 'Transfer',
} as const

type TripCategoryEnum = (typeof TripCategory)[keyof typeof TripCategory]

const TripType = {
  PointToPoint: 'Point to Point',
  ToAirport: 'To Airport',
  FromAirport: 'From Airport',
  Livery: 'Livery',
  HourlyAsDirected: 'Hourly As Directed',
} as const

type TripTypeEnum = (typeof TripType)[keyof typeof TripType]

const ReservationOrigin = {
  None: 'None',
  FASTTRAK: 'FASTTRAK',
  Internet: 'Internet',
  Web_Service: 'Web_Service',
  Express: 'Express',
} as const

type ReservationOriginEnum =
  (typeof ReservationOrigin)[keyof typeof ReservationOrigin]

const CollectionType = {
  None: 'None',
  Collect: 'Collect',
  Billing: 'Billing',
  Prepaid: 'Prepaid',
  Process: 'Process',
} as const

type CollectionTypeEnum = (typeof CollectionType)[keyof typeof CollectionType]

const CollectionMethod = {
  None: 'None',
  Collect_Cash: 'Collect_Cash',
  Collect_Credit_Card: 'Collect_Credit_Card',
  Collect_Check: 'Collect_Check',
  Collect_Accept_Any: 'Collect_Accept_Any',
  Collect_Voucher: 'Collect_Voucher',
  Collect_Gift_Certificate: 'Collect_Gift_Certificate',
  Billing_Credit_Card: 'Billing_Credit_Card',
  Billing_Room_Charge: 'Billing_Room_Charge',
  Billing_Hotel_Master_Account: 'Billing_Hotel_Master_Account',
  Billing_Sales_Dept: 'Billing_Sales_Dept',
  Billing_Voucher: 'Billing_Voucher',
  Prepaid_Cash: 'Prepaid_Cash',
  Prepaid_Credit_Card: 'Prepaid_Credit_Card',
  Prepaid_Check: 'Prepaid_Check',
  Prepaid_Trade: 'Prepaid_Trade',
  Prepaid_Voucher: 'Prepaid_Voucher',
  Prepaid_Gift_Certificate: 'Prepaid_Gift_Certificate',
  Process_Credit_Card: 'Process_Credit_Card',
  Billing_Account: 'Billing_Account',
  Billing_Wire: 'Billing_Wire',
  Prepaid_Wire: 'Prepaid_Wire',
  Collect_Cabcharge_: 'Collect_Cabcharge_',
  Collect_Diners_Travel_Charge: 'Collect_Diners_Travel_Charge',
} as const

type CollectionMethodEnum =
  (typeof CollectionMethod)[keyof typeof CollectionMethod]

export type Address = {
  street1: string
  street2: string
  city: string
  region: string
  postalCode: string
  country?: string
  displayAddress: string
  geoLookupAddress: string
  cityRegionPostalCode: string
}

export type AirportAirlineFlightInfo = {
  airportId: number
  airportCode: string
  airportName: string
  airlineId: number
  airlineCode: string
  airlineName: string
  flightNumber: string
  connectingAirportID: number
  scheduledDateTime: string
  actualDateTime?: any
  flightStatus: string
  flightStatusAdditional: string
  flightStatusType: string
}

export type FromLocation = {
  latitude: number
  longitude: number
  address: Address
  airportAirlineFlightInfo?: AirportAirlineFlightInfo
  additionalInformation: string
  summaryAddress: string
  displayAddress: string
  geoLookupAddress: string
}

export type ToLocation = {
  latitude: number
  longitude: number
  address: Address
  additionalInformation: string
  summaryAddress: string
  displayAddress: string
  geoLookupAddress: string
}

export type PrimaryPassenger = {
  name: string
  alias: string
  phoneNumber: string
  emailAddress: string
  doEnablePassengerEmail: boolean
  doEnablePassengerSMS: boolean
}

export type FarmInAffiliateSummary = {
  affiliateId: number
  affiliateTypeId: number
  name: string
  affiliateReservationId: string
  isElectronicAffiliate: boolean
  emailAddress: string
  affiliateCode: string
  affiliateEquipmentId: number
}

export type CompanySummary = {
  companyId: number
  companyName: string
}

export type CustomerSummary = {
  doBillCorporate: boolean
  doUseCorporatePricingOverrides: boolean
  profileNotes?: string
  invoiceMessage?: string
  invoiceCreateHandlingType: string
  corporateProfileId?: number
  deliveryMethod?: string
  deliveryFrequency?: string
  customerId: number
  companyId: number
  firstName: string
  lastName: string
  middleName?: string
  emailAddress: string
  phoneNumber1?: string
  cellPhoneNumber?: string
  accountNumber?: string
  doRequireReferencePo: boolean
}

export type CorporateProfileSummary = {
  corporateProfileId: number
  companyName: string
}

export type VehicleSummary = {
  vehicleId: number
  vehicleTypeId: number
  year: number
  capacity: number
  currentMileage: number
  name?: string
  make?: string
  model?: string
  color?: string
  vehiclePlate?: string
  phoneNumber?: string
  messageAddress: string
  vin: string
}

export type VehicleTypeSummary = {
  vehicleTypeId: number
  externalVehicleTypeId: number
  vehicleTypeName: string
  isExcludedFromInternetReservations: boolean
  passengerCapacity: number
  bagCapacity: number
  colorRed: number
  colorGreen: number
  colorBlue: number
}

export type DriverSummary = {
  employeeId: number
  affiliateId: number
  affiliateDriverId: number
  firstName: string
  lastName: string
  cellPhoneNumber: string
  emailAddress: string
  status: string
  driverType: string
}

export type Reservation = {
  createUser: string
  reservationId: number
  vehicleId: number
  employeeId: number
  greeterId: number
  externalBookingId: string
  companyId: number
  reservationGroupId: number
  customerId: number
  corporateProfileId: number
  pricingId: number
  vehicleTypeId: number
  reservationStatus: ReservationStatusEnum
  travelType: TravelTypeEnum
  reservationPhoneNumber: string
  referencePO?: string
  costCode: string
  bookingSource: BookingSourceEnum
  bookingCategory: BookingCategoryEnum
  tripCategory: TripCategoryEnum
  tripType: TripTypeEnum
  orderedBy: string
  orderedByPhone: string
  timeZoneName: string
  scheduledPickupTime: string
  estimatedEndTime: string
  isDatabaseTimezone: boolean
  timeZoneUTCOffsetMinutes: number
  timeZoneLocalOffsetMinutes: number
  driverInTime?: any
  driverSpotTime?: any
  enRouteTime: string
  onLocationTime: string
  actualPickupTime: string
  dropoffTime: string
  noShowTime?: any
  cancelTime?: any
  returnTime?: any
  billingStartTime: string
  billingEndTime: string
  actualHours: number
  estimatedHours: number
  beginMileage: number
  endMileage: number
  driverNotes: string
  driverDispatchStatus: string
  dispatchNotes: string
  tripNotes: string
  affiliateNotes: string
  tripPreferences: string
  fromLocation: FromLocation
  toLocation: ToLocation
  passengerCount: number
  luggageCount: number
  primaryPassenger: PrimaryPassenger
  numAdditionalStops: number
  numSupportDocuments: number
  reservationOrigin: ReservationOriginEnum
  totalCharges: number
  affiliatePay: number
  isInBilling: boolean
  isExcludedFromBilling: boolean
  isFinalized: boolean
  isInvoiced: boolean
  isDriverPayProcessed: boolean
  isDriverPayReadyForProcessing: boolean
  isChangedDayOfDispatch: boolean
  isRecurring: boolean
  hasReservationNotes: boolean
  hasIncidents: boolean
  isCharter: boolean
  isCharterLeg: boolean
  charterReservationId: number
  charterMoveId: number
  charterMoveName: string
  charterLegType: string
  collectionMethod: CollectionMethodEnum
  collectionType: CollectionTypeEnum
  creditCardId: number
  isVip: boolean
  isSpecialHandling: boolean
  segmentId: string
  alternateContractId: number
  doInvoiceCustomerDirectly: boolean
  isFarmIn: boolean
  isFarmOut: boolean
  farmInAffiliateSummary: FarmInAffiliateSummary
  totalDeposits: number
  creditCardAuthorizationAmount: number
  companySummary: CompanySummary
  customerSummary: CustomerSummary
  corporateProfileSummary: CorporateProfileSummary
  vehicleSummary: VehicleSummary
  vehicleTypeSummary: VehicleTypeSummary
  driverSummary: DriverSummary
  customerContactId: number
  corporateProfileContactId: number
  cancelledBy: string
  confirmedBy: string
  createTime: string
  modifiedTime: string
}

export type ReservationBillingSummary = {
  reservationId: number
  reservationGross: number
  reservationNetAfterPay: number
  grossMargin: number
  reservationEmployeeType: string
  vehicleTypeName: string
}

export type EmployeePay = {
  employeePayId: number
  employeeName: string
  employeeId: number
  reference: string
  billingHoursForPay: number
  total: number
  reservationId: number
  isPaid: boolean
  isApproved: boolean
  isCreatedInBilling: boolean
  scheduledPayDate?: any
  actualPayDate?: any
  createTime: string
  companyId: number
  scheduledPickupTime: string
  paymentNotes: string
  passengerName: string
  reservationBillingSummary: ReservationBillingSummary
  customerName: string
}

export type AffiliateSettings = {
  doShowTripNotesOnAffiliateConfirmation: boolean
  doShowPrefsOnAffiliateConfirmation: boolean
  doShowAffiliateNotesOnAffiliateConfirmation: boolean
  doShowAffiliateCostOnConfirmation: boolean
  doShowPaymentTermsOnAffiliateConfirmations: boolean
  doShowOrderedByOnAffiliateConfirmations: boolean
  doShowCellNumberOnAffiliateConfirmations: boolean
  doShowCustomerCellNumberOnAffiliateConfirmations: boolean
  doSendEaffiliateOrderedBy: boolean
  doSendEaffiliateCustomerPhone: boolean
  doSendEaffiliatePassengerPhone: boolean
  doSendEaffiliateTripNotes: boolean
  doSendEaffiliateAffiliateNotes: boolean
  doSendEaffiliatePreferences: boolean
  doShowAffiliateDriversOnDispatch: boolean
  doIncludeAffiliateTripLinkSmsEmail: boolean
  doShowPricingOnAffiliateConfirmations: boolean
}

const AffiliateType = {
  None: 'None',
  FASTTRAK_EAFFILIATE: 'FASTTRAK_EAFFILIATE',
  DEEM: 'DEEM',
  GRIDD: 'GRIDD',
  CAREY: 'CAREY',
  LIMOLINK: 'LIMOLINK',
  GROUNDSPAN: 'GROUNDSPAN',
  KARHOO: 'KARHOO',
} as const

type AffiliateTypeEnum = (typeof AffiliateType)[keyof typeof AffiliateType]

export type Affiliate = {
  affiliateId: number
  name: string
  affiliateType: AffiliateTypeEnum
  isInactive: boolean
  phoneMain: string
  emailMain: string
  phoneTollFree: string
  phoneFaxPage: string
  phoneAfterHours: string
  yearEstablished: number
  businessOwner: string
  primaryContact: string
  primaryContactTitle: string
  billingContact: string
  website: string
  emailReservations: string
  emailAccounting: string
  emailBilling: string
  emailManager: string
  serviceArea: string
  liveryLicense: string
  taxId: string
  paymentTerms: string
  qualityRating: string
  insuranceInfo: string
  timeOffset: number
  fleetSize: number
  notes: string
  renewalInfo: string
  commissionPercentage: number
  address: Address
  affiliateSystemGuid: string
  affiliateCode: string
  affiliateSettings: AffiliateSettings
}

export type AddressPrimary = {
  street1: string
  street2: string
  city: string
  region: string
  postalCode: string
  country: string
  displayAddress: string
  geoLookupAddress: string
  cityRegionPostalCode: string
}

export type AddressAlternate = {
  street1: string
  street2: string
  city: string
  region: string
  postalCode: string
  country: string
  displayAddress: string
  geoLookupAddress: string
  cityRegionPostalCode: string
}

export type Company = {
  companyId: number
  id: number
  name: string
  isPrimary: boolean
  addressPrimary: AddressPrimary
  isPrimaryPhysicalAddress: boolean
  isPrimaryCorrespondenceAddress: boolean
  addressAlternate: AddressAlternate
  isAlternatePhysicalAddress: boolean
  isAlternateCorrespondenceAddress: boolean
  phoneTollFree: string
  phoneMain: string
  phoneAfterHours: string
  colorRed: number
  colorGreen: number
  colorBlue: number
  emailAddress: string
  webSiteAddress: string
  isCreditCardProcessingEnabled: boolean
  isCreditCardReportingAvailable: boolean
  imageUrl: string
  latitude: number
  longitude: number
}

export type CorporateProfile = {
  corporateProfileId: number
  companyName: string
  accountNumber: string
  phoneNumber1: string
  emailAddress: string
  referencePO: string
  costCode: string
  corporateProfileNotes: string
  miscNotes: string
  pricingId: number
  corporateGuid: string
  passengerAlias: string
  phoneNumber2: string
  faxNumber: string
  isTaxExempt: boolean
  doLockPricingOverrides: boolean
  doRequireReferencePo: boolean
  invoiceMessage: string
  collectionType: CollectionTypeEnum
  collectionMethod: CollectionMethodEnum
  collectionTermsDays: number
  collectionTermsDaysLateFees: number
  deliveryMethod: string
  deliveryFrequency: string
  invoiceCreateHandlingType: string
  clientSinceDate: string
  createDate: string
  lastModifyDate: string
  lastModifyFTUserId: number
  createdByFTUserId: number
}

export type Customer = {
  doBillCorporate: boolean
  doUseCorporatePricingOverrides: boolean
  profileNotes: string
  invoiceMessage: string
  invoiceCreateHandlingType: string
  corporateProfileId: number
  deliveryMethod: string
  deliveryFrequency: string
  customerId: number
  corporateProfileCompanyName: string
  companyName: string
  companyId: number
  lastName: string
  designation: string
  greetSignAlias: string
  phoneNumber2: string
  faxNumber: string
  firstName: string
  middleName: string
  emailAddress: string
  phoneNumber1: string
  referencePO: string
  tripNotes: string
  miscNotes: string
  preferences: string
  customerSinceDate: string
  lastModifyDate: string
  orderedByName: string
  orderedByPhone: string
  defaultTimezone: string
  cellPhoneNumber: string
  accountNumber: string
  doRequireReferencePo: boolean
  street1: string
  street2: string
  city: string
  state: string
  postalCode: string
  bookingMessage: string
  costCode: string
  defaultVehicleTypeId: number
  defaultPricingId: number
  defaultPricingName: string
  bookingSourceId: number
  bookingCategoryId: number
  tripCategoryId: number
  tripTypeId: number
  collectionType: CollectionTypeEnum
  collectionMethod: CollectionMethodEnum
  collectionTermsDays: number
  collectionTermsDaysLateFees: number
  invoiceSortOrder: string
  alternateContractId: number
  isVip: boolean
  isSpecialHandling: boolean
  isInactive: boolean
  isClosed: boolean
  createDate: string
  lastReservationDate: string
  lastModifyFTUserId: number
  createdByFTUserId: number
  affiliateSystemGuid: string
  isQuickQuoteCustomer: boolean
  isAffiliateCustomer: boolean
  doAllowAffiliatePassengerView: boolean
  isTransientCustomer: boolean
  isTransponetAccountCatchall: boolean
  doAllowTransponetHourlyPricing: boolean
}

export type InvoiceAddress = {
  street1: string
  street2: string
  city: string
  region: string
  postalCode: string
  country: string
  displayAddress: string
  geoLookupAddress: string
  cityRegionPostalCode: string
}

export type BillToSummary = {
  billToName: string
  billToDescription: string
  billToEntityType: string
  customerId: number
  corporateProfileID: number
  doBillCorporate: boolean
}

export type Invoice = {
  invoiceId: number
  invoiceDate: string
  invoicePayStatus: string
  customerId: number
  corporateProfileId: number
  companyId: number
  invoiceMessage: string
  daysInBilling: number
  unusedDeposits: number
  invoiceTotal: number
  adjustedInvoiceTotal: number
  outstandingBalance: number
  paymentTotal: number
  adjustmentTotal: number
  depositDebitTotal: number
  discountTotal: number
  invoiceAddress: InvoiceAddress
  collectionMethod: CollectionMethodEnum
  collectionType: CollectionTypeEnum
  creditCardId: number
  isCorrectedInvoice: boolean
  isCancelledInvoice: boolean
  lastLateFeeDate?: any
  isEmailed: boolean
  invoiceNotes: string
  createTime: string
  modifiedTime: string
  billToSummary: BillToSummary
}

export type EmployeeReservation = {
  createUser: string
  reservationId: number
  vehicleId: number
  employeeId: number
  greeterId: number
  externalBookingId: string
  companyId: number
  reservationGroupId: number
  customerId: number
  corporateProfileId: number
  pricingId: number
  vehicleTypeId: number
  reservationStatus: ReservationStatusEnum
  travelType: TravelTypeEnum
  reservationPhoneNumber: string
  referencePO: string
  costCode: string
  bookingSource: BookingSourceEnum
  bookingCategory: BookingCategoryEnum
  tripCategory: TripCategoryEnum
  tripType: TripTypeEnum
  orderedBy: string
  orderedByPhone: string
  timeZoneName: string
  scheduledPickupTime: string
  estimatedEndTime: string
  isDatabaseTimezone: boolean
  timeZoneUTCOffsetMinutes: number
  timeZoneLocalOffsetMinutes: number
  driverInTime?: any
  driverSpotTime?: any
  enRouteTime?: any
  onLocationTime?: any
  actualPickupTime?: any
  dropoffTime: string
  noShowTime?: any
  cancelTime?: any
  returnTime?: any
  billingStartTime: string
  billingEndTime: string
  actualHours: number
  estimatedHours: number
  beginMileage: number
  endMileage: number
  driverNotes: string
  driverDispatchStatus: string
  dispatchNotes: string
  tripNotes: string
  affiliateNotes: string
  tripPreferences: string
  fromLocation: FromLocation
  toLocation: ToLocation
  passengerCount: number
  luggageCount: number
  primaryPassenger: PrimaryPassenger
  numAdditionalStops: number
  numSupportDocuments: number
  reservationOrigin: ReservationOriginEnum
  totalCharges: number
  affiliatePay: number
  isInBilling: boolean
  isExcludedFromBilling: boolean
  isFinalized: boolean
  isInvoiced: boolean
  isDriverPayProcessed: boolean
  isDriverPayReadyForProcessing: boolean
  isChangedDayOfDispatch: boolean
  isRecurring: boolean
  hasReservationNotes: boolean
  hasIncidents: boolean
  isCharter: boolean
  isCharterLeg: boolean
  charterReservationId: number
  charterMoveId: number
  charterMoveName: string
  charterLegType: string
  collectionMethod: string
  collectionType: CollectionTypeEnum
  creditCardId: number
  isVip: boolean
  isSpecialHandling: boolean
  segmentId: string
  alternateContractId: number
  doInvoiceCustomerDirectly: boolean
  isFarmIn: boolean
  isFarmOut: boolean
  totalDeposits: number
  creditCardAuthorizationAmount: number
  companySummary: CompanySummary
  customerSummary: CustomerSummary
  corporateProfileSummary: CorporateProfileSummary
  vehicleSummary: VehicleSummary
  vehicleTypeSummary: VehicleTypeSummary
  driverSummary: DriverSummary
  customerContactId: number
  corporateProfileContactId: number
  cancelledBy: string
  confirmedBy: string
  createTime: string
  modifiedTime: string
}

export type EmployeeReservationResponse = {
  items: EmployeeReservation[]
  status: string
  message: string
  includesOperationalMessage: boolean
}

export type InvoicesResponse = {
  items: Invoice[]
}

export type CustomersResponse = {
  items: Customer[]
  status: string
  includesOperationalMessage: boolean
}

export type CorporateProfileResponse = {
  items: CorporateProfile[]
  status: string
  includesOperationalMessage: boolean
}

export type CompanyResponse = {
  items: Company[]
  status: string
  includesOperationalMessage: boolean
}

export type AffiliateResponse = {
  items: Affiliate[]
  status: string
  includesOperationalMessage: boolean
}

export type EmployeePayResponse = {
  item: EmployeePay
  status: string
  includesOperationalMessage: boolean
}

export type ReservationResponse = {
  items: Reservation[]
  status: string
  message: string
  includesOperationalMessage: boolean
}
