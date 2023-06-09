import { z } from 'zod'

export const QuoteRowSchema = z.object({
  quote_number: z.number(),
  quote_total: z.number(),
  is_booked: z.boolean(),
  created_at: z.coerce.date(),
  selected_passengers: z.number(),
  user: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string(),
    email_address: z.string(),
    full_name: z.string(),
    is_customer: z.boolean(),
    conversion: z
      .object({
        created_at: z.coerce.date(),
        utm_term: z.string(),
        utm_medium: z.string(),
        utm_source: z.string(),
        utm_campaign: z.string(),
        gclid: z.string(),
        source: z.string(),
      })
      .optional(),
  }),
  vehicle: z.object({
    id: z.string(),
    label: z.string(),
    fasttrak_id: z.number().nullable(),
  }),
  service: z.object({
    label: z.string(),
  }),
  trips: z.array(
    z.object({
      notes: z.string().optional(),
      carry_on_luggage: z.number(),
      large_luggage: z.number(),
      pickup_date: z.string(),
      pickup_time: z.string(),
      distance_text: z.string(),
      duration_text: z.string(),
      price: z.object({
        line_items_list: z.array(
          z.object({
            total: z.number(),
            tax: z.number(),
            label: z.string(),
          })
        ),
      }),
      locations: z.array(
        z.object({
          full_name: z.string(),
          formatted_address: z.string(),
          lat: z.number(),
          lng: z.number(),
        })
      ),
      flights: z
        .object({
          flight_number: z.string(),
        })
        .nullable(),
    })
  ),
})

export type QuoteRow = z.infer<typeof QuoteRowSchema>
