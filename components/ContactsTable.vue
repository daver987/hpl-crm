<script lang="ts" setup>
import { useContactsStore } from '~/stores/useContactsStore'
import { storeToRefs } from 'pinia'

const contactsStore = useContactsStore()
const { contacts, loading } = storeToRefs(contactsStore)
await contactsStore.getContacts()
console.log('Contacts', contacts)

const { capitalize } = qformat
const isGrid = ref(false)
const toggleGrid = () => {
  isGrid.value = !isGrid.value
}
const isCompact = ref(false)
const toggleCompact = () => {
  isCompact.value = !isCompact.value
}

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

const columns = [
  {
    name: 'createdAt',
    align: 'left',
    label: 'Created',
    field: (row: any) => formatDateTime(row.updatedAt),
    sortable: true,
  },
  {
    name: 'first_name',
    align: 'left',
    label: 'Name',
    field: (row: any) =>
      capitalize(row.first_name) + ' ' + capitalize(row.last_name),
  },
  {
    name: 'email_address',
    align: 'left',
    label: 'Email',
    field: 'email_address',
  },
  {
    name: 'phone_number',
    align: 'left',
    label: 'Phone',
    field: 'phone_number',
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
    :rows="contacts"
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
    <template #body-cell-email_address="props">
      <q-td key="name" :props="props">
        <NuxtLink
          :href="`mailto:${props.row.email_address}`"
          style="text-decoration: none"
          class="text-blue-7"
          >{{ props.row.email_address }}
        </NuxtLink>
      </q-td>
    </template>

    <template #body-cell-phone_number="props">
      <q-td key="name" :props="props">
        <NuxtLink
          :href="`tel:${props.row.phone_number}`"
          class="text-indigo-5 text-bold"
          >{{ props.row.phone_number }}
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

<style scoped></style>
