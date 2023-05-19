<script setup lang="ts">
import { computed, ReservationDateAndTotalSchema } from '#imports'

definePageMeta({
  name: 'Reservations',
  layout: 'default',
})
const {
  data: reservations,
  isLoading: isLoadingReservations,
  refetch: updateReservations,
  suspense: reservationSuspense,
} = useQuery({
  queryKey: ['reservations'],
  queryFn: async () => await useTrpc().fasttrak.getReservations.query(),
})
onServerPrefetch(async () => {
  await reservationSuspense()
})
const pickedReservations = computed(() => {
  return ReservationDateAndTotalSchema.array().parse(reservations.value?.items)
})
</script>

<template>
  <n-layout-content style="padding: 16px">
    <n-card>
      <n-spin :show="isLoadingReservations">
        <ReservationsOverview
          v-if="!isLoadingReservations"
          :reservations="pickedReservations"
        />
      </n-spin>
    </n-card>
  </n-layout-content>
</template>
