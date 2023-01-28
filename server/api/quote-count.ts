import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { count, error } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
    return count
  } catch (e) {
    console.log(e)
    return 'Something Went Wrong'
  }
})
