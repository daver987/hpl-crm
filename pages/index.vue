<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: ['auth'],
})
</script>

<template>
  <n-layout-content style="padding: 16px">
    <n-grid :cols="1" :y-gap="12">
      <n-grid-item>
        <n-card title="Quotes Overview">
          <QuotesOverview />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Reservations Overview">
          <ReservationsOverview />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Quotes By Day">
          <ChartsBarQuotes />
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-layout-content>
</template>
