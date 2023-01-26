import twilio from 'twilio'
import { serverSupabaseUser } from '#supabase/server'
import { z } from 'zod'

const config = useRuntimeConfig()
const accountSid = config.TWILIO_ACCOUNT_SID
const authToken = config.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

const userSchemaPromise = z.promise(
  z.object({ id: z.string(), email: z.string() }).strip()
)

export default defineEventHandler(async (event) => {
  try {
    const chatUser = await userSchemaPromise.parse(serverSupabaseUser(event))
    const getConversations = await client.conversations.v1
      .users(chatUser.id)
      .userConversations.list({ limit: 20 })
    console.log('Server Conversations', getConversations)
    return getConversations
  } catch (e) {
    console.error(e)
    return { status: 408, message: 'Ooops something went wrong' }
  }
})
