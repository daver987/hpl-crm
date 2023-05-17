import { AuthResponseSchema } from '~/composables/fasttrak-api'
import type { AuthResponse } from '~/composables/fasttrak-api'
import chalk from 'chalk'

export const fasttrakAuth = async (): Promise<string> => {
  const runtimeConfig = useRuntimeConfig()
  const config = (partnerAccessKey: string, systemId: string) => ({
    headers: {
      'Partner-Access-Key': partnerAccessKey,
      'Partner-Api-Version': 'v2.1',
      'System-Id': systemId,
      'Content-Type': 'application/json',
    },
  })
  let requestCount = 0

  async function authenticateFasttrak(
    systemId: string,
    username: string,
    password: string,
    refreshToken: string
  ): Promise<AuthResponse> {
    const requestBody = {
      systemId,
      username,
      password,
      refreshToken,
    }

    try {
      requestCount += 1
      console.log(`Request #${requestCount} at ${new Date().toISOString()}`)

      //@ts-ignore
      const data = (await $fetch(
        'https://api.ifasttrak.com/partner/api/authentication/web-service-user',
        {
          method: 'POST',
          body: requestBody,
          ...config(runtimeConfig.FASTTRACK_PARTNER_ACCESS_KEY, systemId),
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
  let authResponse
  let authToken
  const token = await useStorage().getItem('fasttrak:token')
  if (!token) {
    authResponse = await authenticateFasttrak(
      runtimeConfig.FASTTRACK_SYSTEM_ID,
      runtimeConfig.FASTTRACK_USER_EMAIL,
      runtimeConfig.FASTTRACK_USER_PASSWORD,
      ''
    )
    authToken = authResponse.item.token.accessToken
    console.log(chalk.cyanBright('[SET_NEW_TOKEN]', authToken))
    await useStorage().setItem('fasttrak:token', authToken)
  } else {
    console.log(chalk.green('[OLD_TOKEN]', token))
    authToken = token
  }
  return authToken as string
}
