<script setup lang="ts">
import {
  isBefore,
  isAfter,
  parseISO,
  endOfDay,
  startOfDay,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
  getUnixTime,
} from 'date-fns'
import type { ReservationResponse } from '~/composables'
import { ReservationDateAndTotalSchema } from '~/composables'

const reservations: Ref<null | ReservationResponse> = ref(null)
const startOfMonthTimestamp = getUnixTime(startOfMonth(new Date()))
const endOfMonthTimestamp = getUnixTime(endOfMonth(new Date()))
const range: Ref<[number, number]> = ref([
  startOfMonthTimestamp * 1000,
  endOfMonthTimestamp * 1000,
])

const startTimestamp: ComputedRef<Date | null> = computed(() => {
  return range.value ? startOfDay(new Date(range.value[0])) : null
})

const endTimestamp: ComputedRef<Date | null> = computed(() => {
  return range.value ? endOfDay(new Date(range.value[1])) : null
})

const startDate = computed(() => {
  return startTimestamp.value ? new Date(startTimestamp.value) : null
})

const endDate = computed(() => {
  return endTimestamp.value ? new Date(endTimestamp.value) : null
})

const { data: reservationResponse, pending: loading } =
  await useTrpc().fasttrak.getReservations.useQuery()

reservations.value = reservationResponse.value as ReservationResponse

const pickedReservations = ReservationDateAndTotalSchema.array().parse(
  reservations.value?.items
)

const filteredReservations = computed(() => {
  if (!startDate.value || !endDate.value) {
    return []
  }
  return pickedReservations.filter((reservation) => {
    let reservationDate = parseISO(reservation.scheduledPickupTime)
    return (
      (isAfter(reservationDate, startDate.value!) ||
        isSameDay(reservationDate, startDate.value!)) &&
      (isBefore(reservationDate, endDate.value!) ||
        isSameDay(reservationDate, endDate.value!))
    )
  })
})

const totalCharges = computed(() => {
  return (
    filteredReservations.value.reduce(
      (total: number, obj) => total + obj.totalCharges,
      0
    ) || 0
  ).toFixed(2)
})

const totalChargesFormatted = computed(() => {
  const num = parseFloat(totalCharges.value)
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
})

const itemCount = computed(() => {
  return filteredReservations.value.length || 0
})

const todayItemCount = computed(() => {
  return (
    filteredReservations.value.filter((reservation) => {
      let reservationDate = parseISO(reservation.scheduledPickupTime)
      return isToday(reservationDate)
    }).length || 0
  )
})

const averageCharge = computed(() => {
  if (itemCount.value > 0) {
    return (parseFloat(totalCharges.value) / itemCount.value).toLocaleString(
      'en-CA',
      { style: 'currency', currency: 'CAD' }
    )
  } else {
    return (0).toFixed(2)
  }
})
</script>

<template>
  <n-grid :cols="1">
    <n-grid-item style="padding: 16px; padding-top: 0">
      <n-space justify-between>
        <n-date-picker
          v-model:value="range"
          type="daterange"
          clearable
          :default-value="range"
          format="PP"
        />
      </n-space>
    </n-grid-item>
  </n-grid>
  <n-grid :cols="4" :x-gap="12">
    <n-gi>
      <n-card>
        <n-statistic label="Today's Reservations" :value="todayItemCount" />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Total Reservations For Range" :value="itemCount" />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic
          label="Total Value For Range"
          :value="totalChargesFormatted"
        />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Average Amount For Range" :value="averageCharge" />
      </n-card>
    </n-gi>
  </n-grid>
</template>
