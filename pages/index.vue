<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: 'auth',
})

const getCount = async () => useTrpc().quote.getCount.query()
const getBooked = async () => useTrpc().quote.getBooked.query()
// const { data } = await useFetch('/api/customers')
// console.log('Customer Data:', data.value)
const {
  data: countData,
  suspense,
  isLoading,
  refetch: updateCount,
} = useQuery({
  queryKey: ['quoteCount'],
  queryFn: getCount,
})
onServerPrefetch(async () => {
  await suspense()
})
// const rideQuery = 'Toronto'
// const getRide = async () => await useTrpc().ride.getRide.query({ rideQuery })

const {
  data: bookedData,
  suspense: bookedSuspense,
  refetch: updateBooked,
} = useQuery({
  queryKey: ['booked'],
  queryFn: getBooked,
})
onServerPrefetch(async () => {
  await bookedSuspense()
})
// const {
//   data: rideData,
//   suspense: rideSuspense,
//   refetch: updateRide,
// } = useQuery({
//   queryKey: ['rides'],
//   queryFn: getRide,
// })
// onServerPrefetch(async () => {
//   await rideSuspense()
// })
// console.log('RideData:', rideData.value)
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-col :span="4">
        <n-statistic label="Today's Quotes" :value="99" />
      </n-col>
      <n-col :span="4">
        <n-statistic label="Orders Booked" :value="bookedData" />
      </n-col>
      <n-col :span="4">
        <n-statistic label="Active Quotes" :value="countData" />
      </n-col>
    </n-row>
    <!--    <n-row>-->
    <!--      <n-col v-for="ride in rideData.hits" :key="ride.id" :span="12">-->
    <!--        <n-card :title="`${ride.rider.firstName} ${ride.rider.lastName}`">-->
    <!--          <n-p-->
    <!--            >Scheduled: {{ format(new Date(ride.scheduledTime), 'PP, p') }}</n-p-->
    <!--          >-->
    <!--          <n-p>Pickup: {{ ride.pickup.address }}</n-p>-->
    <!--          <n-p>Drop-Off: {{ ride.destination.address }}</n-p>-->
    <!--          <n-p>Status: {{ ride.status }}</n-p>-->
    <!--        </n-card>-->
    <!--      </n-col>-->
    <!--    </n-row>-->
  </n-layout-content>
</template>
