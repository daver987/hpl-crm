<script setup lang="ts">
import { isEqual, isPast, format } from 'date-fns'

definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: 'auth',
})

const { data: quotes } = await useFetch('/api/get-quotes')

const quoteCount = quotes?.value?.length
const orderCount = quotes?.value?.filter(
  (item) =>
    item.isBooked === true &&
    isEqual(
      new Date(format(new Date(item.updatedAt), 'yyyy-MM-dd')),
      new Date(format(new Date(), 'yyyy-MM-dd'))
    )
).length
const todaysQuotes = quotes?.value?.filter((item) =>
  isEqual(
    new Date(format(new Date(item.updatedAt), 'yyyy-MM-dd')),
    new Date(format(new Date(), 'yyyy-MM-dd'))
  )
).length
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-card class="col bg-blue">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Today's Quotes</div>
            <div class="text-h6">{{ todaysQuotes }}</div>
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
