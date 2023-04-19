<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
})

const getCount = async () => useTrpc().quote.getCount.query()
const getBooked = async () => useTrpc().quote.getBooked.query()
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

const { data: bookedData, suspense: bookedSuspense } = useQuery({
  queryKey: ['booked'],
  queryFn: getBooked,
})
onServerPrefetch(async () => {
  await bookedSuspense()
})
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
