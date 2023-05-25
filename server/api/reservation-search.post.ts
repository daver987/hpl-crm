import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { ReservationResponse } from '~/composables'

export default defineEventHandler(async (event) => {
  const body = readBody(event)
  let accessToken
  accessToken = await fasttrakAuth()
  const endpoint = 'reservations/search-advanced'


  const requestOptions: FasttrakRequestOptions = {
    method: 'POST',
    endpoint: endpoint,
    token: accessToken,
    body: {
      employeeId: 93,
    },
  }

  const fasttrakData: ReservationResponse = await fasttrakRequest(
    requestOptions
  )

  return fasttrakData
})
