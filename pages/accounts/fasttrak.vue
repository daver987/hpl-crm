<script lang="ts" setup>
definePageMeta({
  path: '/accounts/fasttrak',
})
</script>

<template>
  <ClientOnly>
    <CorporateAccountsTable />
  </ClientOnly>
</template>
