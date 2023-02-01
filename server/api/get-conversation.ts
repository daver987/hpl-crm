import twilio from 'twilio'
import { serverSupabaseUser } from '#supabase/server'

const AccessToken = twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

const config = useRuntimeConfig()
const twilioAccountSid = config.TWILIO_ACCOUNT_SID
const serviceSid = config.TWILIO_CHAT_SERVICE_SID
const twilioApiKey = config.TWILIO_API_KEY
const twilioApiSecret = config.TWILIO_API_SECRET

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
})

// Create an access token which we will sign and return to the client,
// containing the grant we just created
function getAccessToken(user: any) {
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: user }
  )
  token.addGrant(chatGrant)
  const jwt = token.toJwt()
  console.log(`Token for ${user}: ${jwt}`)
  return jwt
}

export default defineEventHandler(async (event) => {
  const user = serverSupabaseUser(event)
  try {
    const jwt = getAccessToken(user)
    console.log('jwt for user:', jwt)
    return { token: jwt }
  } catch (e) {
    console.error(e)
    return { status: 408, message: 'Ooops something went wrong' }
  }
})
