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
const loading = ref(false)
const message = useMessage()
const dialog = useDialog()

async function getCustomers() {
  loading.value = true
  const customers = await useTrpc().customer.getAll.query()
  setTimeout(() => {
    loading.value = false
  }, 500)
  return customers
}

const customers = await getCustomers()

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
        d.loading = false
        reloadNuxtApp()
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

const rowKey = (row: RowData) => row.id

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
  <Client>
    <n-data-table
      :max-height="625"
      ref="refTable"
      remote
      :loading="loading"
      :columns="columns"
      virtual-scroll
      :data="customers.data"
      :row-key="rowKey"
    />
  </Client>
</template>
