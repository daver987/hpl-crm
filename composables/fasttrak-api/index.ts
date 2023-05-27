import { AuthResponse } from '~/composables'

export * from './schemas'
export * from './utils'
export * from './types'

export class FasttrakApi {
  private accessToken: string | null
  private refreshToken: string | null
  private username: string
  private password: string
  private partnerAccessKey: string
  private partnerApiVersion: string
  private systemId: string

  constructor(
    username: string,
    password: string,
    partnerAccessKey: string,
    partnerApiVersion: string,
    systemId: string
  ) {
    this.accessToken = null
    this.refreshToken = null
    this.username = username
    this.password = password
    this.partnerAccessKey = partnerAccessKey
    this.partnerApiVersion = partnerApiVersion
    this.systemId = systemId
  }

  private async authenticate(): Promise<AuthResponse> {
    const requestBody = {
      systemId: this.systemId,
      username: this.username,
      password: this.password,
      refreshToken: '',
    }

    const config = {
      headers: {
        'Partner-Access-Key': this.partnerAccessKey,
        'Partner-Api-Version': this.partnerApiVersion,
        'System-Id': this.systemId,
        'Content-Type': 'application/json',
      },
    }
    try {
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

  public async getJwt(): Promise<AuthResponse> {
    const authResponse = await this.authenticate()
    this.accessToken = authResponse.item.token.accessToken
    this.refreshToken = authResponse.item.token.refreshToken
    return authResponse
  }

  // Implement other API methods here, e.g.
  public async getCustomer(id: string) {
    // Use this.accessToken to make authenticated requests to the API
  }

  // public async createCustomer(data: CustomerData) {
  //   // Use this.accessToken to make authenticated requests to the API
  // }
}
