<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
})

const { data: countData } = await useTrpc().quote.getCount.useQuery()
const { data: bookedData } = await useTrpc().quote.getBooked.useQuery()

// const parsedAddress1 = parseAddress(
//   '4881 Fountain St N #1, Breslau, ON N0B 1M0, Canada'
// )
// console.log('parsedAddress1', parsedAddress1)

// const parsedAddress2 = parseAddress('Toronto, ON, Canada')
// console.log('parsedAddress2', parsedAddress2)

// const parsedAddress3 = parseAddress('Mississauga, ON L5S 1Y4, Canada')
// console.log('parsedAddress3', parsedAddress3)

// const {
//   data: countData,
//   suspense,
//   isLoading,
//   refetch: updateCount,
// } = useQuery({
//   queryKey: ['quoteCount'],
//   queryFn: getCount,
// })
// onServerPrefetch(async () => {
//   await suspense()
// })
// const { data: bookedData, suspense: bookedSuspense } = useQuery({
//   queryKey: ['booked'],
//   queryFn: getBooked,
// })
// onServerPrefetch(async () => {
//   await bookedSuspense()
// })
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-col :span="4">
        <n-statistic label="Today's Quotes" :value="99" />
        <!--        <p>{{ parsedAddress1 }}</p>-->
      </n-col>
      <n-col :span="4">
        <n-statistic label="Orders Booked" :value="bookedData as number" />
        <!--        <p>{{ parsedAddress2 }}</p>-->
      </n-col>
      <n-col :span="4">
        <n-statistic label="Active Quotes" :value="countData as number" />
        <!--        <p>{{ parsedAddress3 }}</p>-->
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
