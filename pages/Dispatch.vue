<script lang="ts" setup>
definePageMeta({
  name: 'Dispatch',
  layout: 'default',
  middleware: 'auth',
})

const columns = [
  {
    name: 'quote',
    label: 'Quote #',
    field: 'quote',
  },
]
</script>

<template>
  <n-layout-content>
    <QuoteForm />
  </n-layout-content>
</template>
