import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import type { AgingReport } from '~/composables'

export default defineEventHandler(async (event) => {
  const body = readBody(event)
  let accessToken
  accessToken = await fasttrakAuth()
  const endpoint = 'communication/view-document/employee-pay-report'
  const currentYear = new Date().getFullYear()

  const startDate = new Date()
  startDate.setFullYear(currentYear)
  startDate.setMonth(0)
  startDate.setDate(1)

  const endDate = new Date()
  endDate.setFullYear(currentYear)
  endDate.setMonth(11)
  endDate.setDate(31)

  const requestOptions: FasttrakRequestOptions = {
    method: 'POST',
    endpoint: endpoint,
    token: accessToken,
    body: body,
  }

  const fasttrakData: AgingReport = await fasttrakRequest(requestOptions)

  return fasttrakData
})
