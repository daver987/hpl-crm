import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const query = await getQuery(event)
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
    return { success: 201 }
  } catch (e) {
    return e
  }
})
