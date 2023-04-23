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
