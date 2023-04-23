import { AuthResponseSchema } from '~/composables'
import { ReservationAddWithNewCustomerRequestSchema } from '~/composables/fasttrak-api/schemas'
import { z } from 'zod'

export type AuthResponse = z.infer<typeof AuthResponseSchema>
export type ReservationAddWithNewCustomerRequest = z.infer<
  typeof ReservationAddWithNewCustomerRequestSchema
>
