<script lang="ts" setup>
import { ref } from '#imports'
import { NuxtLink } from '#components'
import { NButton, useMessage } from 'naive-ui'
import type { Customer } from '~/composables/fasttrak-api'
import type { DataTableColumns } from 'naive-ui'

const refTable = ref(null)
const message = useMessage()
const { data: fasttrakCustomersData, isLoading: loadingFasttrakCustomers } =
  useQuery({
    queryFn: async () => await useTrpc().fasttrak.get.query(),
    queryKey: ['fasttrakCustomers'],
  })

const fasttrakCustomers = computed(() => fasttrakCustomersData.value?.items)

const rowKey = (row: Customer) => row?.customerId

const createColumns = (): DataTableColumns<Customer> => [
  {
    key: 'company_name',
    title: 'Company Name',
    render(row) {
      return `${row?.corporateProfileCompanyName}`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'full_name',
    title: 'Name',
    render(row) {
      return `${row.firstName} ${row.lastName}`
    },
    width: 150,
    fixed: 'left',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'email',
    title: 'Email',
    render(row) {
      return h(
        NuxtLink,
        {
          href: `mailto:${row?.emailAddress}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row?.emailAddress }
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
        NuxtLink,
        {
          href: `tel:${row?.phoneNumber1}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row?.phoneNumber1 }
      )
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Update',
    key: 'delete',
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
    title: 'Delete',
    key: 'delete',
    render(row) {
      return h(
        NButton,
        {
          type: 'error',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => message.info('Feature Under Construction'),
        },
        { default: () => 'Delete' }
      )
    },
  },
]
const columns = createColumns()
</script>

<template>
  <n-data-table
    :max-height="625"
    ref="refTable"
    remote
    :loading="loadingFasttrakCustomers"
    :columns="columns"
    virtual-scroll
    :data="fasttrakCustomers"
    :row-key="rowKey"
    size="small"
  />
</template>
