import { getCookie, setCookie } from 'h3'
import { fasttrakAuth } from '../services/fasttrakInit'
import type { AuthResponse } from '../services/fasttrakInit'

export default eventHandler(async (event) => {
  let accessToken = getCookie(event, 'accessToken')

  if (!accessToken) {
    console.log(
      'Calling authenticateFasttrak from [middleware]',
      new Date().toISOString()
    )
    const authResponse: AuthResponse = await fasttrakAuth()
    accessToken = authResponse.item.token.accessToken
    setCookie(event, 'accessToken', accessToken)
  }

  event.context.accessToken = accessToken
})
