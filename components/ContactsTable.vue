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
const getContacts = async () => {
  loading.value = true
  try {
    const { data, refresh: refreshQuoteData } = await useFetch(
      '/api/get-contacts'
    )
    console.log(rowData.value)
    rowData.value = data.value
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
await getContacts()

const pagination = {
  rowsPerPage: 12,
  sortBy: 'quote_number',
}

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

console.log(convertDateTime('2023-01-20T21:34:00.595')) // Jan 20, 2023 9:34 PM

const columns = [
  {
    name: 'createdAt',
    align: 'left',
    label: 'Created',
    field: (row: any) => convertDateTime(row.createdAt),
    sortable: true,
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
    name: 'emailAddress',
    align: 'left',
    label: 'Email',
    field: 'emailAddress',
  },
  {
    name: 'phoneNumber',
    align: 'left',
    label: 'Phone',
    field: 'phoneNumber',
  },
  {
    name: 'add_remove',
    align: 'center',
    label: 'Edit / Delete',
  },
  {
    name: 'details',
    align: 'center',
    label: 'Details',
  },
]
const filter = ref('')
</script>

<template>
  <q-table
  :rows="rowData"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    square
    flat
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
    <template #body-cell-emailAddress="props">
      <q-td key="name" :props="props">
        <NuxtLink
          :href="`mailto:${props.row.emailAddress}`"
          style="text-decoration: none"
          class="text-blue-7"
          >{{ props.row.emailAddress }}
        </NuxtLink>
      </q-td>
    </template>

    <template #body-cell-phoneNumber="props">
      <q-td key="name" :props="props">
        <NuxtLink
          :href="`tel:${props.row.phoneNumber}`"
          class="text-indigo-5 text-bold"
          >{{ props.row.phoneNumber }}
        </NuxtLink>
      </q-td>
    </template>
    <template #body-cell-details="props">
      <q-td key="name" :props="props">
        <q-btn icon="pageview" color="info" size="sm" round />
      </q-td>
    </template>

    <template #body-cell-add_remove="props">
      <q-td key="details" :props="props">
        <div class="q-gutter-sm">
          <q-btn icon="edit" size="sm" round color="teal-6" />
          <q-btn icon="delete" size="sm" round color="negative" />
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<style scoped>

</style>
