<script lang="ts" setup>
import type { Reservation } from '~/schema/reservationSchema'
import { format } from 'date-fns'
import { ref } from '#imports'
import { NButton, useMessage, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

definePageMeta({
  name: 'Fasttrak',
  layout: 'default',
})

const tableRef = ref(null)
const message = useMessage()

const { data: reservationsData, isLoading: isLoading } = useQuery({
  queryKey: ['reservationsFasttrak'],
  queryFn: () => useTrpc().fasttrak.getReservations.query(),
})

const reservations = computed(() => reservationsData.value?.items)

const rowKey = (row: Reservation) => row.reservationId

const createColumns = (): DataTableColumns<Reservation> => [
  {
    key: 'reservationId',
    title: 'Res Id',
    width: 125,
    fixed: 'left',
    sortOrder: false,
    sorter: 'default',
    render(row) {
      return h(
        'span',
        {
          style: { color: '#F44336' },
        },
        `HPL-${row.reservationId}`
      )
    },
  },
  {
    key: 'date',
    title: 'Date & Time',
    render(row) {
      return `${format(new Date(row.scheduledPickupTime), 'PP, p')} ${
        row.estimatedHours
      }`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'full_name',
    title: 'Name',
    render(row) {
      return `${row.customerSummary.firstName} ${row.customerSummary.lastName}`
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
          href: `mailto:${row.customerSummary.emailAddress}`,
          style: { color: '#93c5fd' },
        },
        row.customerSummary.emailAddress
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
          href: `tel:${row.customerSummary.cellPhoneNumber}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row.customerSummary.cellPhoneNumber }
      )
    },
  },
  {
    key: 'origin',
    title: 'Pickup',
    render(row) {
      return `${row.fromLocation.summaryAddress}`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'destination',
    title: 'Drop Off',
    render(row) {
      return `${row.toLocation.summaryAddress}`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'status',
    title: 'Status',
    render(row) {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: row.reservationStatus ? 'success' : 'info',
        },
        { default: () => row.reservationStatus }
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
  <n-layout-content>
    <n-data-table
      :max-height="685"
      ref="tableRef"
      remote
      :data="reservations"
      :loading="isLoading"
      :columns="columns"
      :row-key="rowKey"
      virtual-scroll
      :scroll-x="1800"
      size="small"
    />
  </n-layout-content>
</template>
