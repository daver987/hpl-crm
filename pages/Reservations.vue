<script lang="ts" setup>
definePageMeta({
  name: 'Reservations',
  layout: 'default',
  middleware: 'auth',
})
const { data } = await useFetch('/api/get-messages')
console.log(data.value)
</script>

<template>
  <q-page padding>
    <q-card>
      <template v-for="message in data">
        <q-card-section v-if="message.from === '+12894009408'">
          <div>{{ message.body }}</div>
          <div>{{ message.to }}</div>
          <div>{{ message.from }}</div>
        </q-card-section>
      </template>
    </q-card>
  </q-page>
</template>

<style scoped></style>
