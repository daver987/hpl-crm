<script setup lang="ts">
// import { AgGridVue } from 'ag-grid-vue3'
// import type { GridOptions, ColDef } from 'ag-grid-community'
// import { reactive, ref } from '#imports'
// import { format } from 'date-fns'
// import { Ref } from 'vue'
// import 'ag-grid-enterprise'

// const gridApi = ref(null) // Optional - for accessing Grid's API

// async function getQuote() {
//   return await useTrpc().quote.getAll.query()
// }
// const {
//   data: quoteData,
//   suspense,
//   isLoading,
//   refetch: updateQuotes,
// } = useQuery({
//   queryKey: ['contacts'],
//   queryFn: getQuote,
// })
// onServerPrefetch(async () => {
//   await suspense()
// })

// type ArrayElementType<T extends ReadonlyArray<any> | undefined> =
//   T extends ReadonlyArray<infer ElementType> ? ElementType : never

// type RowData = ArrayElementType<typeof quoteData.value>

// // Obtain API from grid's onGridReady event
// const onGridReady = (params) => {
//   gridApi.value = params.api
// }

// const gridOptions = {}

// const rowData: Ref<RowData> | Ref<null> | undefined = ref(null) // Set rowData to Array of Objects, one Object per Row
// rowData.value = quoteData?.value!

// // Each Column Definition results in one Column.
// const columnDefs = reactive({
//   value: [
//     {
//       headerName: 'Quote',
//       field: 'quote_number',
//       filter: 'agNumberColumnFilter',
//       sort: 'desc',
//       maxWidth: 120,
//       resizeable: false,
//       valueFormatter: (params: Ref<RowData>): string =>
//         'HPL-' + `${params.value.quote_number}`,
//       cellStyle: { color: 'red', 'font-weight': 'bold' },
//     },
//     {
//       field: 'created_at',
//       headerName: 'Quote Number',
//     },
//     {
//       field: 'user.first_name',
//       headerName: 'Full Name',
//       valueFormatter: (params: Ref<RowData>): string => {
//         return `${params.value.user.first_name} ${params.value.user.last_name}`
//       },
//     },
//     {
//       field: 'user.last_name',
//       headerName: 'Last Name',
//     },
//     {
//       field: 'trips.[0].locations.[0]?.full_name',
//       valueFormatter: (params: Ref<RowData>): string | null => {
//         return params.value.trips[0].locations[0].full_name
//       },
//       headerName: 'Pickup Location',
//     },
//   ],
// })

// // DefaultColDef sets props common to all Columns
// const defaultColDef = {
//   sortable: true,
//   filter: true,
//   flex: 1,
// }
// const gridContainer = ref(null)

// // function setGridHeight() {
// //   const headerHeight = document.querySelector('.n-layout-header').offsetHeight
// //   const windowHeight = window.innerHeight
// //   const gridHeight = windowHeight - headerHeight
// //
// //   gridContainer.value.AgGridVue.style.height = `${gridHeight}px`
// // }

// // Example load data from server
// // onMounted(() => {
// //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
// //     .then((result) => result.json())
// //     .then((remoteRowData) => (rowData.value = remoteRowData))
// // })

// // const cellWasClicked = (event) => {
// //   // Example of consuming Grid Event
// //   console.log('cell was clicked', event)
// // }
// // const deselectRows = () => {
// //   gridApi.value?.deselectAll()
// // }
</script>

<template>
  <!-- <ClientOnly> -->
  <n-layout-content>
    <n-p>Invoicing</n-p>
  </n-layout-content>
  <!-- <ag-grid-vue
      ref="gridContainer"
      class="ag-theme-alpine-dark"
      :columnDefs="columnDefs.value"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      style="height: 700px"
      animateRows="true"
      @grid-ready="onGridReady"
      pagination
    /> -->
  <!-- </ClientOnly> -->
</template>
