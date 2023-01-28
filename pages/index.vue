<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: 'auth',
})

const { data: quotes } = await useFetch('/api/get-quotes')

const filteredObjects = quotes?.value?.filter((obj) => {
  const utcDate = new Date(obj.createdAt)
  const estDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
  )
  const currentDay = estDate.toISOString().slice(0, 10)
  const currentHour = new Date().getUTCHours() - 4
  return (
    currentDay === estDate.toISOString().slice(0, 10) &&
    currentHour === estDate.getUTCHours()
  )
})
const dailyQuotes = filteredObjects?.length
const orderCount = filteredObjects?.filter(
  (obj) => obj.isBooked === true
).length
const quoteCount = quotes?.value?.length
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-card class="col bg-blue">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Today's Quotes</div>
            <div class="text-h6">{{ dailyQuotes }}</div>
          </q-card-section>
          <q-card-section class="flex row justify-end">
            <q-icon name="request_quote" size="4rem" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="col bg-orange">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Today's Orders</div>
            <div class="text-h6">{{ orderCount }}</div>
          </q-card-section>
          <q-card-section class="flex row justify-end">
            <q-icon name="request_quote" size="4rem" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="col bg-purple">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Active Quotes</div>
            <div class="text-h6">{{ quoteCount }}</div>
          </q-card-section>
          <q-card-section class="flex row justify-end">
            <q-icon name="request_quote" size="4rem" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
