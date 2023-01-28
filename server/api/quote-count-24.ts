import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const startOfToday = new Date().toISOString().slice(0, 10) + ' 00:00:00'
  console.log('today:', startOfToday)
  const endOfToday = new Date().toISOString().slice(0, 10) + ' 23:59:59'
  console.log('end of day', endOfToday)
  try {
    const supabase = serverSupabaseClient<Database>(event)
    const { count, error } = await supabase
      .from('quotes')
      .select('createdAt', { count: 'exact', head: true })
      .rangeGte('during', `[${startOfToday}, ${endOfToday})`)
    console.log(count)
    return count
  } catch (e) {
    console.log(e)
    return 'Something Went Wrong'
  }
})
