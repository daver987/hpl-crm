import { stripe } from './../../services/stripeInit'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const listCustomers = await stripe.customers.list({
    limit: 100,
    expand: ['data.sources', 'data.invoice_settings'],
  })

  const deleteCustomer = await stripe.customers.del(input.stripe_customer_id)

  return 'Hello stripe-customer'
})
