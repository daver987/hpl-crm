<script lang="ts" setup>
definePageMeta({
  name: 'Profile',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page padding><QuoteCard /></q-page>
</template>

<style scoped></style>
