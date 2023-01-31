import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = serverSupabaseClient<Database>(event)
  const webhookUrl = useRuntimeConfig().ZAPIER_WEBHOOK_BOOK_ORDER
  try {
    const getVehicleType = async () => {
      try {
        const { data: vehicleType } = await supabase
          .from('vehicle_type')
          .select('*')
          .eq('value', body.row.vehicleTypeValue)
        console.log('This is the Vehicle Type', vehicleType)
        return vehicleType
      } catch (e) {
        console.log('Getting LA Vehicle Type Failed', e)
        return 'Failed'
      }
    }

    const getServiceType = async () => {
      try {
        const { data: serviceType } = await supabase
          .from('service_type')
          .select('*')
          .eq('value', body.row.serviceTypeValue)
        console.log('This is the Service Type', serviceType)
        return serviceType
      } catch (e) {
        console.log('Getting LA Service type failed', e)
        return 'Failed'
      }
    }

    try {
      const serviceType = await getServiceType()
      const vehicleType = await getVehicleType()
      if (serviceType !== 'Failed' && vehicleType !== 'Failed') {
        body.row.la_vehicle_type_id = vehicleType?.filter(
          (type) => type.id === body.row.vehicleTypeValue
        )[0].limo_anywhere_id
        body.row.la_service_type_id = serviceType?.filter(
          (type) => type.id === body.row.serviceTypeValue
        )[0].limo_anywhere_id
        const { data, error } = await supabase
          .from('quotes')
          .update({ isBooked: true })
          .eq('id', body.row.id)
          .select()
        console.log('This is the data', data, 'This is the error', error)
        const response = (await $fetch(webhookUrl, {
          method: 'POST',
          body: body.row,
        })) as any
        console.log('Zapier webhook response', response)
        return response
      }
    } catch (e) {
      return 'Something Went Wrong'
    }
    return 'Order Booked'
  } catch (e) {
    return e
  }
})
