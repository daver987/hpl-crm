import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import {
  EmployeePayResponse,
  EmployeePaySearchResponseSchema,
} from '~/composables/fasttrak-api/schemas/EmployeeSchema'

export default defineEventHandler(async (event) => {
  let accessToken
  accessToken = await fasttrakAuth()
  const endpoint = 'reservation-pays/17305/employee-pays'
  // const currentYear = new Date().getFullYear()
  //
  // const startDate = new Date()
  // startDate.setFullYear(currentYear)
  // startDate.setMonth(0)
  // startDate.setDate(1)
  //
  // const endDate = new Date()
  // endDate.setFullYear(currentYear)
  // endDate.setMonth(11)
  // endDate.setDate(31)

  // const body = {
  //   EmployeePaySearchRequest: {
  //     employeeId: 93,
  //     startDate: startDate.toISOString(),
  //     endDate: endDate.toISOString(),
  //   },
  // }

  const requestOptions: FasttrakRequestOptions = {
    method: 'GET',
    endpoint: endpoint,
    token: accessToken,
  }

  const fasttrakData: EmployeePayResponse = await fasttrakRequest(
    requestOptions
  )

  return fasttrakData
})
