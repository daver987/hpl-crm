import { fasttrakAuth } from '~/services/fasttrakInit'

let authToken: string

declare module 'h3' {
  interface H3EventContext {
    authToken: string
  }
}

export default eventHandler(async (event) => {
  if (!authToken) {
    authToken = await fasttrakAuth()
  }
  event.context.authToken = authToken
})
