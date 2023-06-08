import { z } from 'zod'

const CustomerSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
})

type CustomerData = z.infer<typeof CustomerSchema>

const CustomerResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  createdTime: z.string(),
})

const CustomerListQuerySchema = z.object({
  email: z.string().email().optional(),
  limit: z.number().default(20).optional(),
  page: z.number().default(1).optional(),
})

type CustomerListQuery = z.infer<typeof CustomerListQuerySchema>

const CustomerListResponseSchema = z.object({
  hits: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      phoneNumber: z.string(),
      createdTime: z.string(),
    })
  ),
  totalHits: z.number(),
})

const RideSchema = z.object({
  pickup: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  destination: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  passengers: z.number(),
  externalId: z.string(),
  scheduledTime: z.date(),
  service: z.object({ id: z.string() }).optional(),
  rider: z.object({ id: z.string() }).optional(),
  driver: z.object({ id: z.string() }).optional(),
  paymentMethod: z.string().optional(),
})

const RideResponseSchema = z.object({
  id: z.string(),
  scheduledTime: z.date(),
  createdTime: z.date(),
  pickup: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  destination: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  }),
  service: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  }),
  rider: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
  }),
  driver: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
  }),
  passengers: z.number(),
  reservationNumber: z.string(),
  status: z.string(),
  vehicle: z.object({
    make: z.string(),
    model: z.string(),
    licensePlate: z.string(),
    color: z.string(),
    year: z.number(),
  }),
  externalId: z.string(),
  paymentMethod: z.string(),
})

const baseURL = 'https://endpoints.evertransit.com/v2beta'
const apiKey = useRuntimeConfig().EVER_TRANSIT_API_KEY

interface Ride {
  pickup: Destination
  destination: Destination
  passengers: number
  externalID: string
  scheduledTime: Date
  service?: ID
  rider?: ID
  driver?: ID
  paymentMethod: string
}

interface Destination {
  latitude: number
  longitude: number
  address: string
}

interface ID {
  id: string
}

type SearchQuery = {
  query: string
  limit: number
  page: number
}

class EverTransit {
  customers = new Customers()
  drivers = new Drivers()
  rides = new Rides()
  webhooks = new Webhooks()
  search = new Search()
}
const defaults = {
  headers: {
    'Content-Type': 'application/json',
  },
}
class Rides {
  async search() {
    const options = {
      method: 'GET',
      query: {
        query: 'Toronto',
        limit: 10,
        page: 1,
        apikey: useRuntimeConfig().EVER_TRANSIT_API_KEY,
      },
    }
    try {
      return await $fetch('search/rides', { baseURL, options })
    } catch (err) {
      console.error('Error searching rides:', err)
      return null
    }
  }

  async create(rideData: Ride) {
    const options = {
      method: 'POST',
      ...defaults,
      body: rideData,
    }
    try {
      return await $fetch('/ride', { baseURL, options })
    } catch (err) {
      console.error('Error creating customer:', err)
      return null
    }
  }

  async update(rideId: string, rideData: any) {
    const options = {
      method: 'PATCH',
      ...defaults,
      body: rideData,
    }

    try {
      return await $fetch('/ride', { baseURL, options })
    } catch (error) {
      console.error('Error updating ride:', error)
      return null
    }
  }

  async get(rideId: string) {
    const options = {
      method: 'GET',
      ...defaults,
      query: rideId,
    }

    try {
      return await $fetch('/ride', { baseURL, options })
    } catch (error) {
      console.error('Error fetching ride data:', error)
      return null
    }
  }
}

class Drivers {
  // Add driver-related methods here
}

class Webhooks {
  // Add webhook-related methods here
}

class Search {
  // Add search-related methods here
}

class Customers {
  async search(query: CustomerListQuery) {
    const options = {
      method: 'GET',
      query: query,
    }
    try {
      return await $fetch('customers', { baseURL, options })
    } catch (err) {
      console.error('Error fetching customer list:', err)
      return null
    }
  }

  async create(customerData: CustomerData) {
    const options = {
      method: 'POST',
      ...defaults,
      body: customerData,
    }
    try {
      return await $fetch('/customers', { baseURL, options })
    } catch (err) {
      console.error('Error creating customer:', err)
      return null
    }
  }
}

export default new EverTransit()
