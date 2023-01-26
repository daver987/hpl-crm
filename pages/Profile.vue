<script lang="ts" setup>
definePageMeta({
  name: 'Profile',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page padding>Page: foo</q-page>
</template>

<style scoped></style>
