<script lang="ts" setup>
import { format } from 'date-fns'
definePageMeta({
  name: 'Active',
  layout: 'default',
})

const rideQuery = 'Scheduled'
const getRide = async () => await useTrpc().ride.getRide.query({ rideQuery })

const {
  data: rideData,
  suspense: rideSuspense,
  refetch: updateRide,
} = useQuery({
  queryKey: ['rides'],
  queryFn: getRide,
})
onServerPrefetch(async () => {
  await rideSuspense()
})
console.log('RideData:', rideData.value)
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-col v-for="ride in rideData.hits" :key="ride.id" :span="12">
        <n-card :title="`${ride.rider.firstName} ${ride.rider.lastName}`">
          <n-p
            >Scheduled: {{ format(new Date(ride.scheduledTime), 'PP, p') }}</n-p
          >
          <n-p>Pickup: {{ ride.pickup.address }}</n-p>
          <n-p>Drop-Off: {{ ride.destination.address }}</n-p>
          <n-p>Status: {{ ride.status }}</n-p>
        </n-card>
      </n-col>
    </n-row>
  </n-layout-content>
</template>
