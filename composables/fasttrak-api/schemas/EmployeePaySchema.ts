import { z } from 'zod'

export const ReservationBillingSummarySchema = z.object({
  reservationId: z.number(),
  reservationGross: z.number(),
  reservationNetAfterPay: z.number(),
  grossMargin: z.number(),
  reservationEmployeeType: z.string(),
  vehicleTypeName: z.string(),
})

export const EmployeePaySchema = z.object({
  employeePayId: z.number(),
  employeeName: z.string(),
  employeeId: z.number(),
  reference: z.string(),
  billingHoursForPay: z.number(),
  total: z.number(),
  reservationId: z.number(),
  isPaid: z.boolean(),
  isApproved: z.boolean(),
  isCreatedInBilling: z.boolean(),
  scheduledPayDate: z.any().optional(),
  actualPayDate: z.any().optional(),
  createTime: z.string(),
  companyId: z.number(),
  scheduledPickupTime: z.string(),
  paymentNotes: z.string(),
  passengerName: z.string(),
  reservationBillingSummary: ReservationBillingSummarySchema,
  customerName: z.string(),
})

export const EmployeePayResponseSchema = z.object({
  item: EmployeePaySchema,
  status: z.string(),
  includesOperationalMessage: z.boolean(),
})
