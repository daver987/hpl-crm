<script lang="ts" setup>
definePageMeta({
  path: '/accounts/stripe',
})
</script>

<template>
  <n-layout-content>
    <ClientOnly>
      <AccountsTable />
    </ClientOnly>
  </n-layout-content>
</template>
