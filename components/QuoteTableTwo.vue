<script lang="ts" setup>
import { ref } from '#imports'
import { format } from 'date-fns'
import { NTag, NP, NButton, useDialog } from 'naive-ui'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'

const refTable = ref(null)

const { data: quoteData, pending: isLoading, refresh: updateQuotes } = await useTrpc().quote.getAll.useQuery()
// console.log('loading:', isLoading.value)

type ArrayElementType<T extends ReadonlyArray<any> | null> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

type RowData = ArrayElementType<typeof quoteData.value>

const rowKey = (row: RowData) => row.quote_number

const quotes = computed(() => quoteData.value)

const checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
  console.log('Selected Row', checkedRowKeysRef)
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    key: 'created_at',
    title: 'Submitted',
    render(row) {
      return format(new Date(row.created_at), 'PP, p')
    },
    width: 200,
  },
  {
    key: 'quote_number',
    title: 'Quote',
    width: 100,
    fixed: 'left',
    sortOrder: false,
    sorter: 'default',
    render(row) {
      return h(
        'span',
        {
          style: { color: '#F44336' },
        },
        `HPL-${row.quote_number}`
      )
    },
  },
  {
    key: 'full_name',
    title: 'Name',
    render(row) {
      return `${row.user.first_name} ${row.user.last_name}`
    },
    width: 150,
    fixed: 'left',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'formatted_pickup_date',
    title: 'Pickup Date & Time',
    render(row) {
      return `${row.trips[0].pickup_date}, ${row.trips[0].pickup_time}`
    },
    width: 250,
  },

  {
    key: 'email_address',
    title: 'Email',
    render(row) {
      return h(
        'a',
        {
          href: `mailto:${row.user.email_address}`,
          style: { color: '#93c5fd' },
        },
        row.user.email_address
      )
    },
    width: 200,
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
          href: `tel:${row.user.phone_number}`,
          style: { color: '#93c5fd' },
        },
        row.user.phone_number
      )
    },
    width: 150,
  },

  {
    key: 'origin',
    title: 'Pickup',
    render(row) {
      return row.trips?.[0]?.locations?.[0]?.full_name ?? 'N/A'
    },
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'destination',
    title: 'Drop Off',
    render(row) {
      return row.trips?.[0]?.locations?.[1]?.full_name ?? 'N/A'
    },
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },

  {
    key: 'service_label',
    title: 'Service Type',
    render(row) {
      return row.service.label
    },
    width: 125,
  },
  {
    key: 'vehicle_label',
    title: 'Vehicle Type',
    render(row) {
      return row.vehicle.label
    },
    width: 135,
  },
  {
    key: 'quote_total',
    title: 'Price',
    render(row) {
      return h(
        NP,
        {
          strong: true,
        },
        { default: () => `$${row.quote_total}` }
      )
    },

    width: 100,
  },
  {
    key: 'is_booked',
    title: 'Status',
    render(row) {
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: row.is_booked ? 'success' : 'info',
        },
        { default: () => (row.is_booked ? 'Booked' : 'Pending') }
      )
    },

    width: 100,
  },
  {
    key: 'book',
    title: 'Book',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          color: 'blue',
          textColor: '#fff',
          // onClick: () => handleBook(row.quote_number),
        },
        { default: () => 'Book' }
      )
    },

    width: 100,
  },
  {
    key: 'delete',
    title: 'Remove',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          color: '#b91c1c',
          textColor: '#fff',
          onClick: () => handleConfirm(row),
        },
        { default: () => 'Delete' }
      )
    },

    width: 100,
  },
]

const columns = createColumns()
const columnsRef = ref(columns)

const searchInput = ref('')

const filteredData = computed(() => {
  if (searchInput.value.trim() === '') {
    return quotes.value
  }
  return quotes.value!.filter((row) => {
    return (
      row.user.first_name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      row.user.last_name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      row.user.email_address
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    )
  })
})

const filterSearch = () => { }
const dialog = useDialog()
const message = useMessage()

interface DeleteEvent {
  quote_number: number
}

const isDeleting = ref(true)
async function deleteQuote(quoteNumber: number) {
  isDeleting.value = true
  const deletedQuote = await useTrpc().quote.delete.mutate({
    quote_number: quoteNumber,
  })
  if (deletedQuote) {
    message.success('Quote deleted successfully')
    isDeleting.value = false
    await updateQuotes()
  } else {
    message.error(
      'Oops Something Went Wrong, Please Reload the page and try again'
    )
  }
}

function handleConfirm(event: DeleteEvent) {
  const d = dialog.warning({
    title: 'Confirm',
    content: 'Are you sure you want to delete this quote?',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      d.loading = isDeleting.value
      try {
        await deleteQuote(event.quote_number)
        d.loading = isDeleting.value
      } catch (error) {
        message.error('Failed to delete quote')
      }
    },
    onNegativeClick: () => {
      message.error('Not Sure')
    },
  })
}
</script>

<template>
  <n-grid :cols="1">
    <n-grid-item style="padding: 16px">
      <n-space justify-between>
        <n-button bordered>Add New</n-button>
        <n-input
          v-model:value="searchInput"
          clearable
          placeholder="Search"
          @update:value="filterSearch"
        />
      </n-space>
    </n-grid-item>
  </n-grid>

  <n-data-table
    :row-key="rowKey"
    striped
    @update:checked-row-keys="handleCheck"
    :max-height="700"
    ref="refTable"
    remote
    :loading="isLoading"
    :columns="columns"
    :data="filteredData"
    virtual-scroll
    :scroll-x="1800"
    size="small"
  />
</template>
