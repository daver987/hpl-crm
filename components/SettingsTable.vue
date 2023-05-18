<script lang="ts" setup>
import { ref } from '#imports'
import { NTag, NButton, useMessage, useDialog } from 'naive-ui'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import type { Vehicle } from '~/schema/prismaSchemas'
import type { Ref } from 'vue'


type RowData = Vehicle

const refTable = ref(null)
const dialog = useDialog()
const message = useMessage()

const {
  data: vehicleData,
  isLoading: loading,
  refetch: refetchVehicleData,
} = useQuery({
  queryKey: ['vehicles'],
  queryFn: () => useTrpc().vehicle.get.query()
})
const vehicles: ComputedRef<Vehicle[]> = computed(() => vehicleData.value as Vehicle[])

const rowKey = (row: RowData) => row.id
const checkedRowKeysRef = ref<DataTableRowKey[]>([])

function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
  console.log('Selected Row', checkedRowKeysRef)
}

// const deleteCustomer = (stripeCustomerId: string) => {
//   const d = dialog.success({
//     title: 'Delete Customer',
//     content: 'Are you sure you want to delete the customer?',
//     positiveText: 'Confirm',
//     onPositiveClick: async () => {
//       d.loading = true
//       const deleted = await useTrpc().stripeCustomers.delete.mutate({
//         stripe_customer_id: stripeCustomerId,
//       })
//       if (deleted.deleted) {
//         message.info(`The Customer was successfully Deleted`)
//         await refetchStripeCustomers()
//         d.loading = false
//       } else {
//         message.error(
//           `Oops, something went wrong reload the page and try again`
//         )
//       }
//     },
//   })
// }

// const updateCustomer = async (id: string, options: CustomerData) => {
//   const updatedCustomer = await useTrpc().stripeCustomers.update.mutate({
//     id,
//     options,
//   })
//   console.log('Customer Updated', updatedCustomer)
// }

const updateVehicle = async (input: any, row: RowData) => {
  await useTrpc().vehicle.update.mutate({
    id: row.id,
    ...input
  })
}
const inputValue = ref()
const data: Ref<Vehicle[]> = ref(vehicleData.value as Vehicle[])
const showDrawer = ref(false)
const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
};

const createColumns = (showDrawer: Ref<boolean>): DataTableColumns<RowData> => [
  {
    key: 'vehicle_name',
    title: 'Vehicle Label',
    render(row) {
      return `${row.label}`
    },
    width: 175,
  },
  {
    key: 'per_km',
    title: 'Per Km',
    render(row) {
      return `${row.per_km} Per km`
    },
  },
  {
    key: 'per_hour',
    title: 'Per Hour',
    render(row) {
      return `$${row.per_hour} Per Hour`
    },
  },
  {
    key: 'min_km',
    title: 'Min Distance',
    render(row) {
      return `${row.min_distance} km`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'min_rate',
    title: 'Min Rate',
    render(row) {
      return `$${row.min_rate}`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'max_passengers',
    title: 'Max Passengers',
    render(row) {
      return `${row.max_passengers} Passengers`
    },
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'max_luggage',
    title: 'Max Luggage',
    render(row) {
      return `${row.max_luggage} Luggage`
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
          onClick: () => {
            showDrawer.value = !showDrawer.value;
            console.log('Open Drawer', showDrawer.value);
          }
        },
        { default: () => 'Update' }
      )
    },
  }
]
const columns = createColumns(showDrawer);

</script>

<template>
  <SettingsVehicleDrawer 
  :show="showDrawer" 
  @update:show="showDrawer = $event"/>
  <n-data-table
    size="small"
    :max-height="685"
    ref="refTable"
    remote
    :loading="loading"
    :columns="columns"
    :data="vehicles"
    :row-key="rowKey"
  />
</template>
