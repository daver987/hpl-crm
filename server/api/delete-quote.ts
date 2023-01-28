import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const body = await readBody(event)
    const { data } = await supabase
      .from('quotes')
      .delete()
      .eq('id', body.id)
      .select()
    return data
  } catch (e) {
    return
  }
})
