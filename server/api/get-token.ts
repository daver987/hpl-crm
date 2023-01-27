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

    const chatGrant = new ChatGrant({
      serviceSid: serviceSid,
    })

    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {
        identity: identity.email,
      }
    )
    token.addGrant(chatGrant)

    console.log(token.toJwt())
    return token.toJwt()
  } catch (e) {
    return 'error'
  }
})
