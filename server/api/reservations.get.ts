import { fasttrakAuth } from '~/services/fasttrakInit'
import {
  fasttrakRequest,
  FasttrakRequestOptions,
} from '~/services/fasttrakRequest'
import { ReservationResponse } from '~/composables'
import chalk from 'chalk'

export default defineEventHandler(async () => {
  const reservations = await useStorage().getItem('fasttrak:reservations')
  let accessToken
  if (!reservations) {
    accessToken = await fasttrakAuth()
    console.log(
      'Access token',
      accessToken,
      'Calling authenticateFasttrak from [get]',
      new Date().toISOString()
    )
    const endpoint = 'reservations/search-advanced'
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
    await useStorage().setItem('fasttrak:reservations', fasttrakData)
    console.log(chalk.blue('[RESERVATIONS_NEW]'))
    return fasttrakData
  } else {
    console.log(chalk.green('[RESERVATIONS_OLD]'))
    return reservations as ReservationResponse
  }
})
