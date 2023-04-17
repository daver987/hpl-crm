import { fasttrakAuth } from '../services/fasttrakInit'
import type { AuthResponse } from '../services/fasttrakInit'
import { getToken, setToken, getLastUpdated } from '../services/tokenManager'

declare module 'h3' {
  interface H3EventContext {
    auth: AuthResponse
  }
}

export default eventHandler(async (event) => {
  let auth = getToken()
  const now = new Date()
  const tokenExpiration = 1800 * 1000 // Token expiration time in milliseconds

  if (
    !auth ||
    !getLastUpdated() ||
    now.getTime() - getLastUpdated().getTime() > tokenExpiration
  ) {
    console.log(
      'Calling authenticateFasttrak from [middleware]',
      new Date().toISOString()
    )
    auth = await fasttrakAuth()
    setToken(auth)
  }

  event.context.accessToken = auth.item.token.accessToken
})
