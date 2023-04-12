import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import type { CustomerArray } from '~/composables/fasttrak-api'

async function fetchFasttrakData(
  endpoint: string,
  token: string,
  queryParams: any
): Promise<CustomerArray> {
  const apiUrl = `https://api.ifasttrak.com/partner/api/${endpoint}`

  const headers = {
    'Partner-Access-Key': '8fce58eb8cb843bf9d8c0ad2377d2f1e',
    'Partner-Api-Version': 'v2.1',
    'System-Id': '28AE0C07-CD77-4D72-A0F5-DE99D44DB3C1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await $fetch<CustomerArray>(apiUrl, {
      method: 'GET',
      headers,
      query: queryParams,
    })
    console.log('Original customers', data)
    return data
  } catch (error) {
    console.error(`Error fetching data from Fasttrak API (${endpoint}):`, error)
    throw error
  }
}

const AuthResponseSchema = z.object({
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

type AuthResponse = z.infer<typeof AuthResponseSchema>

const config = {
  headers: {
    'Partner-Access-Key': '8fce58eb8cb843bf9d8c0ad2377d2f1e',
    'Partner-Api-Version': 'v2.1',
    'System-Id': '28AE0C07-CD77-4D72-A0F5-DE99D44DB3C1',
    'Content-Type': 'application/json',
  },
}

async function authenticateFasttrak(): Promise<AuthResponse> {
  const requestBody = {
    systemId: '28AE0C07-CD77-4D72-A0F5-DE99D44DB3C1',
    username: 'info@drobertson.pro',
    password: 'i3taxfrcioIn!',
    refreshToken: '',
  }

  try {
    //@ts-ignore
    const data = (await $fetch(
      'https://api.ifasttrak.com/partner/api/authentication/web-service-user',
      {
        method: 'POST',
        body: requestBody,
        ...config,
      }
    )) as AuthResponse

    console.log('Fasttrak JWT', data)
    if (data.status === 'FAILURE') {
      throw new Error(`Authentication failed`)
    }

    return {
      ...data,
    }
  } catch (error) {
    console.error('Error authenticating with Fasttrak API:', error)
    throw error
  }
}

export const fasttrakRouter = router({
  getJwt: publicProcedure.output(AuthResponseSchema).query(async () => {
    return await authenticateFasttrak()
  }),
  get: publicProcedure.query(async () => {
    const authResponse = await authenticateFasttrak()
    const endpoint = 'customers'
    const queryParams = {
      includeInactive: false,
      maxResults: 100,
    }
    const customers = await fetchFasttrakData(
      endpoint,
      authResponse.item.token.accessToken,
      queryParams
    )
    console.log('Customers', customers)
    return customers
  }),
})
