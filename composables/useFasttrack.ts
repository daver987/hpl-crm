import { useRuntimeConfig } from '#imports'

export interface Credentials {
  email: string
  password: string
}

export interface AuthenticationResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

const BASE_URL = 'https://api.ifasttrak.com/partner/api'
const PARTNER_ACCESS_KEY = useRuntimeConfig().FASTTRACK_PARTNER_ACCESS_KEY
const PARTNER_API_VERSION = 'v2.1'
const SYSTEM_ID = useRuntimeConfig().FASTTRACK_SYSTEM_ID
const EMAIL = useRuntimeConfig().FASTTRACK_USER_EMAIL
const PASSWORD = useRuntimeConfig().FASTTRACK_USER_PASSWORD

async function authenticate(
  credentials: Credentials
): Promise<AuthenticationResponse> {
  const response = await fetch(`${BASE_URL}/authentication/web-service-user`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
      'Partner-Access-Key': PARTNER_ACCESS_KEY,
      'Partner-Api-Version': PARTNER_API_VERSION,
      'System-Id': SYSTEM_ID,
    },
  })

  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.statusText}`)
  }

  return response.data
}

export const fastTrackApi = {
  authenticate,
}
