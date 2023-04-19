<script lang="ts" setup>
definePageMeta({
  name: 'Dispatch',
  layout: 'default',
  middleware: 'auth',
})





const { data: customers } = await useTrpc().fasttrak.get.useQuery()
console.log("Fasttrack Customers", customers)
</script>

<template>
  <n-layout-content>
    <pre>{{ customers }}</pre>
  </n-layout-content>
</template>
