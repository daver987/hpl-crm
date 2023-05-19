<script setup lang="ts">
import { computed, ReservationDateAndTotalSchema } from '#imports'
import { QuoteReturnedPickedSchema } from '~/schema/QuoteFormSchema'

definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: ['auth'],
})
const {
  data: quotes,
  isLoading: isLoadingQuotes,
  refetch: updateQuotes,
  suspense: quoteSuspense,
} = useQuery({
  queryKey: ['quotes'],
  queryFn: async () => await useTrpc().quote.getMany.query(),
})
onServerPrefetch(async () => {
  await quoteSuspense()
})
const quoteData = computed(() => {
  return QuoteReturnedPickedSchema.array().parse(quotes.value)
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
    <n-grid :cols="1" :y-gap="12">
      <n-grid-item>
        <n-spin :show="isLoadingQuotes">
          <n-card title="Quotes Overview">
            <QuotesOverview :quotes="quoteData" v-if="!isLoadingQuotes" />
          </n-card>
        </n-spin>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Reservations Overview">
          <n-spin :show="isLoadingReservations">
            <ReservationsOverview
              v-if="!isLoadingReservations"
              :reservations="pickedReservations"
            />
          </n-spin>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-layout-content>
</template>
