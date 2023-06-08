import { ref, Ref } from 'vue'

interface StoredToken {
  token: string
  refreshToken: string
  expiration: number
}

interface RequestObject {
  request: Request
  options: Record<string, unknown>
}

export function useFasttrakApi(url: string, options: any) {
  const storedToken: Ref<StoredToken | null> = ref(null)

  const response = $fetch(url, {
    ...options,
    async onRequest({ request, options }: RequestObject) {
      if (storedToken.value && storedToken.value.expiration > Date.now()) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${storedToken.value.token}`
      }
    },
    async onResponse({
      request,
      response,
    }: {
      request: Request
      response: Response
    }) {
      if (response.ok && response.body) {
        const body = await response.json()
        if (body?.token) {
          storedToken.value = {
            token: body.token,
            refreshToken: body.refreshToken,
            expiration: Date.now() + 30 * 60 * 1000, // 30 minutes in milliseconds
          }
        }
      }
    },
    async onResponseError({
      request,
      response,
      options,
    }: {
      request: Request
      response: Response
      options: Record<string, unknown>
    }) {
      if (response.status === 401 && storedToken.value?.refreshToken) {
        // Re-authenticate and then retry the request
        // You'll need to implement the reauthenticateAndRetry function
        // which should use the refresh token to get a new access token
        await reauthenticateAndRetry(
          request,
          options,
          storedToken.value.refreshToken
        )
      }
    },
  })

  return { data, pending, error, refresh }
}
