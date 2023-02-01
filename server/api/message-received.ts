import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const body = readBody(event)
  const { data, error } = await supabase
    .from('messages')
    .insert({ message_json: body })
  return { success: 201 }
})
