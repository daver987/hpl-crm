<script lang="ts" setup>
import { ref } from '#imports'
import { NButton, useMessage, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { type Employee, EmployeeResponseSchema } from '~/composables'

interface Props {
  data: Employee[]
  pending: boolean
}

const props = defineProps<Props>()

const refTable = ref(null)
const message = useMessage()
const dialog = useDialog()
const employees = computed(() => {
  return EmployeeResponseSchema.parse(props.data)
})
const rowKey = (row: Employee) => row.employeeId

const createColumns = (): DataTableColumns<Employee> => [
  {
    key: 'id',
    title: 'Id',
    render(row) {
      return `${row.employeeId}`
    },
    width: 100,
  },
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
    title: 'Orders',
    key: 'update',
    render(row) {
      return h(
        NButton,
        {
          type: 'info',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => handleGetEmployeeReservations(row),
        },
        { default: () => 'Orders' }
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

async function getEmployeeReservations(event: Employee) {
  const data = await $fetch('/api/reservation-search', {
    method: 'POST',
    body: {
      employeeId: event.employeeId,
    },
  })
  return data
}

async function handleGetEmployeeReservations(event: Employee) {
  const d = dialog.warning({
    title: 'Confirm Get Employee Reservations',
    content: 'Are you sure you want to get employee reservations',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      try {
        const reservations = await getEmployeeReservations(event)
        message.success(
          `Successfully retrieved employee reservations${JSON.stringify(
            reservations
          )}`
        )
      } catch (error) {
        message.error(`Failed get reservations Error: ${error}`)
      }
    },
    onNegativeClick: () => {
      message.error('Wow That was Close')
    },
  })
}
</script>

<template>
  <n-data-table
    :max-height="675"
    ref="refTable"
    remote
    :data="employees.items"
    :loading="pending"
    :columns="columns"
    :row-key="rowKey"
    size="small"
  />
</template>
