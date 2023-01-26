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
    const newUser = await client.conversations.v1.users.create({
      identity: chatUser.id,
      friendlyName: chatUser.email,
    })
    console.log('New User: ', newUser)
    return newUser
  } catch (e) {
    const chatUser = await userSchemaPromise.parse(serverSupabaseUser(event))
    const existingUser = await client.conversations.v1
      .users(chatUser.id)
      .fetch()
    console.log('User Exists: ', existingUser)
    return existingUser
  }
})
