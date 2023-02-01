<script lang="ts" setup>
definePageMeta({
  name: 'Profile',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page padding><Chat /></q-page>
</template>

<style scoped></style>
