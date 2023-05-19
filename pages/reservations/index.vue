<script setup lang="ts">
definePageMeta({
  name: 'Reservations',
  layout: 'default',
})
</script>

<template>
  <n-layout-content style="padding: 16px">
    <n-card>
      <ReservationsOverview />
    </n-card>
  </n-layout-content>
</template>
