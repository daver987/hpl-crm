<script lang="ts" setup>
definePageMeta({
  path: '/communication',
  name: 'Overview',
})

const { data: messages } = await useFetch('/api/messages', {
  method: 'GET',
})
console.log(messages.value)
</script>

<template>
  <div>Page: foo</div>
  <pre>{{ messages }}</pre>
  <ContactMessageCard />
</template>

<style scoped></style>
