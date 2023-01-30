<script lang="ts" setup>
import { concatDateTime } from '~/utils/formatDateTime'

const props = defineProps({
  quoteNumber: {
    type: String,
    required: true,
    default: '000-000',
  },
  pickupDate: {
    type: String,
    required: true,
    default: '01/01/2021',
  },
  price: {
    type: String,
    required: true,
    default: '$0.00',
  },
  name: {
    type: String,
    required: true,
    default: 'John Doe',
  },
  email: {
    type: String,
    required: true,
    default: 'you@me.com',
  },
  phone: {
    type: String,
    required: true,
    default: '555-555-5555',
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
})
const { capitalize } = qformat

console.log(qdate)
const loading = ref(false)
const refreshQuoteData = ref()
const rowData = ref()
const getQuotes = async () => {
  loading.value = true
  try {
    const { data, refresh } = await useFetch('/api/get-quotes')
    console.log(rowData.value)
    rowData.value = data.value
    refreshQuoteData.value = refresh
    console.log(rowData.value)
    loading.value = false
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
await getQuotes()
const tab = ref('new')
</script>

<template>
  <div style="max-width: 425px; padding-top: 8px">
    <q-layout view="hHh lpR fFf" container style="height: 725px">
      <q-header class="bg-dark" bordered>
        <q-toolbar>
          <q-toolbar-title>QUOTES</q-toolbar-title>
          <q-space />
          <q-btn label="Create" outline @click="() => {}" />
        </q-toolbar>
        <q-tabs
          v-model="tab"
          dense
          active-bg-color="dark-page"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="new" label="New" />
          <q-tab name="archived" label="Archived" />
          <q-tab name="all" label="All" />
        </q-tabs>
      </q-header>

      <q-page-container>
        <div style="max-width: 425px">
          <q-separator />
          <q-card flat square bordered>
            <q-tab-panels
              keep-alive
              v-model="tab"
              transition-prev="jump-up"
              transition-next="jump-up"
              animated
            >
              <q-tab-panel name="new">
                <q-card-section
                  v-for="quote in rowData"
                  :key="quote.id"
                  horizontal
                  class="row q-gutter-md cursor-pointer border-white-1 q-pa-sm"
                >
                  <div class="space-y-2 col">
                    <div class="text-red-700 font-medium">
                      HPL-{{ quote?.quote_number }}
                    </div>
                    <div class="text-xs">
                      {{ concatDateTime(quote?.pickupDate, quote?.pickupTime) }}
                    </div>
                    <div class="text-primary text-xs">
                      $ {{ quote.roundTripTotal }}
                    </div>
                  </div>
                  <div class="col space-y-2">
                    <div class="text-xs tracking-wider font-medium">
                      {{ capitalize(quote.firstName) }}
                      {{ capitalize(quote.lastName) }}
                    </div>
                    <NuxtLink
                      :href="`tel:${quote.phone_number}`"
                      class="text-indigo-5 text-sm inline-block"
                      >{{ quote.phone_number }}
                    </NuxtLink>
                    <NuxtLink
                      :href="`mailto:${quote.userEmail}`"
                      style="text-decoration: none"
                      class="text-indigo-4 text-sm"
                      >{{ quote.userEmail }}
                    </NuxtLink>
                  </div>
                  <div class="col flex justify-end items-center">
                    <q-chip
                      dense
                      :label="!quote.isBooked ? 'Quoted' : 'Booked'"
                      :color="!quote.isBooked ? 'red' : 'green'"
                    />
                  </div>
                </q-card-section>
              </q-tab-panel>

              <q-tab-panel name="archived">
                <q-card flat square class="q-pa-none">
                  <q-card-section horizontal>
                    <q-card-section
                      class="space-y-2 border-1 border-right-white"
                    >
                      <div class="text-red-700 font-medium">
                        {{ quoteNumber }}
                      </div>
                      <div class="text-xs">{{ pickupDate }}</div>
                      <div class="font-light text-xs">{{ price }}</div>
                    </q-card-section>
                    <q-card-section class="">
                      <div class="text-lg font-medium">{{ name }}</div>
                      <div class="text-base font-light mb-1">{{ email }}</div>
                      <div class="text-base font-light">{{ phone }}</div>
                    </q-card-section>
                    <q-card-section class="flex flex-col justify-center">
                      <q-chip
                        dense
                        :label="status ? 'Quoted' : 'Booked'"
                        :color="status ? 'red' : 'green'"
                      />
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="all">
                <q-card flat square class="q-pa-none">
                  <q-card-section horizontal>
                    <q-card-section
                      class="space-y-2 border-1 border-right-white"
                    >
                      <div class="text-red-700 font-medium">
                        {{ quoteNumber }}
                      </div>
                      <div class="text-xs">{{ pickupDate }}</div>
                      <div class="font-light text-xs">{{ price }}</div>
                    </q-card-section>
                    <q-card-section class="">
                      <div class="text-lg font-medium">{{ name }}</div>
                      <div class="text-base font-light mb-1">{{ email }}</div>
                      <div class="text-base font-light">{{ phone }}</div>
                    </q-card-section>
                    <q-card-section class="flex flex-col justify-center">
                      <q-chip
                        dense
                        :label="status ? 'Quoted' : 'Booked'"
                        :color="status ? 'red' : 'green'"
                      />
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped></style>
