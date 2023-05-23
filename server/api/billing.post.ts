import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { AgingReport } from '~/composables/fasttrak-api/schemas/AgingReportSchema'

export default defineEventHandler(async (event) => {
  let accessToken
  accessToken = await fasttrakAuth()
  console.log('Access token', accessToken, new Date().toISOString())
  const endpoint = 'Invoices/aging-report'
  const currentYear = new Date().getFullYear()

  const startDate = new Date()
  startDate.setFullYear(currentYear)
  startDate.setMonth(0)
  startDate.setDate(1)

  const endDate = new Date()
  endDate.setFullYear(currentYear)
  endDate.setMonth(11)
  endDate.setDate(31)

  const body = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }

  const requestOptions: FasttrakRequestOptions = {
    method: 'POST',
    endpoint: endpoint,
    token: accessToken,
    body: body,
  }

  const fasttrakData: AgingReport = await fasttrakRequest(requestOptions)

  return fasttrakData
})
