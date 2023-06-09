<script lang="ts" setup>
import { format } from 'date-fns'
import type { DataTableColumns } from 'naive-ui'
import { NButton, useMessage } from 'naive-ui'
import type {
  EmployeeReservationResponse,
  EmployeeReservation,
  EmployeePay,
  EmployeePayResponse,
} from '~/composables'
import { Ref } from 'vue'
import { h } from '#imports'

interface Props {
  employeeId: number
  loading: boolean
}

const props = defineProps<Props>()
const refTable = ref(null)
const message = useMessage()
const driverReservations: Ref<EmployeeReservationResponse | null> = ref(null)

const { data, pending: isLoading } = await useFetch('/api/reservation-search', {
  method: 'POST',
  body: {
    employeeId: props.employeeId,
  },
})
driverReservations.value = data.value as unknown as EmployeeReservationResponse

const getPayout = async (resId: number) => {
  const { data } = await useFetch('/api/employee-pay', {
    method: 'POST',
    body: {
      employeeId: resId,
    },
  })
  return data.value
}

const rowKey = (row: EmployeeReservation) => row.reservationId
const payout = ref(0)

const createColumns = (): DataTableColumns<EmployeeReservation> => [
  {
    type: 'selection',
  },
  {
    key: 'reservation_number',
    title: 'ID',
    width: '100px',
    render(row) {
      return h(
        'span',
        {
          style: { color: '#F44336' },
        },
        `${row.reservationId}`
      )
    },
  },
  {
    key: 'pickup_date',
    title: 'Pickup Date',
    render(row) {
      return `${format(new Date(row.scheduledPickupTime), 'PPP')}`
    },
  },
  {
    key: 'status',
    title: 'Status',
    render(row) {
      return `${row.reservationStatus}`
    },
  },
  {
    key: 'finalized',
    title: 'Is Finalized',
    render(row) {
      return `${row.isFinalized}`
    },
  },
  {
    title: 'Payout',
    key: 'payout',
    render(row) {
      return h(
        NButton,
        {
          type: 'success',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: async () => {
            const payoutData = await getPayout(row.reservationId)
            payout.value = payoutData?.items.total
          },
        },
        { default: () => 'Payout' }
      )
    },
  },
  {
    key: 'Total',
    title: 'Total Value',
    render(row) {
      return `${payout.value}`
    },
  },
  // {
  //   key: 'driver_payout',
  //   title: 'Driver Payout',
  //   render(row) {
  //     return `${row.totalCharges}`
  //   },
  // },
  // {
  //   key: 'balance',
  //   title: 'Balance',
  //   render(row) {
  //     return h(
  //       'a',
  //       {
  //         href: `tel:${row.phoneCell}`,
  //         style: { color: '#93c5fd' },
  //       },
  //       { default: () => row.phoneCell }
  //     )
  //   },
  // },
]

const columns = createColumns()
</script>

<template>
  <n-data-table
    :max-height="675"
    ref="refTable"
    remote
    :data="driverReservations?.items!"
    :loading="isLoading"
    :columns="columns"
    :row-key="rowKey"
    s
    size="small"
  />
  <pre>{{ employeePay }}</pre>
</template>
