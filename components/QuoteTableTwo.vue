<script lang="ts" setup>
import {
  checkForCustomer,
  computed,
  constructPrompt,
  h,
  parseAddress,
  preparePromptData,
  ref,
} from '#imports'
import { combineDateAndTime } from '~/composables/fasttrak-api/utils/combineDateAndTime'
import { formatDistanceToNow } from 'date-fns'
import { z } from 'zod'
import { NButton, NP, NTag, useDialog } from 'naive-ui'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import type { Reservation } from '~/composables/fasttrak-api/schemas'
import type { Ref } from 'vue'

type ArrayElementType<T extends ReadonlyArray<any> | null | undefined> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

type RowData = ArrayElementType<typeof quoteData.value>

type DeleteEvent = {
  quote_number: number
}

type LineItemsList = {
  total: number
  label: string
  tax: number
}

const refTable = ref(null)
const searchInput = ref('')
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const isDeleting = ref(true)
const isBooking = ref(true)
const filterSearch = () => {}
const dialog = useDialog()
const message = useMessage()
const showModal = ref(false)
const quoteModalContent = ref('')

const {
  data: quoteData,
  isLoading: isLoading,
  refetch: updateQuotes,
} = useQuery({
  queryKey: ['quotes'],
  queryFn: async () => await useTrpc().quote.getMany.query(),
})

const quotes = computed(() => quoteData.value)
const rowKey = (row: RowData) => row.quote_number

function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
  console.log('Selected Row', checkedRowKeysRef)
}

async function handlePrompt(row: RowData) {
  const promptData = preparePromptData(row)
  const prompt = constructPrompt(promptData)

  quoteModalContent.value =
    'Generating your personalized message. Please wait...'
  showModal.value = true

  const response = await fetch('/api/email-followup', {
    method: 'POST',
    body: JSON.stringify(prompt),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.body) {
    console.error('ReadableStream not yet supported in this browser.')
    return
  }

  const { data } = useChatStream({
    stream: response.body,
    onChunk: (chunk) => {
      console.log('Received chunk:', chunk)
      quoteModalContent.value += chunk.data
    },
    onReady: () => {
      console.log('Stream complete')
    },
  })

  watchEffect(() => {
    if (data.value) {
      console.log('Data updated:', data.value)
      quoteModalContent.value = data.value
    }
  })
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    key: 'created_at',
    title: 'Submitted',
    render(row) {
      const timeDistance = formatDistanceToNow(new Date(row.created_at), {
        addSuffix: true,
      })
      return timeDistance.replace('about ', '')
    },
    width: 125,
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
    width: 175,
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
    width: 150,
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
    key: 'reply',
    title: 'Reply Email',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          color: 'purple',
          textColor: '#fff',
          onClick: () => handleQuoteEmailReply(row),
          strong: true,
        },
        { default: () => 'Reply' }
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
        { default: () => (row.is_booked ? 'Booked' : 'Quoted') }
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
    render(row) {
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

async function handleQuoteEmailReply(event: RowData) {
  const d = dialog.warning({
    title: 'Confirm Generate Reply Email',
    content: 'Are you sure you want to generate a reply email',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      try {
        await handlePrompt(event)
      } catch (error) {
        message.error('Failed to generate email')
      }
    },
    onNegativeClick: () => {
      message.error('Wow That was Close')
    },
  })
}

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

async function handleBook(event: RowData) {
  const customerSummary = ref({})
  const vehicleId: Ref<number> = ref(1)
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

  if (
    vehicle.fasttrak_id !== null &&
    [1, 2, 8, 9].includes(vehicle.fasttrak_id)
  ) {
    vehicleId.value = vehicle.fasttrak_id
  } else {
    vehicleId.value = 1
  }

  const TripTypeSchema = z
    .enum([
      'Point to Point',
      'To Airport',
      'From Airport',
      'Livery',
      'Hourly As Directed',
    ])
    .default('Point to Point')
    .transform((val) => (val === 'Hourly As Directed' ? 'Livery' : val))

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

  const gtaaFee = {
    pricingItemId: 259,
    isQuantifiable: false,
    isFixedPrice: true,
    applyToBaseCharge: false,
    applyToAdditional1Charge: false,
    applyToAdditional2Charge: false,
    selectedTaxRateId: 0,
    doPayToDriver: true,
    doPayToDriverOnlyContractor: false,
    driverPayPercentage: 100,
    isCustomerOverride: false,
    isCorporateOverride: false,
    quantity: 1,
    rate: 13.27,
    total: 13.27,
    name: 'GTAA Fee',
    pricingItemType: 'Fixed_Charge_Item',
  }

  let pricingInformation = {
    pricingId: 209,
    vehicleTypeId: vehicleId.value,
    pricingVehicleTypeZoneId: 0,
    isFlatRate: true,
    baseRate: {
      minimum: 1,
      estimated: 0,
      quantity: 1,
      rate: lineItemsList[0].total,
      name: 'Base/Hourly Charge',
      pricingItemType: 'Base_Charges',
    },
    additionalPricingItems: [
      {
        pricingItemId: 357,
        isQuantifiable: false,
        isFixedPrice: false,
        applyToBaseCharge: true,
        applyToAdditional1Charge: true,
        applyToAdditional2Charge: true,
        appliesToFixedItemList: [],
        appliesToAdditionalItemList: [],
        selectedTaxRateId: 0,
        doPayToDriver: true,
        doPayToDriverOnlyContractor: false,
        driverPayPercentage: 100,
        isCustomerOverride: false,
        isCorporateOverride: false,
        quantity: 1,
        rate: 8,
        name: 'Fuel Surcharge',
        pricingItemType: 'Variable_Fee_Item',
      },
      {
        pricingItemId: 366,
        isQuantifiable: false,
        isFixedPrice: false,
        applyToBaseCharge: true,
        applyToAdditional1Charge: true,
        applyToAdditional2Charge: true,
        appliesToFixedItemList: [],
        appliesToAdditionalItemList: [],
        selectedTaxRateId: 0,
        doPayToDriver: true,
        doPayToDriverOnlyContractor: false,
        driverPayPercentage: 100,
        isCustomerOverride: false,
        isCorporateOverride: false,
        quantity: 1,
        rate: 20,
        name: 'Gratuity',
        pricingItemType: 'Variable_Fee_Item',
      },
      {
        pricingItemId: 293,
        isQuantifiable: false,
        isFixedPrice: false,
        applyToBaseCharge: true,
        applyToAdditional1Charge: true,
        applyToAdditional2Charge: true,
        appliesToFixedItemList: [259],
        appliesToVariableItemList: [357],
        appliesToAdditionalItemList: [],
        appliesToZoneAdditionalChargeItemList: [],
        selectedTaxRateId: 295,
        doPayToDriver: true,
        doPayToDriverOnlyContractor: false,
        driverPayPercentage: 0,
        isCustomerOverride: false,
        isCorporateOverride: false,
        quantity: 1,
        rate: 13,
        name: 'HST',
        pricingItemType: 'Tax_Item',
      },
    ],
    taxRateList: [
      {
        taxRateId: 295,
        applicableToPricingItemId: 293,
        name: 'ON - HST-ON',
        rate: 13,
      },
    ],
    incrementalCharge: 0,
    minimumCharge: 1,
    minimumRateIncludedAsBase: false,
  }

  const buildPricing = computed(() => {
    if (lineItemsList.some((item) => item.label === 'Pearson Airport Toll')) {
      return {
        ...pricingInformation,
        additionalPricingItems: [
          ...pricingInformation.additionalPricingItems,
          gtaaFee,
        ],
      }
    } else {
      return pricingInformation
    }
  })

  const reservationDetails: Reservation = reactive({
    vehicleId: 0,
    employeeId: 0,
    greeterId: 0,
    customerId: customerId,
    vehicleTypeId: vehicleId.value,
    companyId: 1,
    pricingId: 209,
    reservationStatus: 'Booked',
    travelType: travelType,
    reservationPhoneNumber: user.phone_number,
    referencePO: `HPL-${event.quote_number.toString()}`,
    bookingSource: 'Google Ads',
    bookingCategory: 'Personal',
    tripCategory: travelCategory,
    tripType: TripTypeSchema.parse(service.label),
    orderedBy: user.full_name as string,
    orderedByPhone: user.phone_number,
    confirmedBy: user.full_name,
    estimatedHours: 1,
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
        street1: fromAddressParsed.street1,
        street2: fromAddressParsed.street2,
        city: fromAddressParsed.city,
        region: fromAddressParsed.region,
        postalCode: fromAddressParsed.postalCode,
        country: fromAddressParsed.country,
        displayAddress: fromLocation.full_name,
        geoLookupAddress: '',
        cityRegionPostalCode: '',
      },

      displayAddress: fromLocation.full_name,
    },
    toLocation: {
      latitude: toLocation.lat,
      longitude: toLocation.lng,
      address: {
        street1: toAddressParsed.street1,
        street2: toAddressParsed.street2,
        city: toAddressParsed.city,
        region: toAddressParsed.region,
        postalCode: toAddressParsed.postalCode,
        country: toAddressParsed.country,
        displayAddress: toLocation.full_name as string,
        geoLookupAddress: '',
        cityRegionPostalCode: '',
      },
      displayAddress: toLocation.full_name as string,
    },
    passengerCount: event.selected_passengers,
    luggageCount: trips[0].large_luggage!,
    reservationOrigin: 'FASTTRAK',
    primaryPassenger: {
      name: user.full_name,
      phoneNumber: user.phone_number,
      emailAddress: user.email_address,
      doEnablePassengerEmail: false,
      doEnablePassengerSMS: true,
    },
    numAdditionalStops: 0,
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
    collectionMethod: 'Billing_Account',
    collectionType: 'Billing',
    segmentId: '',
    doInvoiceCustomerDirectly: false,
    companySummary: {
      companyId: 1,
      companyName: 'High Park Livery',
    },
    corporateProfileSummary: {
      corporateProfileId: 0,
      companyName: '',
    },
    pricingInformation: buildPricing.value,
  })

  const { data: bookingResult, pending } = await useFetch('/api/reservation', {
    method: 'POST',
    body: {
      reservationDetail: reservationDetails,
      customerSummary: customerSummary.value,
    },
  })
  console.log('Booked Result', bookingResult.value)
  if (bookingResult.value?.status === 'SUCCESS') {
    message.success(
      `Quote booked successfully ${JSON.stringify(bookingResult.value)}`
    )
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
  <QuoteModal v-model="showModal" :content="quoteModalContent" />
</template>
