<script setup lang="ts">
import { useEcharts } from '~/composables/useEcharts'
import type { ECOption } from '~/composables/useEcharts'
import { parseISO, format } from 'date-fns'
import { computed, ReservationDateAndTotalSchema } from '#imports'

const { data: reservations, pending } = await useFetch('/api/reservations')
const pickedReservations = computed(() => {
  return ReservationDateAndTotalSchema.array().parse(reservations.value?.items)
})

const weeklyData = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
}

pickedReservations.value.forEach((reservation) => {
  const date = parseISO(reservation.scheduledPickupTime)
  const dayOfWeek = format(date, 'EEEE')
  weeklyData[dayOfWeek] += 1
})

const options: ECOption = ref({
  xAxis: {
    type: 'category',
    data: Object.keys(weeklyData),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: Object.values(weeklyData),
      type: 'bar',
    },
  ],
})

const { domRef } = useEcharts(options)
</script>
<template>
  <div ref="domRef" style="width: 600px; height: 400px"></div>
</template>
