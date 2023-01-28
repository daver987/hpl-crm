import twilio from 'twilio'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const config = useRuntimeConfig()
  const accountSid = config.TWILIO_ACCOUNT_SID
  const authToken = config.TWILIO_AUTH_TOKEN
  const messagingServiceSid = config.TWILIO_MESSAGING_SERVICE_SID

  const client = twilio(accountSid, authToken)
  const body = await readBody(event)
  const { message, to } = body
  await client.messages.create({
    body: message,
    messagingServiceSid: messagingServiceSid,
    to: to,
  })
  const { data, error } = await supabase.from('messages').insert([
    {
      message: message,
      conversation_id: 'otherValue',
      sender_id: 'otherValue',
    },
  ])
  return message.sid
})
