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
import type { ComputedRef, Ref } from 'vue'
import { SingleReservation } from '~/composables/fasttrak-api/schemas/SingleReservation'
import chalk from 'chalk'

definePageMeta({
  name: 'Fasttrak',
  layout: 'default',
  path: '/reservations/active',
})

type ReservationStatus =
  | 'None'
  | 'Quotation'
  | 'Trip_Confirmed'
  | 'Driver_Confirmed'
  | 'En_route'
  | 'On_Location'
  | 'Dropped'
  | 'No_Show'
  | 'Cancelled'
  | 'On_Board'
  | 'Booked'
  | 'Driver_Scheduled'

const tableRef = ref(null)
const message = useMessage()
const dialog = useDialog()

const {
  data: reservationsData,
  pending,
  error,
} = await useFetch('/api/reservations-all', {
  lazy: true,
})
const reservations = computed(() => {
  return reservationsData.value as unknown as SingleReservation[]
})
const rowKey = (row: SingleReservation) => row.reservationId

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
  return reservations.value.filter((reservation: SingleReservation) => {
    let reservationDate = parseISO(<string>reservation.scheduledPickupTime)
    return (
      (isAfter(reservationDate, startDate.value!) ||
        isSameDay(reservationDate, startDate.value!)) &&
      (isBefore(reservationDate, endDate.value!) ||
        isSameDay(reservationDate, endDate.value!))
    )
  })
})

async function handlePushReservation(evt: SingleReservation) {
  console.log('Push event', evt)
  const d = dialog.success({
    title: 'Push to Evertransit',
    content: 'Are you sure you want to push to Evertransit',
    positiveText: 'Confirm',
    onPositiveClick: async () => {
      d.loading = true
      const response = pushToZoho(evt)
      console.log(chalk.blue('[RETURNED_ZOHO]', response))
      // message.info(`The Customer was successfully Deleted`)
      // d.loading = false
    },
  })
}

const pagination = {
  pageSize: 13,
}

const createColumns = (): DataTableColumns<SingleReservation> => [
  {
    key: 'reservationId',
    title: 'Res Id',
    width: 100,
    sortOrder: false,
    sorter: 'default',
    render(row) {
      return h(
        'span',
        {
          style: { color: '#F44336', marginLeft: '10px' },
        },
        `${row.reservationId}`
      )
    },
  },
  {
    key: 'date',
    title: 'Date & Time',
    render(row) {
      return `${format(new Date(row.scheduledPickupTime), 'Pp')}`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'full_name',
    title: 'Passenger',
    render(row) {
      return `${row.customerSummary.firstName} ${row.customerSummary.lastName}`
    },
    ellipsis: {
      tooltip: true,
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
      const statusTypeMap: { [key in ReservationStatus]: string } = {
        None: 'default',
        Quotation: 'primary',
        Trip_Confirmed: 'primary',
        Driver_Confirmed: 'success',
        En_route: 'info',
        On_Location: 'info',
        Dropped: 'error',
        No_Show: 'error',
        Cancelled: 'error',
        On_Board: 'info',
        Booked: 'primary',
        Driver_Scheduled: 'error',
      }

      const type =
        statusTypeMap[row.reservationStatus as keyof typeof statusTypeMap] ||
        'default'

      const humanFriendlyStatus = row.reservationStatus.split('_').join(' ')

      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: type,
          bordered: false,
          round: true,
          size: 'small',
        },
        { default: () => humanFriendlyStatus }
      )
    },
  },

  {
    title: 'To EVT',
    key: 'everTransit',
    render(row) {
      return h(
        NButton,
        {
          type: 'info',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => handlePushReservation(row),
        },
        { default: () => 'To EVT' }
      )
    },
  },
]

const columns = createColumns()
</script>

<template>
  <n-layout-content>
    <!--    <n-spin :show="pending">-->
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
      :data="filteredReservations"
      :loading="pending"
      :columns="columns"
      :row-key="rowKey"
      size="small"
      :pagination="pagination"
    />
    <!--    </n-spin>-->
  </n-layout-content>
</template>
