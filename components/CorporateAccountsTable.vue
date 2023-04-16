<script lang="ts" setup>
import { ref } from '#imports'
import { NuxtLink } from '#components'
import { NButton, useMessage, useDialog } from 'naive-ui'
import type { Customer } from '~/composables/fasttrak-api'
import type { DataTableColumns } from 'naive-ui'

type CustomerData = {
  name?: string
  email?: string
  phone?: string
}

const {
  data: customers,
  suspense: quoteSuspense,
  isLoading,
  refetch: updateCustomers,
} = useQuery({
  queryKey: ['customers'],
  queryFn: () => useTrpc().fasttrak.get.query(),
})

onServerPrefetch(async () => {
  await quoteSuspense()
})

console.log('Fasttrack Customers', customers)

const refTable = ref(null)
const message = useMessage()
const dialog = useDialog()

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
  // {
  //   key: 'is_booked',
  //   title: 'Card On File',
  //   render(row) {
  //     return h(
  //       NTag,
  //       {
  //         style: {
  //           marginRight: '6px',
  //         },
  //         type:
  //           row.invoice_settings.default_payment_method || row.default_source
  //             ? 'success'
  //             : 'error',
  //       },
  //       {
  //         default: () =>
  //           row.invoice_settings.default_payment_method || row.default_source
  //             ? 'Card On File'
  //             : 'No Card On File',
  //       }
  //     )
  //   },
  // },
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
  <client-only>
    <n-data-table
      :max-height="625"
      ref="refTable"
      remote
      :loading="isLoading"
      :columns="columns"
      virtual-scroll
      :data="customers!.items"
      :row-key="rowKey"
    />
  </client-only>
</template>
