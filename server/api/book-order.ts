import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

const webhookUrl = useRuntimeConfig().ZAPIER_WEBHOOK_BOOK_ORDER

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  const { data: vehicleType } = await supabase
    .from('vehicle_type')
    .select('*')
    .eq('value', body.vehicleTypeValue)

  body.la_vehicle_type_id = vehicleType?.filter(
    (type) => type.id === body.vehicleTypeValue
  )[0].limo_anywhere_id

  const { data: serviceType } = await supabase
    .from('service_type')
    .select('*')
    .eq('value', body.serviceTypeValue)
  await console.log('This is the Service Type', serviceType)

  body.la_service_type_id = serviceType?.filter(
    (type) => type.id === body.serviceTypeValue
  )[0].limo_anywhere_id

  const { data, error } = await supabase
    .from('quotes')
    .update({ isBooked: true })
    .eq('id', body.id)
    .select()
  await console.log('This is the data', data, 'This is the error', error)

  await console.log('This is the body', body)

  const response = await $fetch(webhookUrl, {
    method: 'POST',
    body: body,
  })
  await console.log('Zapier webhook response', response)
  return response
})
