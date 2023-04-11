<script lang="ts" setup>
definePageMeta({
  name: 'Settings',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-card title="Quote Settings"></n-card>
    </n-row>
  </n-layout-content>
</template>
