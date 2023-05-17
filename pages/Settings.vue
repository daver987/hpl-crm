<script lang="ts" setup>
definePageMeta({
  name: 'Settings',
  layout: 'default',
})
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-card title="Quote Settings"></n-card>
      <QuoteSettings />
    </n-row>
  </n-layout-content>
</template>
