<script lang="ts" setup>
definePageMeta({
  name: 'Contacts',
  layout: 'default',
})
</script>

<template>
  <n-layout-content>
    <ClientOnly>
      <ContactsTable />
    </ClientOnly>
  </n-layout-content>
</template>
