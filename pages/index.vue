<script setup lang="ts">
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'

const quoteStore = useQuoteStore()
const { quoteCount, loading, quotes, quoteCountToday, orderCount } =
  storeToRefs(quoteStore)
quoteStore.getQuoteCount()

definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-md q-mb-sm">
      <q-card class="col bg-blue">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Today's Quotes</div>
            <div class="text-h6">{{ quoteCountToday }}</div>
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
    <div class="row q-gutter-md">
      <q-card class="col bg-blue">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Today's Quotes</div>
            <div class="text-h6">{{ quoteCountToday }}</div>
          </q-card-section>
          <q-card-section class="flex row justify-end">
            <q-icon name="request_quote" size="4rem" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="col bg-orange">
        <q-card-section horizontal class="row justify-between">
          <q-card-section>
            <div class="text-h6">Total Orders Value</div>
            <div class="text-h6">${{ orderCount }}</div>
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
