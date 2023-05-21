interface LineItem {
  tax: number
  label: string
  total: number
}

interface Location {
  name: string
  formatted_address: string
  is_origin: boolean
  is_destination: boolean
}

interface Trip {
  duration_text: string
  pickup_date: string
  pickup_time: string
  locations: Location[]
  price: {
    line_items_list: LineItem[]
  }
}

interface UserData {
  first_name: string
}

interface QuoteData {
  quote_number: number
  quote_total: number
  user: UserData
  service: {
    label: string
  }
  vehicle: {
    label: string
  }
  trips: Trip[]
}

export function preparePromptData(data: QuoteData) {
  let preparedData = {
    quote_number: data.quote_number,
    quote_total: data.quote_total,
    first_name: data.user.first_name,
    service_label: data.service.label,
    vehicle_label: data.vehicle.label,
    pickup_date: data.trips[0].pickup_date,
    pickup_time: data.trips[0].pickup_time,
    duration_text: data.trips[0].duration_text,
    line_items_list: data.trips[0].price.line_items_list,
    pickup_location: '',
    destination: '',
  }

  data.trips[0].locations.forEach((location) => {
    if (location.is_origin) {
      preparedData.pickup_location = `${location.name}, ${location.formatted_address}`
    } else if (location.is_destination) {
      preparedData.destination = `${location.name}, ${location.formatted_address}`
    }
  })

  return preparedData
}

interface PromptData {
  quote_number: number
  quote_total: number
  first_name: string
  service_label: string
  vehicle_label: string
  pickup_date: string
  pickup_time: string
  duration_text: string
  line_items_list: LineItem[]
  pickup_location: string
  destination: string
}

export function constructPrompt(data: PromptData) {
  const {
    quote_number,
    quote_total,
    first_name,
    service_label,
    vehicle_label,
    pickup_date,
    pickup_time,
    pickup_location,
    destination,
    duration_text,
    line_items_list,
  } = data

  let line_items_str = line_items_list
    .map((item) => `${item.label}: $${item.total.toFixed(2)}`)
    .join(', ')

  let prompt = `Hello ChatGPT-4! Let's help a customer named ${first_name}. They recently received a quote, quote number HPL-${quote_number}, for a ${service_label} service using a ${vehicle_label} on ${pickup_date} at ${pickup_time}. The trip from ${pickup_location} to ${destination} is expected to take ${duration_text}. The quote includes the following cost breakdown: ${line_items_str}, making the total cost $${quote_total.toFixed(
    2
  )}. 

  Can you help us write an engaging and friendly follow-up email? Let's make sure they feel valued and appreciated. Also, let's encourage them to ask any questions they might have about the service or the quote. Thanks!`

  return prompt
}
