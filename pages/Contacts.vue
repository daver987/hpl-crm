<script lang="ts" setup>
definePageMeta({
  name: 'Contacts',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <n-layout-content>
    <ContactsTable />
  </n-layout-content>
</template>
