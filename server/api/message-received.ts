import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'
import twilio from 'twilio'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const query = await getQuery(event)
    const { MessagingResponse } = twilio.twiml
    const twiml = new MessagingResponse()
    twiml.message('Successfully Received')
    const { SmsMessageSid, SmsStatus, Body, From } = query
    const { data, error } = await supabase.from('messages').insert([
      {
        message_meta: query,
        message: Body,
        sender_id: From,
        message_id: SmsMessageSid,
        status: SmsStatus,
      },
    ])
    return twiml.toString()
  } catch (e) {
    return e
  }
})
