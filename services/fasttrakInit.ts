import type { AuthResponse } from '~/composables/fasttrak-api'
import chalk from 'chalk'

type StoredToken = {
  token: string
  expiration: number
}

// This is a type guard function that verifies if an object is of type StoredToken
function isStoredToken(obj: any): obj is StoredToken {
  return (
    obj && typeof obj.token === 'string' && typeof obj.expiration === 'number'
  )
}

export const fasttrakAuth = async (): Promise<string> => {
  const runtimeConfig = useRuntimeConfig()
  const config = (partnerAccessKey: string, systemId: string) => ({
    headers: {
      'Partner-Access-Key': partnerAccessKey,
      'Partner-Api-Version': 'v2.2',
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

  let storedData = await useStorage().getItem('fasttrak:token')
  let tokenData: StoredToken | null = null

  if (isStoredToken(storedData)) {
    tokenData = storedData
  }

  if (!tokenData || new Date().getTime() > tokenData.expiration) {
    const authResponse = await authenticateFasttrak(
      runtimeConfig.FASTTRACK_SYSTEM_ID,
      runtimeConfig.FASTTRACK_USER_EMAIL,
      runtimeConfig.FASTTRACK_USER_PASSWORD,
      ''
    )
    const authToken = authResponse.item.token.accessToken
    console.log(chalk.cyanBright('[SET_NEW_TOKEN]', authToken))
    const expiration = new Date().getTime() + 30 * 60 * 1000 // 30 minutes from now
    tokenData = {
      token: authToken,
      expiration,
    }
    await useStorage().setItem('fasttrak:token', tokenData)
  } else {
    console.log(chalk.green('[OLD_TOKEN]', tokenData.token))
  }

  return tokenData.token
}

///new version
//
// interface AuthRequestBody {
//   systemId: string
//   username: string
//   password: string
//   refreshToken: string
// }
//
// const runtimeConfig = useRuntimeConfig()
//
// const config = (
//   partnerAccessKey: string,
//   systemId: string
// ): {
//   headers: {
//     'Partner-Access-Key': string
//     'Partner-Api-Version': string
//     'System-Id': string
//     'Content-Type': string
//   }
// } => ({
//   headers: {
//     'Partner-Access-Key': partnerAccessKey,
//     'Partner-Api-Version': 'v2.2',
//     'System-Id': systemId,
//     'Content-Type': 'application/json',
//   },
// })
//
// export async function fasttrakAuth(
//   systemId: string,
//   username: string,
//   password: string,
//   refreshToken: string
// ) {
//   const requestBody: AuthRequestBody = {
//     systemId,
//     username,
//     password,
//     refreshToken,
//   }
//
//   return await $fetch(
//     'https://api.ifasttrak.com/partner/api/authentication/web-service-user',
//     {
//       method: 'POST',
//       body: requestBody,
//       ...config(runtimeConfig.FASTTRACK_PARTNER_ACCESS_KEY, systemId),
//     }
//   )
// }
