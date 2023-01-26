<script lang="ts" setup>
definePageMeta({
  name: 'Quotes',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page>
    <quotes-table />
  </q-page>
</template>

<style scoped></style>
