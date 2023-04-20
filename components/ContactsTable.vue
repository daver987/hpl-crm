<script lang="ts" setup>
import { ref } from '#imports'
import { NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const refTable = ref(null)
const message = useMessage()

const { data: contactData, isLoading: isLoading } = useQuery({
  queryFn: () => useTrpc().user.getAll.query(),
  queryKey: ['contacts'],
})

type ArrayElementType<T extends ReadonlyArray<any> | null> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

type RowData = ArrayElementType<typeof contactData.value>

const rowKey = (row: RowData) => row.id

const pagination = {
  rowsPerPage: 12,
  sortBy: 'quote_number',
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    key: 'full_name',
    title: 'Name',
    render(row) {
      return `${row.first_name} ${row.last_name}`
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
          href: `mailto:${row.email_address}`,
          style: { color: '#93c5fd' },
        },
        row.email_address
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
          href: `tel:${row.phone_number}`,
          style: { color: '#93c5fd' },
        },
        { default: () => row.phone_number }
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
  <n-data-table
    :max-height="675"
    ref="refTable"
    remote
    :data="contactData as RowData[]"
    :loading="isLoading"
    :columns="columns"
    :row-key="rowKey"
    size="small"
  />
</template>
