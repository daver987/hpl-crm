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

const { data: messages } = await useTrpc().user.getContactMessages.useQuery()
</script>

<template>
  <n-layout-content>
    <ContactMessageList
      style="width: 100%; height: 100%"
      :messages="messages"
    />
  </n-layout-content>
</template>

<style scoped></style>
