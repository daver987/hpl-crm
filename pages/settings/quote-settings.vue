<script lang="ts" setup>
definePageMeta({
  name: 'Quote Settings',
  layout: 'default',
  path: '/settings/quotes',
})
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-card title="Quote Form Settings">
        <SettingsTable />
      </n-card>
    </n-row>
  </n-layout-content>
</template>
