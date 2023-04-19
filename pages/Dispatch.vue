<script lang="ts" setup>
definePageMeta({
  name: 'Dispatch',
  layout: 'default',
})

// const customers = await useTrpc().fasttrak.get.query()
// console.log('Fasttrack Customers', customers)
</script>

<template>
  <n-layout-content>
    <pre>{{ customers }}</pre>
  </n-layout-content>
</template>
