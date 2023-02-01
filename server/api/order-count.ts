import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { count, data } = await supabase
      .from('quotes')
      .select('*', { count: 'exact' })
      .match({ isBooked: true })
    return { count, data }
  } catch (e) {
    console.log(e)
    return 'Something Went Wrong'
  }
})
