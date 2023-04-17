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

  async update(rideId, rideData) {
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

  async get(rideId) {
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

class Customers {}

export default new EverTransit()
