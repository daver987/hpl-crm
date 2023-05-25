<script lang="ts" setup>
import {
  endOfDay,
  endOfMonth,
  format,
  getUnixTime,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
} from 'date-fns'
import { NButton, useMessage, NTag, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { RowData } from 'naive-ui/es/data-table/src/interface'
import { ComputedRef, Ref } from 'vue'
import {
  type EmployeeReservation,
  EmployeeReservationResponseSchema,
} from '~/composables'

const tableRef = ref(null)
const message = useMessage()
const dialog = useDialog()

const { data, pending } = await useFetch('/api/reservation-search', {
  method: 'POST',
  body: { employeeId: 93 },
})
const reservations = computed(() => {
  return EmployeeReservationResponseSchema.parse(data.value)
})

const rowKey = (row: EmployeeReservation) => row.reservationId

const startOfMonthTimestamp = getUnixTime(startOfMonth(new Date()))
const endOfMonthTimestamp = getUnixTime(endOfMonth(new Date()))
const range: Ref<[number, number]> = ref([
  startOfMonthTimestamp * 1000,
  endOfMonthTimestamp * 1000,
])

const startTimestamp: ComputedRef<Date | null> = computed(() => {
  return range.value ? startOfDay(new Date(range.value[0])) : null
})

const endTimestamp: ComputedRef<Date | null> = computed(() => {
  return range.value ? endOfDay(new Date(range.value[1])) : null
})

const startDate = computed(() => {
  return startTimestamp.value ? new Date(startTimestamp.value) : null
})

const endDate = computed(() => {
  return endTimestamp.value ? new Date(endTimestamp.value) : null
})

const filteredReservations = computed(() => {
  if (!startDate.value || !endDate.value) {
    return []
  }
  return reservations.value.items.filter((reservation) => {
    let reservationDate = parseISO(reservation.scheduledPickupTime)
    return (
      (isAfter(reservationDate, startDate.value!) ||
        isSameDay(reservationDate, startDate.value!)) &&
      (isBefore(reservationDate, endDate.value!) ||
        isSameDay(reservationDate, endDate.value!))
    )
  })
})

const handlePush = (evt: RowData) => {
  console.log('Push event', evt)
  // const d = dialog.success({
  //   title: 'Push to Zoho',
  //   content: 'Are you sure you want to push to Zoho',
  //   positiveText: 'Confirm',
  //   onPositiveClick: async () => {
  //     // d.loading = true
  //     const response = pushToZoho(evt)
  //     console.log(chalk.blue('[RETURNED_ZOHO]', response))
  //     // message.info(`The Customer was successfully Deleted`)
  //     // d.loading = false
  //   },
  // })
}

const createColumns = (): DataTableColumns<EmployeeReservation> => [
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
    title: 'Delete',
    key: 'delete',
    render() {
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
    <n-spin :show="pending">
      <n-grid :cols="1">
        <n-grid-item style="padding: 16px">
          <n-space justify-between>
            <n-date-picker
              v-model:value="range"
              type="daterange"
              clearable
              :default-value="range"
              format="PP"
            />
          </n-space>
        </n-grid-item>
      </n-grid>
      <n-data-table
        :max-height="685"
        ref="tableRef"
        remote
        :data="filteredReservations"
        :loading="pending"
        :columns="columns"
        :row-key="rowKey"
        virtual-scroll
        :scroll-x="1800"
        size="small"
      />
    </n-spin>
  </n-layout-content>
</template>
