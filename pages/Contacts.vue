<script lang="ts" setup>
definePageMeta({
  name: 'Contacts',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page>
    <contacts-table />
  </q-page>
</template>

<style scoped></style>
