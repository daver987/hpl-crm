<script setup lang="ts">
definePageMeta({
  name: 'Reservations',
  layout: 'default',
})
</script>

<template>
  <n-layout-content style="padding: 16px">
    <n-grid :cols="1" :y-gap="12">
      <n-grid-item>
        <n-card>
          <ReservationsOverview />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Reservations By Day">
          <ChartsBarReservations />
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-layout-content>
</template>
