<script setup lang="ts">
definePageMeta({
  name: 'Accounts',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page>
    <accounts-table />
  </q-page>
</template>
