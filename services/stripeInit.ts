import { Stripe } from 'https://esm.sh/stripe@12.11.0?target=deno&no-check'

const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
