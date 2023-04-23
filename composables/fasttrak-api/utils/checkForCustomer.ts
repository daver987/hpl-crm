import { ref } from '#imports'

export async function checkForCustomer(email: string) {
  const customerId = ref<number | null | undefined>(null)
  const { data: customerData } =
    await useTrpc().fasttrakCustomers.search.useQuery({
      emailAddress: email,
    })
  if (customerData.value?.items.length === 0) {
    return null
  } else {
    customerId.value = customerData.value?.items[0].customerId
    return customerId.value
  }
}

export function getTravelType(tripType: string) {
  switch (tripType) {
    case 'To Airport':
      return 'Departure'
    case 'From Airport':
      return 'Arrival'
    case 'Hourly As Directed':
    case 'Point to Point':
      return 'Ground'
    default:
      return 'None'
  }
}

export function getTripCategory(tripType: string) {
  switch (tripType) {
    case 'To Airport':
      return 'Departure'
    case 'From Airport':
      return 'Arrivals'
    default:
      return 'Transfer'
  }
}
