import { z } from 'zod'

export const ReturnedQuoteSchema = z.object({
  quote_number: z.number(),
  quote_total: z.number(),
  is_booked: z.boolean(),
  created_at: z.date(),
  selected_passengers: z.number(),
  user: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string(),
    email_address: z.string(),
    full_name: z.string(),
  }),
  vehicle: z.object({
    id: z.string(),
    vehicle_number: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    max_passengers: z.number(),
    max_luggage: z.number(),
    per_km: z.number(),
    per_hour: z.number(),
    min_hours: z.number(),
    min_distance: z.number(),
    min_rate: z.number(),
    is_active: z.boolean(),
    label: z.string(),
    limo_anywhere_id: z.number(),
    fasttrak_id: z.number(),
    vehicle_image: z.string(),
  }),
  service: z.object({ label: z.string() }),
  trips: z.array(
    z.object({
      id: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      pickup_date: z.string(),
      pickup_time: z.string(),
      distance_text: z.string(),
      duration_text: z.string(),
      duration_value: z.number(),
      distance_value: z.number(),
      calculated_distance: z.null(),
      quote_number: z.number(),
      service_label: z.string(),
      vehicle_label: z.string(),
      affiliate_payout: z.null(),
      is_farmed_out: z.boolean(),
      is_return: z.boolean(),
      notes: z.string(),
      trip_order: z.number(),
      price_id: z.null(),
      carry_on_luggage: z.null(),
      large_luggage: z.null(),
      meta_data: z.null(),
      price: z.object({
        line_items_list: z.array(
          z.object({ tax: z.number(), label: z.string(), total: z.number() })
        ),
      }),
      locations: z.array(
        z.object({
          id: z.string(),
          created_at: z.string(),
          updated_at: z.string(),
          lat: z.number(),
          lng: z.number(),
          name: z.string(),
          formatted_address: z.string(),
          full_name: z.string(),
          place_id: z.string(),
          types: z.array(z.string()),
          is_origin: z.boolean(),
          is_destination: z.boolean(),
          is_waypoint: z.boolean(),
          trip_id: z.string(),
          route_order: z.number(),
        })
      ),
    })
  ),
})

export const QuoteReturnedPickedSchema = ReturnedQuoteSchema.pick({
  quote_number: true,
  quote_total: true,
  created_at: true,
  is_booked: true,
  user: true,
})

export type ReturnedQuote = z.infer<typeof ReturnedQuoteSchema>
export type QuotePicked = z.infer<typeof QuoteReturnedPickedSchema>
