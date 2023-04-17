<script lang="ts" setup>
import { format } from 'date-fns'
definePageMeta({
  name: 'Evertransit',
  layout: 'default',
})

const rideQuery = 'Scheduled'
async function getRides() {
  return await useTrpc().ride.getRide.query({ rideQuery })
}

const {
  data: rideData,
  isLoading,
  suspense: rideSuspense,
} = useQuery({
  queryKey: ['rides', rideQuery],
  queryFn: getRides,
})
onServerPrefetch(async () => {
  await rideSuspense()
})
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row v-if="isLoading">
      <n-h2>Loading.....</n-h2>
    </n-row>
    <n-row v-else>
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
