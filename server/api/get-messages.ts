import twilio from 'twilio'
// import { serverSupabaseUser } from '#supabase/server'

const config = useRuntimeConfig()
const accountSid = config.TWILIO_ACCOUNT_SID
const authToken = config.TWILIO_AUTH_TOKEN
// const messageSid = config.TWILIO_MESSAGING_SERVICE_SID
const client = twilio(accountSid, authToken)

export default defineEventHandler(async (event) => {
  try {
    const messages = await client.messages.list({ limit: 20 })
    console.log(messages)
    return messages
  } catch (e) {
    console.error(e)
    return e
  }
})
