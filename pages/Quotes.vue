<script lang="ts" setup>
definePageMeta({
  name: 'Quotes',
  layout: 'default',
  middleware: 'auth',
})
const emits = defineEmits(['click:open'])
const openAlert = (event: any) => {
  alert(event)
}
</script>

<template>
  <q-page>
    <quotes-table @click:open="openAlert" />
  </q-page>
</template>

<style scoped></style>
