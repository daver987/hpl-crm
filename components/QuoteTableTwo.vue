<script lang="ts" setup>
import {
  checkForCustomer,
  h,
  parseAddress,
  ref,
  combineDateAndTime,
} from '#imports'
import { format } from 'date-fns'
import type { DataTableRowKey } from 'naive-ui'
import { NButton, NP, NTag, useDialog } from 'naive-ui'

const refTable = ref(null)

const {
  data: quoteData,
  isLoading: isLoading,
  refetch: updateQuotes,
} = useQuery({
  queryKey: ['quotes'],
  queryFn: async () => await useTrpc().quote.getMany.query(),
})

// const { data: vehicleTypes } =
//   await useTrpc().fasttrak.getVehicleTypes.useQuery()
//
// console.log('vehicle Types:', vehicleTypes.value)

type ArrayElementType<T extends ReadonlyArray<any> | null | undefined> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

type RowData = ArrayElementType<typeof quoteData.value>

const quotes = computed(() => quoteData.value)
const rowKey = (row: RowData) => row.quote_number
const checkedRowKeysRef = ref<DataTableRowKey[]>([])

function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
  console.log('Selected Row', checkedRowKeysRef)
}

const createColumns = (): RowData[] => [
  {
    key: 'created_at',
    title: 'Submitted',
    render(row: RowData) {
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
    render(row: RowData) {
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
    render(row: RowData) {
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
    render(row: RowData) {
      return `${row.trips[0].pickup_date}, ${row.trips[0].pickup_time}`
    },
    width: 250,
  },

  {
    key: 'email_address',
    title: 'Email',
    render(row: RowData) {
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
    render(row: RowData) {
      return h(
        'a',
        {
          href: `tel:${row.user.phone_number}`,
          style: { color: '#93c5fd' },
        },
        row.user.phone_number
      )
    },
    width: 175,
  },

  {
    key: 'origin',
    title: 'Pickup',
    render(row: RowData) {
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
    render(row: RowData) {
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
    render(row: RowData) {
      return row.service.label
    },
    width: 150,
  },
  {
    key: 'vehicle_label',
    title: 'Vehicle Type',
    render(row: RowData) {
      return row.vehicle.label
    },
    width: 135,
  },
  {
    key: 'base_rate',
    title: 'Base Rate',
    render(row: RowData) {
      return h(
        NP,
        {
          strong: true,
        },
        { default: () => `$${row.trips[0].price?.line_items_list[0].total}` }
      )
    },

    width: 100,
  },
  {
    key: 'quote_total',
    title: 'Price',
    render(row: RowData) {
      return h(
        NP,
        {
          style: {
            color: '#986F0C',
          },
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
    render(row: RowData) {
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
    render(row: RowData) {
      return h(
        NButton,
        {
          size: 'small',
          color: 'green',
          textColor: '#fff',
          onClick: () => handleConfirmBook(row),
          strong: true,
        },
        { default: () => 'Book' }
      )
    },
    width: 100,
  },
  {
    key: 'delete',
    title: 'Remove',
    render(row: RowData) {
      return h(
        NButton,
        {
          size: 'small',
          color: '#b91c1c',
          textColor: '#fff',
          onClick: () => handleConfirmDelete(row),
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

const filterSearch = () => {}
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

function handleConfirmDelete(event: DeleteEvent) {
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

const isBooking = ref(true)

function handleConfirmBook(event: RowData) {
  console.log('Booking event:', event)
  const d = dialog.warning({
    title: 'Confirm Booking',
    content: 'Are you sure you want to book this order?',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      d.loading = isBooking.value
      try {
        await handleBook(event)
        d.loading = isBooking.value
      } catch (error) {
        message.error('Failed to book order')
      }
    },
    onNegativeClick: () => {
      message.error('Wow That was Close')
    },
  })
}

// function combineDateAndTime(dateString: string, timeString: string): string {
//   // Remove ordinal suffix from the date string using a regex
//   const formattedDateString = dateString.replace(/(st|nd|rd|th)/g, '')
//
//   // Combine the date and time strings
//   const combinedDateTime = `${formattedDateString} ${timeString}`
//
//   // Create a Date object
//   const dateTimeObject = new Date(combinedDateTime)
//
//   // Convert the Date object to an ISO 8601 date-time string
//   return dateTimeObject.toISOString()
// }

function getTravelType(tripType: string) {
  switch (tripType) {
    case 'To Airport':
      return 'Departure'
    case 'From Airport':
      return 'Arrival'
    case 'Hourly As Directed':
    case 'Point to Point':
      return 'Ground'
    default:
      return 'None'
  }
}

function getTripCategory(tripType: string) {
  switch (tripType) {
    case 'To Airport':
      return 'Departure'
    case 'From Airport':
      return 'Arrivals'
    default:
      return 'Transfer'
  }
}

type LineItemsList = {
  total: number
  label: string
  tax: number
}
async function handleBook(event: RowData) {
  const customerSummary = ref({})
  const user = event.user
  const vehicle = event.vehicle
  const service = event.service
  const trips = event.trips
  const fromLocation = trips[0].locations[0]
  const toLocation = trips[0].locations[1]
  const trip = trips[0]
  const lineItemsList = trip.price?.line_items_list as LineItemsList[]
  const travelType = getTravelType(service.label)
  const travelCategory = getTripCategory(service.label)
  const toAddressParsed = parseAddress(toLocation.formatted_address)
  const fromAddressParsed = parseAddress(fromLocation.formatted_address)

  const customerId = await checkForCustomer(event.user.email_address)
  if (customerId === null) {
    customerSummary.value = {
      firstName: event.user.first_name,
      lastName: event.user.last_name,
      emailAddress: event.user.email_address,
      phoneNumber1: event.user.phone_number,
    }
  } else {
    customerSummary.value = {
      customerId: customerId,
    }
  }

  const reservationDetails = {
    vehicleId: 0,
    employeeId: 0,
    greeterId: 0,
    customerId: customerId,
    vehicleTypeId: vehicle.fasttrak_id?.toString(),
    reservationGroupId: 0,
    companyId: 1,
    corporateProfileId: 0,
    pricingId: 1,
    reservationStatus: 'Booked',
    travelType: travelType,
    reservationPhoneNumber: user.phone_number,
    referencePO: `HPL-${event.quote_number.toString()}`,
    bookingSource: 'Google Ads',
    bookingCategory: 'Personal',
    tripCategory: travelCategory,
    tripType: service.label,
    orderedBy: user.full_name,
    orderedByPhone: user.phone_number,
    driverInTime: null,
    driverSpotTime: null,
    enRouteTime: null,
    onLocationTime: null,
    actualPickupTime: null,
    dropoffTime: null,
    noShowTime: null,
    cancelTime: null,
    returnTime: null,
    billingStartTime: null,
    billingEndTime: null,
    actualHours: 0,
    estimatedHours: 1,
    beginMileage: 0,
    endMileage: 0,
    driverNotes: '',
    driverDispatchStatus: '',
    dispatchNotes: '',
    affiliateNotes: '',
    tripPreferences: '',
    scheduledPickupTime: combineDateAndTime(
      trip.pickup_date!,
      trip.pickup_time!
    ),
    estimatedEndTime: '',
    tripNotes: trip.notes,
    fromLocation: {
      latitude: fromLocation.lat,
      longitude: fromLocation.lng,
      address: {
        street1: toAddressParsed.street1,
        street2: toAddressParsed.street2,
        city: toAddressParsed.city,
        region: toAddressParsed.region,
        postalCode: toAddressParsed.postalCode,
        country: toAddressParsed.country,
        displayAddress: toAddressParsed.displayAddress,
        geoLookupAddress: '',
        cityRegionPostalCode: '',
      },
      additionalInformation: '',
      summaryAddress: '',
      geoLookupAddress: '',
      displayAddress: toAddressParsed.displayAddress,
    },
    toLocation: {
      latitude: toLocation.lat,
      longitude: toLocation.lng,
      address: {
        street1: fromAddressParsed.street1,
        street2: fromAddressParsed.street2,
        city: fromAddressParsed.city,
        region: fromAddressParsed.region,
        postalCode: fromAddressParsed.postalCode,
        country: fromAddressParsed.country,
        displayAddress: fromAddressParsed.displayAddress,
        geoLookupAddress: '',
        cityRegionPostalCode: '',
      },
      displayAddress: fromAddressParsed.displayAddress,
      additionalInformation: '',
      summaryAddress: fromAddressParsed.displayAddress,
      geoLookupAddress: '',
    },
    passengerCount: event.selected_passengers,
    luggageCount: trips[0].large_luggage,
    reservationOrigin: 'FASTTRAK',
    totalCharges: event.quote_total,
    primaryPassenger: {
      name: user.full_name,
      phoneNumber: user.phone_number,
      emailAddress: user.email_address,
      doEnablePassengerEmail: false,
      doEnablePassengerSMS: true,
    },
    numAdditionalStops: 0,
    numSupportDocuments: 0,
    affiliatePay: 0,
    isInBilling: false,
    isExcludedFromBilling: false,
    isFinalized: false,
    isInvoiced: false,
    isDriverPayProcessed: false,
    isDriverPayReadyForProcessing: false,
    isChangedDayOfDispatch: false,
    isRecurring: false,
    hasReservationNotes: false,
    hasIncidents: false,
    isCharter: false,
    isCharterLeg: false,
    isVip: false,
    isSpecialHandling: false,
    isFarmIn: false,
    isFarmOut: false,
    charterReservationId: 0,
    charterMoveId: 0,
    charterMoveName: '',
    charterLegType: '',
    collectionMethod: 'Billing_Account',
    collectionType: 'Billing',
    creditCardId: 0,
    segmentId: '',
    alternateContractId: 0,
    doInvoiceCustomerDirectly: false,
    totalDeposits: 0,
    creditCardAuthorizationAmount: 0,
    companySummary: {
      companyId: 1,
      companyName: 'High Park Livery',
    },
    corporateProfileSummary: {
      corporateProfileId: 0,
      companyName: '',
    },
    customerContactId: 0,
    corporateProfileContactId: 0,
    cancelledBy: '',
    pricingInformation: {
      pricingId: 0,
      vehicleTypeId: vehicle.fasttrak_id,
      isFlatRate: true,
      baseRate: {
        minimum: 0,
        estimated: lineItemsList[1].total,
        quantity: 1,
        rate: lineItemsList[0].total,
        total: lineItemsList[0].total,
        name: lineItemsList[0].label,
        pricingItemType: 'Base_Charges',
      },
      additionalCharge1: {
        minimum: 0,
        estimated: lineItemsList[1].total,
        quantity: 1,
        rate: lineItemsList[1].total,
        total: lineItemsList[1].total,
        name: lineItemsList[1].label,
        pricingItemType: 'Base_Additional_Charges_1',
      },
      additionalCharge2: {
        minimum: 0,
        estimated: lineItemsList[2].total,
        quantity: 1,
        rate: lineItemsList[2].total,
        total: lineItemsList[2].total,
        name: lineItemsList[2].label,
        pricingItemType: 'Base_Additional_Charges_2',
      },
    },
    // taxRateList: [
    //   {
    //     taxRateId: 1,
    //   },
    // ],
    totalCharge: event.quote_total,
    confirmedBy: user.full_name,
  }
  console.log('Reservation Details:', reservationDetails)

  const bookingResult = await useTrpc().reservations.add.mutate({
    reservationDetail: reservationDetails,
    customerSummary: customerSummary.value,
  })
  console.log('Booked Result', bookingResult)
  if (bookingResult.status === 'SUCCESS') {
    message.success('Quote booked successfully')
  } else {
    message.error(
      'Oops Something Went Wrong, Please Reload the page and try again'
    )
  }
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
