<script lang="ts" setup>
import { ref } from '#imports'
import { NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Driver } from '~/composables'

const refTable = ref(null)
const message = useMessage()

const { data: driverData, isLoading: isLoading } = useQuery({
  queryKey: ['drivers'],
  queryFn: async () => await useTrpc().drivers.get.query(),
})

const drivers = computed(() => driverData.value?.items)
console.log('Drivers:', drivers.value)

const rowKey = (row: Driver) => row.userId

const pagination = {
  rowsPerPage: 12,
  sortBy: 'quote_number',
}

const createColumns = (): DataTableColumns<Driver> => [
  {
    key: 'full_name',
    title: 'Name',
    render(row) {
      return `${row.firstName} ${row.lastName}`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'email',
    title: 'Email',
    render(row) {
      return h(
        'a',
        {
          href: `mailto:${row.emailAddress}`,
          style: { color: '#93c5fd' },
        },
        row.emailAddress
      )
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'phone_number',
    title: 'Phone',
    render(row) {
      return h(
        'a',
        {
          href: `tel:${row.phoneCell}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row.phoneCell }
      )
    },
  },
  {
    key: 'balance',
    title: 'Balance',
    render(row) {
      return h(
        'a',
        {
          href: `tel:${row.phoneCell}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row.phoneCell }
      )
    },
  },
  {
    title: 'Update',
    key: 'update',
    render(row) {
      return h(
        NButton,
        {
          type: 'info',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => message.info('Feature Under Construction'),
        },
        { default: () => 'Update' }
      )
    },
  },
  {
    title: 'Details',
    key: 'details',
    render(row) {
      return h(
        NButton,
        {
          type: 'success',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => message.info('Feature Under Construction'),
        },
        { default: () => 'Details' }
      )
    },
  },
]

const columns = createColumns()
</script>

<template>
  <n-data-table
    :max-height="675"
    ref="refTable"
    remote
    :data="drivers"
    :loading="isLoading"
    :columns="columns"
    :row-key="rowKey"
    size="small"
  />
</template>
