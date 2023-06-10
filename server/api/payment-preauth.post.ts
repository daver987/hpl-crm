import { stripe } from '~/services/stripeInit'
export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const body = await readBody(event)
  const amountInCents = body.quote_total * 100
  const email = body.email_address

  const isClient = await prisma.user.findUnique({
    where: {
      email_address: body.email_address,
    },
    select: {
      stripe_customer_id: true,
    },
  })

  let stripeCustomerId: string
  let paymentIntent: any

  // if (typeof isClient?.stripe_customer_id === 'string') {
  //   stripeCustomerId = isClient.stripe_customer_id
  //   paymentIntent = await stripe.paymentIntents.create({
  //     amount: 1000,
  //     currency: 'cad',
  //     payment_method_types: ['card'],
  //     // capture_method: 'manual',
  //     automatic_payment_methods: { enabled: true },
  //     customer: 'cus_NsWCAuZfXN6Tcx',
  //   })
  // }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'cad',
    payment_method_types: ['card'],
    capture_method: 'manual',
    customer: 'cus_NtcHZmm0lNOSq1',
  })

  console.log('Payment Intent', paymentIntent)
  return paymentIntent
})
