import twilio from 'twilio'
import { serverSupabaseUser } from '#supabase/server'
import { z } from 'zod'

const AccessToken = twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

const config = useRuntimeConfig()
const twilioAccountSid = config.TWILIO_ACCOUNT_SID
const twilioApiKey = config.TWILIO_API_KEY
const twilioApiSecret = config.TWILIO_API_SECRET
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID

const userSchemaPromise = z.promise(
  z.object({ id: z.string(), email: z.string() }).strip()
)

export default defineEventHandler(async (event) => {
  try {
    const identity = await userSchemaPromise.parse(serverSupabaseUser(event))
    console.log('identity: ', identity)
    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: serviceSid,
    })
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {
        identity: identity.email,
      }
    )
    token.addGrant(chatGrant)
    // Serialize the token to a JWT string
    console.log(token.toJwt())
    return token.toJwt()
  } catch (e) {
    return 'error'
  }
})
