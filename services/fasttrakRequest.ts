import chalk from 'chalk'

interface Body {}
export interface FasttrakRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  token: string
  pathParams?: { [key: string]: string | number }
  body?: any
  queryParams?: any
}

export async function fasttrakRequest(
  options: FasttrakRequestOptions
): Promise<any> {
  const pathParams = options.pathParams || {}
  const apiUrl = Object.keys(pathParams).reduce(
    (url, param) => url.replace(`{${param}}`, String(pathParams[param])),
    `https://api.ifasttrak.com/partner/api/${options.endpoint}`
  )

  const runtimeConfig = useRuntimeConfig()
  const partnerAccessKey = runtimeConfig.FASTTRACK_PARTNER_ACCESS_KEY
  const systemId = runtimeConfig.FASTTRACK_SYSTEM_ID

  const config = (
    partnerAccessKey: string,
    systemId: string,
    token: string
  ) => ({
    headers: {
      'Partner-Access-Key': partnerAccessKey,
      'Partner-Api-Version': 'v2.1',
      'System-Id': systemId,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  try {
    const data = await $fetch(apiUrl, {
      method: options.method,
      ...config(partnerAccessKey, systemId, options.token),
      body: options.body,
      query: options.queryParams,
    })
    console.log(
      chalk.bgRed(
        `[${options.method}] Request to ${
          options.endpoint
        } at ${new Date().toISOString()}`
      )
    )
    // console.log(`${options.method} data`, data)
    return data
  } catch (error) {
    console.error(
      `Error fetching data from Fasttrak API (${options.endpoint}):`,
      error
    )
    throw error
  }
}
