<script setup lang="ts">
definePageMeta({
  name: 'Messaging',
  layout: 'default',
})

const options = [
  { label: 'Natasha Smith', value: '16472839229' },
  { label: 'Jeremy Brown', value: '15142991410' },
  { label: 'High Park Livery', value: '14167057627' },
  { label: 'David Robertson', value: '12894009408' },
  { label: 'Nicole Hooper', value: '16474732057' },
]
</script>

<template>
  <n-layout-content>
    <Messenger />
  </n-layout-content>
</template>

<style scoped></style>
