<script lang="ts" setup>
definePageMeta({
  name: 'Quotes',
  layout: 'default',
})
</script>

<template>
  <n-layout-content>
    <ClientOnly>
      <QuoteTableTwo />
    </ClientOnly>
  </n-layout-content>
</template>
