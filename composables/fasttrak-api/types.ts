import { AuthResponseSchema } from './schemas/schemas'
import { z } from 'zod'

export type AuthResponse = z.infer<typeof AuthResponseSchema>
