<script lang="ts" setup>
import { ref } from '#imports'
import { NuxtLink } from '#components'
import { NTag, NButton, useMessage, useDialog } from 'naive-ui'

import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import type { Stripe } from 'stripe'

type RowData = Stripe.Customer
type CustomerData = {
  name?: string
  email?: string
  phone?: string
}

const refTable = ref(null)
const dialog = useDialog()
const message = useMessage()

const {
  data: stripeCustomerData,
  suspense: stripeCustomerDataSuspense,
  isLoading: loading,
  refetch: refetchStripeCustomers,
} = useQuery({
  queryKey: ['stripeCustomers'],
  queryFn: () => useTrpc().customer.getAll.query(),
})

onServerPrefetch(async () => {
  await stripeCustomerDataSuspense()
})

const stripeCustomers = computed(() => stripeCustomerData.value?.data)

const rowKey = (row: RowData) => row.id

const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
  console.log('Selected Row', checkedRowKeysRef)
}

const deleteCustomer = (stripeCustomerId: string) => {
  const d = dialog.success({
    title: 'Delete Customer',
    content: 'Are you sure you want to delete the customer?',
    positiveText: 'Confirm',
    onPositiveClick: async () => {
      d.loading = true
      const deleted = await useTrpc().customer.delete.mutate({
        stripe_customer_id: stripeCustomerId,
      })
      if (deleted.deleted) {
        message.info(`The Customer was successfully Deleted`)
        await refetchStripeCustomers()
        d.loading = false
      } else {
        message.error(
          `Oops, something went wrong reload the page and try again`
        )
      }
    },
  })
}

const updateCustomer = async (id: string, options: CustomerData) => {
  const updatedCustomer = await useTrpc().customer.update.mutate({
    id,
    options,
  })
  console.log('Customer Updated', updatedCustomer)
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    key: 'full_name',
    title: 'Name',
    render(row) {
      return `${row.name}`
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
        NuxtLink,
        {
          href: `mailto:${row.email}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row.email }
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
          href: `tel:${row.phone}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row.phone }
      )
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'is_booked',
    title: 'Card On File',
    render(row) {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type:
            row.invoice_settings.default_payment_method || row.default_source
              ? 'success'
              : 'error',
        },
        {
          default: () =>
            row.invoice_settings.default_payment_method || row.default_source
              ? 'Card On File'
              : 'No Card On File',
        }
      )
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
          onClick: () => deleteCustomer(row.id),
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
    size="small"
    :max-height="685"
    ref="refTable"
    remote
    :loading="loading"
    :columns="columns"
    :data="stripeCustomers"
    :row-key="rowKey"
  />
</template>
