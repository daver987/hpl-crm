import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { data } = await supabase
      .from('quotes')
      .select('*,user(*)')
      .order('quote_number', { ascending: false })
    return data
  } catch (e) {
    console.log(e)
  }
})
