import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { ReservationResponse } from '~/composables'

export default defineEventHandler(async () => {
  let accessToken
  accessToken = await fasttrakAuth()
  console.log('Access token', accessToken, new Date().toISOString())
  const endpoint = 'employee-pays/search'
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

  const fasttrakData: ReservationResponse = await fasttrakRequest(
    requestOptions
  )
  const filterOutStatus = ['Cancelled', 'Dropped', 'Quotation']
  return fasttrakData.items.filter(
    (item) => !filterOutStatus.includes(item.reservationStatus)
  )
})
