import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { EmployeeReservationResponse } from '~/composables/fasttrak-api/types'

export default defineEventHandler(async (event) => {
  let accessToken
  accessToken = await fasttrakAuth()
  const endpoint = 'employees'

  const requestOptions: FasttrakRequestOptions = {
    method: 'GET',
    endpoint: endpoint,
    token: accessToken,
  }

  const fasttrakData: EmployeeReservationResponse = await fasttrakRequest(
    requestOptions
  )

  return fasttrakData
})
