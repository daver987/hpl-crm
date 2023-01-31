<script lang="ts" setup>
import { useQuoteStore } from '~/stores/useQuoteStore'
import { storeToRefs } from 'pinia'

const quoteStore = useQuoteStore()
const { quotes, loading } = storeToRefs(quoteStore)
await quoteStore.getQuotes()

const filter = ref('')
const $q = useQuasar()
const { capitalize } = qformat
const isGrid = ref(false)
const toggleGrid = () => {
  isGrid.value = !isGrid.value
}
const isCompact = ref(false)
const toggleCompact = () => {
  isCompact.value = !isCompact.value
}

const pagination = ref({
  rowsPerPage: 0,
})

const columns = () => [
  {
    name: 'submitted',
    align: 'left',
    label: 'Submitted',
    field: (row: any) => formatDateTime(row.updatedAt),
    sortable: true,
  },
  {
    name: 'quote_number',
    required: true,
    label: 'Quote',
    align: 'left',
    field: (row: any) => `HPL-${row.quote_number}`,
    sortable: true,
    classes: 'text-red',
  },
  {
    name: 'firstName',
    align: 'left',
    label: 'Name',
    field: (row: any) =>
      capitalize(row.firstName) + ' ' + capitalize(row.lastName),
  },
  {
    name: 'pickupDate',
    align: 'left',
    label: 'Pickup Date & Time',
    sortable: true,
    field: (row: any) => concatDateTime(row.pickupDate, row.pickupTime),
  },

  {
    name: 'userEmail',
    align: 'left',
    label: 'Email',
    field: 'userEmail',
  },
  {
    name: 'phone_number',
    align: 'left',
    label: 'Phone',
    field: 'phone_number',
  },
  {
    name: 'originName',
    align: 'left',
    label: 'Pickup',
    field: (row: any) =>
      formatAddress(row.originName, row.originFormattedAddress),
  },
  {
    name: 'destinationName',
    align: 'left',
    label: 'Drop Off',
    field: (row: any) =>
      formatAddress(row.destinationName, row.destinationFormattedAddress),
  },
  {
    name: 'serviceTypeLabel',
    align: 'left',
    label: 'Service Type',
    field: 'serviceTypeLabel',
  },
  {
    name: 'vehicleTypeLabel',
    align: 'left',
    label: 'Vehicle Type',
    field: 'vehicleTypeLabel',
  },
  {
    name: 'totalCost',
    align: 'left',
    label: 'Price',
    field: (row: any) => `$${row.roundTripTotal.toFixed(2)}`,
    classes: 'text-primary',
  },
  {
    name: 'isRoundTrip',
    align: 'center',
    label: 'Return',
    field: 'isRoundTrip',
  },

  {
    name: 'status',
    align: 'center',
    label: 'Status',
    field: 'isBooked',
  },

  {
    name: 'details',
    align: 'center',
    label: 'Details',
  },
  {
    name: 'delete',
    align: 'center',
    label: 'Remove',
  },
]

const onClickBookOrder = async (event: any) => {
  console.log('Book Order event', event)
  $q.dialog({
    title: 'Book Order!',
    message: 'Are you sure that you want to book this order?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      console.log('Order Booked')
      await quoteStore.bookOrder(event.row)
    })
    .onCancel(() => {
      console.log('>>>> Cancel')
    })
}

const onClickDeleteQuote = async (event: any) => {
  console.log('Delete Quote event', event)
  $q.dialog({
    title: 'Warning!',
    message: 'Are you sure that you want to delete this quote?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      console.log('Deleted Order')
      await quoteStore.deleteQuote(event.row.id)
    })
    .onCancel(() => {
      console.log('>>>> Cancel')
    })
}
</script>

<template>
  <q-table
    :rows="quotes"
    :columns="columns()"
    :loading="loading"
    square
    flat
    :binary-state-sort="true"
    column-sort-order="da"
    style="height: 738px"
    :grid="isGrid"
    :dense="isCompact"
    :filter="filter"
    row-key="index"
    v-model:pagination="pagination"
    table-header-class="light:bg-neutral-200 dark:bg-neutral-900"
  >
    <template v-slot:top="props">
      <q-btn
        :disable="loading"
        label="Add New"
        outline
        color="primary"
        size="sm"
      />
      <q-space />

      <q-btn
        flat
        round
        dense
        :icon="isCompact ? 'expand' : 'view_compact_alt'"
        @click="toggleCompact"
        class="q-ml-md"
      />
      <q-btn
        flat
        round
        dense
        :icon="isGrid ? 'menu' : 'grid_3x3'"
        @click="toggleGrid"
        class="q-ml-md"
      />
      <q-btn
        flat
        round
        dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        class="q-ml-md"
      />
      <q-input
        dense
        debounce="300"
        outlined
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #body-cell-userEmail="props">
      <q-td key="userEmail" :props="props">
        <NuxtLink
          :href="`mailto:${props.row.userEmail}`"
          style="text-decoration: none"
          class="text-indigo-4"
          >{{ props.row.userEmail }}
        </NuxtLink>
      </q-td>
    </template>

    <template #body-cell-phone_number="props">
      <q-td key="phone_number" :props="props">
        <NuxtLink
          :href="`tel:${props.row.phone_number}`"
          class="text-indigo-5 text-bold"
          >{{ props.row.phone_number }}
        </NuxtLink>
      </q-td>
    </template>
    <template #body-cell-isRoundTrip="props">
      <q-td key="name" :props="props" auto-width>
        <q-badge rounded :color="props.row.isRoundTrip ? 'green' : 'red-7'" />
      </q-td>
    </template>
    <template #body-cell-status="props">
      <q-td key="name" :props="props" auto-width>
        <q-chip
          clickable
          dense
          :color="props.row.isBooked ? 'green' : 'pink'"
          text-color="white"
          @click="onClickBookOrder(props)"
        >
          {{ props.row.isBooked ? 'Booked' : 'Quoted' }}
        </q-chip>
      </q-td>
    </template>
    <template #body-cell-details="props">
      <q-td key="name" :props="props" auto-width>
        <q-btn icon="pageview" color="info" size="sm" round />
      </q-td>
    </template>
    <template #body-cell-delete="props">
      <q-td key="details" :props="props" auto-width>
        <div class="q-gutter-sm">
          <q-btn
            @click="onClickDeleteQuote(props)"
            icon="delete"
            size="sm"
            round
            color="negative"
          />
        </div>
      </q-td>
    </template>
  </q-table>
</template>
