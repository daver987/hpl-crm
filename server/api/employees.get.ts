import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { EmployeeResponse } from '~/composables/fasttrak-api/schemas/EmployeeSchema'

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

  const fasttrakData: EmployeeResponse = await fasttrakRequest(requestOptions)

  return fasttrakData
})
