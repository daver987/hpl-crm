import { fasttrakAuth } from './../fasttrakInit'

export default defineEventHandler(async (event) => {
  // Retrieve authToken cookie
  let authTokenFast = getCookie(event, 'authTokenFast') || null
  console.log(
    `fasttrakAuth[SERVER_MIDDLEWARE]Request at ${new Date().toISOString()}`
  )
  // If authToken is not found in the cookies, get it from your server-side function
  if (!authTokenFast) {
    const authResponse = await fasttrakAuth()
    const accessToken = authResponse.item.token.accessToken
    authTokenFast = accessToken
    console.log('[MIDDLEWARE] TOKEN_EXPIRED OR NOT FOUND REFETCHING TOKEN')
    // Store authToken in the cookie with the desired options (e.g., expiration time, secure flag, etc.)
    setCookie(event, 'authTokenFast', authTokenFast, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: true, // Set secure flag for HTTPS
      httpOnly: true, // Make cookie not accessible from client-side JavaScript
    })
  }
})
