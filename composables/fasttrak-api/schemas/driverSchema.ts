import { z } from 'zod'

export const DriverResponseSchema = z.object({
  items: z.array(
    z.object({
      userId: z.number(),
      employeeId: z.number(),
      employeeType: z.string(),
      displayName: z.string(),
      phoneCell: z.string(),
      emailAddress: z.string(),
      isInactive: z.boolean(),
      companyId: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string(),
      title: z.string(),
      phoneHome: z.string(),
      phoneOther: z.string(),
      messageAddress: z.string(),
      metroAreaServed: z.string(),
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
      hasExpiredLicense: z.boolean(),
      hasExpiredLicenseNotification: z.boolean(),
      hasCommercialLicense: z.boolean(),
      isScheduleDisabled: z.boolean(),
      dateOfBirth: z.string(),
      hireDate: z.string(),
      terminationDate: z.string(),
      hasEmployeePhoto: z.boolean(),
      employeePhotoUrl: z.string(),
      modifiedDate: z.string(),
      status: z.string(),
      payType: z.string(),
      payFixedAmount: z.number(),
      payTimeCalculationType: z.string(),
      vehicleTypeHourlyPayList: z.array(
        z.object({
          employeeVehicleTypeHourlyPayId: z.number(),
          employeeId: z.number(),
          vehicleTypeId: z.number(),
          hourlyPayAmount: z.number(),
          vehicleTypeSummary: z.object({
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
          }),
        })
      ),
      payHourlyRate: z.number(),
      vehicleTypePercentPayList: z.array(
        z.object({
          employeeVehicleTypePercentPayId: z.number(),
          employeeId: z.number(),
          vehicleTypeId: z.number(),
          percentPayAmount: z.number(),
          doApplyBaseCharges: z.boolean(),
          doApplyAdditionalCharge1Charges: z.boolean(),
          doApplyAdditionalCharge2Charges: z.boolean(),
          vehicleTypeSummary: z.object({
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
          }),
        })
      ),
      doPayPercentageAfterDiscounts: z.boolean(),
      payPercentageOfBaseAmount: z.number(),
      payPercentageOfJobTotal: z.number(),
      paySalaryIntervalType: z.string(),
      paySalaryAmount: z.number(),
      paySalaryNextPayDate: z.string(),
      paySalaryTwiceMonthlyDay1: z.number(),
      paySalaryTwiceMonthlyDay2: z.number(),
      payMinimumHours: z.number(),
    })
  ),
  status: z.string(),
  message: z.string(),
  includesOperationalMessage: z.boolean(),
})

export const DriverSchema = z.object({
  userId: z.number(),
  employeeId: z.number(),
  employeeType: z.string(),
  displayName: z.string(),
  phoneCell: z.string(),
  emailAddress: z.string(),
  isInactive: z.boolean(),
  companyId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  title: z.string(),
  phoneHome: z.string(),
  phoneOther: z.string(),
  messageAddress: z.string(),
  metroAreaServed: z.string(),
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
  hasExpiredLicense: z.boolean(),
  hasExpiredLicenseNotification: z.boolean(),
  hasCommercialLicense: z.boolean(),
  isScheduleDisabled: z.boolean(),
  dateOfBirth: z.string(),
  hireDate: z.string(),
  terminationDate: z.string(),
  hasEmployeePhoto: z.boolean(),
  employeePhotoUrl: z.string(),
  modifiedDate: z.string(),
  status: z.string(),
  payType: z.string(),
  payFixedAmount: z.number(),
  payTimeCalculationType: z.string(),
  vehicleTypeHourlyPayList: z.array(
    z.object({
      employeeVehicleTypeHourlyPayId: z.number(),
      employeeId: z.number(),
      vehicleTypeId: z.number(),
      hourlyPayAmount: z.number(),
      vehicleTypeSummary: z.object({
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
      }),
    })
  ),
  payHourlyRate: z.number(),
  vehicleTypePercentPayList: z.array(
    z.object({
      employeeVehicleTypePercentPayId: z.number(),
      employeeId: z.number(),
      vehicleTypeId: z.number(),
      percentPayAmount: z.number(),
      doApplyBaseCharges: z.boolean(),
      doApplyAdditionalCharge1Charges: z.boolean(),
      doApplyAdditionalCharge2Charges: z.boolean(),
      vehicleTypeSummary: z.object({
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
      }),
    })
  ),
  doPayPercentageAfterDiscounts: z.boolean(),
  payPercentageOfBaseAmount: z.number(),
  payPercentageOfJobTotal: z.number(),
  paySalaryIntervalType: z.string(),
  paySalaryAmount: z.number(),
  paySalaryNextPayDate: z.string(),
  paySalaryTwiceMonthlyDay1: z.number(),
  paySalaryTwiceMonthlyDay2: z.number(),
  payMinimumHours: z.number(),
})

export type Driver = z.infer<typeof DriverSchema>
export type DriverResponse = z.infer<typeof DriverResponseSchema>
