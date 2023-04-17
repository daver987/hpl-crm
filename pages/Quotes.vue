<script lang="ts" setup>
definePageMeta({
  name: 'Quotes',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <n-layout-content>
    <QuoteTableTwo />
  </n-layout-content>
</template>
