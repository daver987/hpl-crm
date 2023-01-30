<script lang="ts" setup>
const $q = useQuasar()
const rowData = ref()
const loading = ref(false)
const isGrid = ref(false)
const toggleGrid = () => {
  isGrid.value = !isGrid.value
}

const isCompact = ref(false)
const toggleCompact = () => {
  isCompact.value = !isCompact.value
}
const { capitalize } = qformat
const refreshQuoteData = ref<any>()

const getQuotes = async () => {
  loading.value = true
  try {
    const { data, refresh } = await useFetch('/api/get-quotes')
    rowData.value = data.value
    refreshQuoteData.value = refresh
    loading.value = false
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
await getQuotes()

const pagination = ref({
  rowsPerPage: 0,
})

const filter = ref('')
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

async function bookOrder(event: any) {
  loading.value = true
  try {
    const { data } = await useFetch('/api/book-order', {
      method: 'POST',
      body: { row: event.row },
    })
    setTimeout(async () => {
      await getQuotes()
    }, 1500)
    console.log('Order Booked Data', data)
  } catch (e) {
    console.log('Error Occurred', e)
  } finally {
    loading.value = false
  }
}

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
      await bookOrder(event)
    })
    .onCancel(() => {
      console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
}

const tableRef = ref(null)
async function deleteQuote(event: any) {
  loading.value = true
  try {
    const { data } = await useFetch('/api/delete-quote', {
      method: 'POST',
      body: { id: event.id },
    })
    setTimeout(async () => {
      await getQuotes()
    }, 1500)
    console.log('Quote Deleted Data', data)
  } catch (e) {
    console.log('Error Occurred', e)
  } finally {
    loading.value = false
  }
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
      await deleteQuote(event.row)
    })
    .onCancel(() => {
      console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
}
</script>

<template>
  <q-table
    :rows="rowData"
    :columns="columns()"
    :loading="loading"
    square
    flat
    ref="tableRef"
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
