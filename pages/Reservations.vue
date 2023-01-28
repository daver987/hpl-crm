<script lang="ts" setup>
definePageMeta({
  name: 'Reservations',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page padding><QuoteForm></QuoteForm></q-page>
</template>

<style scoped></style>
