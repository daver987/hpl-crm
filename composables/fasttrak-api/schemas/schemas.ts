import { z } from 'zod'

export const AuthResponseSchema = z.object({
  item: z.object({
    token: z.object({
      id: z.string(),
      accessToken: z.string(),
      refreshToken: z.string(),
      accessTokenExpirationSeconds: z.number(),
      refreshTokenExpiratinSeconds: z.number(),
    }),
    isExpired: z.boolean(),
    isLocked: z.boolean(),
    lockedUntilDateUTC: z.date().nullable(),
    isMultiCompanyEnabled: z.boolean(),
  }),
  status: z.string(),
  includesOperationalMessage: z.boolean(),
})

// Define other Zod schemas as needed
