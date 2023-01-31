<script setup lang="ts">
import { useAccountStore } from '~/stores/useAccountStore'
import { storeToRefs } from 'pinia'

const accountsStore = useAccountStore()
const { accounts, loading } = storeToRefs(accountsStore)
await accountsStore.getAccounts()
console.log('Accounts', accounts)

const isGrid = ref(false)
const toggleGrid = () => {
  isGrid.value = !isGrid.value
}
const isCompact = ref(false)
const toggleCompact = () => {
  isCompact.value = !isCompact.value
}

const filter = ref('')

const pagination = ref({
  rowsPerPage: 12,
  sortBy: 'company_account_number',
})

const columns = [
  {
    name: 'account_number',
    required: true,
    label: 'Account',
    align: 'left',
    field: 'company_account_number',
    sortable: true,
    sortOrder: 'ad',
    classes: 'text-red',
  },
  {
    name: 'company_name',
    align: 'left',
    label: 'Company Name',
    field: 'company_name',
    sortable: true,
  },
  {
    name: 'company_address',
    align: 'left',
    label: 'Company Address',
    field: 'company_address',
  },
  {
    name: 'company_phone',
    align: 'left',
    label: 'Company Phone',
    field: 'company_phone',
  },
  {
    name: 'company_email',
    align: 'left',
    label: 'Company Email',
    field: 'company_email',
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
</script>

<template>
  <q-table
    :rows="accounts"
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

    <template #body-cell-company_email="props">
      <q-td key="company_phone" :props="props">
        <NuxtLink
          :href="`mailto:${props.row.company_email}`"
          style="text-decoration: none"
          >{{ props.row.company_email }}</NuxtLink
        >
      </q-td>
    </template>

    <template #body-cell-company_phone="props">
      <q-td key="company_phone" :props="props">
        <NuxtLink
          :href="`tel:${props.row.company_phone}`"
          class="text-indigo-4 text-bold"
          >{{ props.row.company_phone }}</NuxtLink
        >
      </q-td>
    </template>
  </q-table>
</template>
