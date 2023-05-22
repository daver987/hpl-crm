<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: ['auth'],
})
const { data: quotes, pending } = await useFetch('/api/quotes')
</script>

<template>
  <n-layout-content style="padding: 16px">
    <n-grid :cols="1" :y-gap="12">
      <n-grid-item>
        <n-card title="Quotes Overview">
          <QuotesOverview :pending="pending" :quotes="quotes" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Reservations Overview">
          <ReservationsOverview />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Quotes By Day">
          <ChartsBarQuotes :quotes="quotes" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-layout-content>
</template>
