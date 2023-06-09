<script setup lang="ts">
import { darkTheme } from 'naive-ui'
useHead({
  title: 'High Park Livery CRM',
  meta: [
    {
      name: 'naive-ui-style',
    },
  ],
})
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <n-dialog-provider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
