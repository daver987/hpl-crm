import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { ReservationResponse } from '~/composables'

export default defineEventHandler(async (event) => {
  let accessToken
  accessToken = await fasttrakAuth()
  const endpoint = 'employees'
  const query = {
    includeInactive: false,
  }

  const requestOptions: FasttrakRequestOptions = {
    method: 'GET',
    endpoint: endpoint,
    token: accessToken,
    query,
  }

  const fasttrakData: ReservationResponse = await fasttrakRequest(
    requestOptions
  )

  return fasttrakData
})
