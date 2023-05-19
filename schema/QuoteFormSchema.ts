import { z } from 'zod'
// import {
//   LineItemSchema,
//   SalesTaxSchema,
//   ServiceSchema,
//   VehicleSchema,
//   QuoteSchema,
//   TripSchema,
//   LocationSchema,
//   UserSchema,
// } from './prismaSchemas'

// const QuoteSchemaPicked = QuoteSchema.pick({
//   quote_number: true,
//   selected_hours: true,
//   selected_passengers: true,
//   is_round_trip: true,
//   quote_total: true,
//   quote_subtotal: true,
//   quote_tax_total: true,
// })

// const TripSchemaPicked = TripSchema.pick({
//   id: true,
//   formatted_pickup_date: true,
//   formatted_pickup_time: true,
//   distance_text: true,
//   duration_text: true,
//   trip_order: true,
//   line_items_list: true,
// })

// const LocationSchemaPicked = LocationSchema.pick({
//   lat: true,
//   lng: true,
//   full_name: true,
//   route_order: true,
// })

// const TripSchemaPickedExtended = TripSchemaPicked.extend({
//   locations: LocationSchemaPicked.array(),
// })

// const UserSchemaPicked = UserSchema.pick({
//   id: true,
//   first_name: true,
//   last_name: true,
//   full_name: true,
//   phone_number: true,
//   email_address: true,
// })

// const VehicleSchemaPicked = VehicleSchema.pick({
//   label: true,
//   vehicle_image: true,
//   max_luggage: true,
// })
// const ServiceSchemaPicked = ServiceSchema.pick({
//   label: true,
// })

// const combinedLineItemsSchema = z.object({
//   label: z.string(),
//   total: z.number(),
//   tax: z.number(),
// })

// export const quoteFormReturnSchema = QuoteSchemaPicked.extend({
//   user: UserSchemaPicked,
//   vehicle: VehicleSchemaPicked,
//   service: ServiceSchemaPicked,
//   combined_line_items: combinedLineItemsSchema.array(),
//   trips: TripSchemaPickedExtended.array(),
// }).strip()

// export type QuoteFormReturn = z.infer<typeof quoteFormReturnSchema>

// export const QuoteFormSchema = z.object({
//   id: z.string(),
//   first_name: z.string(),
//   last_name: z.string(),
//   email_address: z
//     .string()
//     .email({ message: 'Please enter a valid email' })
//     .toLowerCase(),
//   phone_number: z.string(),
//   conversion: z.object({
//     utm_medium: z.string().optional(),
//     utm_source: z.string().optional(),
//     utm_campaign: z.string().optional(),
//     utm_term: z.string().optional(),
//     gclid: z.string().optional(),
//   }),
//   origin: z.object({
//     formatted_address: z.string(),
//     name: z.string(),
//     place_id: z.string(),
//     types: z.array(z.string()),
//   }),
//   destination: z.object({
//     formatted_address: z.string(),
//     name: z.string(),
//     place_id: z.string(),
//     types: z.array(z.string()),
//   }),
//   pickup_date: z.number().nullable(),
//   pickup_time: z.number().nullable(),
//   return_date: z.number().nullable(),
//   return_time: z.number().nullable(),
//   selected_hours: z.number().nullable(),
//   selected_passengers: z.number().nullable(),
//   is_hourly: z.boolean(),
//   vehicle_id: z.number().nullable(),
//   service_id: z.number().nullable(),
//   return_service_id: z.number().nullable(),
//   is_round_trip: z.boolean(),
//   vehicle: VehicleSchema.array(),
//   service: ServiceSchema.array(),
//   line_items: LineItemSchema.array(),
//   sales_tax: SalesTaxSchema.array(),
// })

// export type QuoteForm = z.infer<typeof QuoteFormSchema>

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
