<script lang="ts" setup>
const isGrid = ref(false)
const toggleGrid = () => {
  isGrid.value = !isGrid.value
}

const isCompact = ref(false)
const toggleCompact = () => {
  isCompact.value = !isCompact.value
}

const loading = ref(false)
const rowData = ref()
const getQuotes = async () => {
  loading.value = true
  try {
    const { data, refresh: refreshQuoteData } = await useFetch(
      '/api/get-quotes'
    )
    console.log(rowData.value)
    rowData.value = data.value
    loading.value = false
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
await getQuotes()

const pagination = {
  rowsPerPage: 12,
  sortBy: 'quote_number',
}

function convertDate(dateString: string) {
  const parts = dateString.split('-')
  const date = new Date(parts.reverse().join('/'))
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

console.log(convertDate('17-02-2023')) // Feb 17, 2023
console.log(convertDate('40-40-4040')) // 40-40-4040

function convertDateTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  })
}

console.log(convertDate('2023-01-20T21:34:00.595')) // Jan 20, 2023 4:34 PM

const columns = [
  {
    name: 'submitted',
    align: 'left',
    label: 'Submitted',
    field: (row: any) => convertDateTime(row.createdAt),
    sortable: true,
  },
  {
    name: 'quote_number',
    required: true,
    label: 'Quote',
    align: 'left',
    field: (row: any) => `HPL-${row.quote_number}`,
    sortable: true,
    sortOrder: 'da',
    classes: 'text-red',
  },
  {
    name: 'firstName',
    align: 'left',
    label: 'Name',
    field: (row: any) =>
      row.firstName.toLowerCase().charAt(0).toUpperCase() +
      row.firstName.toLowerCase().slice(1) +
      ' ' +
      row.lastName.toLowerCase().charAt(0).toUpperCase() +
      row.lastName.toLowerCase().slice(1),
  },
  {
    name: 'pickupDate',
    align: 'left',
    label: 'Pickup Date & Time',
    field: (row: any) =>
      convertDate(row.pickupDate) + ' ' + '@' + ' ' + row.pickupTime,
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
    field: 'originName',
  },
  {
    name: 'destinationName',
    align: 'left',
    label: 'Drop Off',
    field: 'destinationName',
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
const bookOrder = () => {
  console.log('Order Booked')
}
const filter = ref('')
</script>

<template>
  <q-table
    :rows="rowData"
    :columns="columns"
    :loading="loading"
    square
    flat
    :pagination="pagination"
    :grid="isGrid"
    :dense="isCompact"
    :filter="filter"
    row-key="name"
    table-header-class="bg-grey-9"
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
        <q-badge rounded :color="[props.row.isRoundTrip ? 'green' : 'red-7']" />
      </q-td>
    </template>
    <template #body-cell-status="props">
      <q-td key="name" :props="props" auto-width>
        <q-chip
          clickable
          dense
          @click="bookOrder"
          :color="[props.row.isBooked ? 'green' : 'pink']"
          text-color="white"
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
          <q-btn icon="delete" size="sm" round color="negative" />
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<style scoped></style>
