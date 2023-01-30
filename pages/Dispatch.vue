<script lang="ts" setup>
definePageMeta({
  name: 'Dispatch',
  layout: 'default',
  middleware: 'auth',
})

const columns = [
  {
    name: 'quote',
    label: 'Quote #',
    field: 'quote',
  },
]
</script>

<template>
  <q-page>
    <QuoteCard
      quote-number="000-000"
      pickup-date="10-10-2023"
      price="$99.99"
      name="Steve Johnson"
      email="you@me.com"
      phone="555-555-5555"
      :status="true"
    />
  </q-page>
</template>

<style scoped></style>
