import twilio from 'twilio'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const body = readBody(event)
  const { data, error } = await supabase.from('messages').insert(body)

  const { MessagingResponse } = twilio.twiml
  const twiml = new MessagingResponse()
  twiml.message('Your appointment has been confirmed.')
  return twiml.toString()
})
