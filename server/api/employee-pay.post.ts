import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import type { EmployeePayResponse } from '~/composables'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { employeeId } = body
  let accessToken
  accessToken = await fasttrakAuth()
  const endpoint = `employee-pays/search`

  const requestOptions: FasttrakRequestOptions = {
    method: 'POST',
    endpoint: endpoint,
    token: accessToken,
    body: {
      employeeId: employeeId,
      payDisplayType: 'AllEmployees',
      companyId: 0,
      reservationID: 0,
      payStatus: 'All',
      dateSearchType: 'Create_Date',
    },
    useJsonPatchContentType: true,
  }

  const fasttrakData: EmployeePayResponse = await fasttrakRequest(
    requestOptions
  )

  return fasttrakData as EmployeePayResponse
})
