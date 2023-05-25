<script setup lang="ts">
import { useMessage, useLoadingBar } from 'naive-ui'
import VueTelInput from 'vue-tel-input'
import { ref } from '#imports'
import type { FormValue } from '~/utils/formUtils'
import type { Place } from '~/schema/placeSchema'
import type { ComputedRef, Ref, WatchCallback } from 'vue'
import type { FormInst, FormRules, SelectOption } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const loading: Ref<boolean> = ref(false)
const message = useMessage()
const loadingBar = useLoadingBar()

const { data: vehicle } = await useTrpc().vehicle.get.useQuery()
const { data: service } = await useTrpc().service.get.useQuery()
const { data: lineItem } = await useTrpc().lineItem.get.useQuery()
const { data: salesTax } = await useTrpc().salesTax.get.useQuery()

const vehicleOptions: ComputedRef<SelectOption[] | null> = computed(() => {
  return computeVehicleOptions(vehicle.value)
})
const serviceOptions = computed(() => {
  return computeServiceOptions(service.value)
})
const hoursOptions = computed(() => {
  return computeHoursOptions()
})

const route = useRoute()
const gtmValues = route.query

//@ts-expect-error
const formValue: Ref<FormValue> = ref({
  id: user_id.value,
  first_name: '',
  last_name: '',
  email_address: '',
  phone_number: '',
  conversion: {
    ...gtmValues,
  },
  origin: {} as Place,
  destination: {} as Place,
  pickup_date: null,
  pickup_time: null,
  return_date: null,
  return_time: null,
  selected_hours: null,
  selected_passengers: null,
  vehicle_number: null,
  service_number: null,
  is_round_trip: false,
  is_hourly: false,
  vehicle: null,
  service: null,
  line_items: lineItem,
  sales_tax: salesTax,
})
formValue.value.service = computed(() => {
  return getServiceTypeByNumber(service.value, formValue.value.service_number!)
})
formValue.value.vehicle = computed(() => {
  return getVehicleTypeByNumber(vehicle.value, formValue.value.vehicle_number!)
})

const maxPassengers = computed(() => {
  //@ts-ignore
  const vehicleType = vehicleOptions.value?.find(
    (type: SelectOption) =>
      type.value === (formValue.value.vehicle_number as number)
  )
  return vehicleType ? vehicleType.max_passengers : 3
})

const passengerOptions = computed(() => {
  return computePassengerOptions(maxPassengers?.value as number)
})

watch(
  () => formValue.value.vehicle_number,
  () => {
    formValue.value.selected_passengers = null
  }
)
const isDisabled = ref(true)
watch(
  () => formValue.value.service,
  () => {
    //@ts-ignore
    if (formValue.value.service?.is_hourly) {
      isDisabled.value = false
    } else {
      isDisabled.value = true
      formValue.value.selected_hours = null
    }
  }
)

const rules: FormRules = {
  pickup_date: {
    type: 'string',
    required: true,
    message: 'Please enter a pickup date',
    trigger: ['blur'],
  },
  pickup_time: {
    type: 'string',
    required: true,
    message: 'Please enter a pickup time',
    trigger: ['blur'],
  },
  return_date: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off date',
    trigger: ['blur'],
  },
  return_time: {
    type: 'number',
    required: false,
    message: 'Please enter a drop off time',
    trigger: ['blur'],
  },
  selected_hours: {
    type: 'number',
    required: false,
    message: 'Please enter in the amount of hours',
    trigger: ['blur', 'change'],
  },
  selected_passengers: {
    type: 'number',
    message: 'Passengers is required',
    trigger: ['blur', 'change'],
    required: true,
  },
  vehicle_number: {
    type: 'number',
    trigger: ['blur', 'change'],
    required: true,
    message: 'Please select a vehicle type',
  },
  service_number: {
    type: 'number',
    message: 'Please select a service type',
    trigger: ['blur', 'change'],
    required: true,
  },
  first_name: {
    required: true,
    message: 'First name is required',
    trigger: ['blur'],
  },
  last_name: {
    required: true,
    message: 'Last name is required',
    trigger: ['blur'],
  },
  email_address: {
    required: true,
    message: 'Please enter a valid email',
    trigger: ['blur'],
  },
  phone_number: {
    required: true,
    message: 'Phone number is required',
    trigger: ['blur'],
  },
}

const inputOptions = ref({
  id: 'phone_number',
  showDialCode: true,
  name: 'phone_number',
  type: 'tel',
  ariaDescribedby: 'name',
  ariaLabeledBy: 'placeholder',
  placeholder: 'Enter Phone Number...',
})
const dropdownOptions = ref({
  showDialCodeInSelection: false,
  showFlags: true,
  showSearchBox: false,
  showDialCodeInList: true,
})

const handleFormValueChange: WatchCallback<
  [typeof formValue.value.origin, typeof formValue.value.destination]
> = ([origin, destination]) => {
  if (!origin || !destination) {
    return
  }

  const isOriginAirport = isAirport(origin)
  const isDestinationAirport = isAirport(destination)
  const fromAirportServiceType = 3
  const toAirportServiceType = 2

  if (isOriginAirport) {
    formValue.value.service_number = fromAirportServiceType
  } else if (isDestinationAirport) {
    formValue.value.service_number = toAirportServiceType
  } else {
    formValue.value.service_number = null
  }
}

watch(
  [() => formValue.value.origin, () => formValue.value.destination],
  handleFormValueChange,
  {
    deep: true,
  }
)

const handleChangeOrigin = (evt: Place) => {
  formValue.value.origin = evt
}

const handleChangeDestination = (evt: Place) => {
  formValue.value.destination = evt
}

async function onSubmit() {
  try {
    loading.value = true
    const quoteData = await useTrpc().quote.postQuote.mutate(formValue.value)
  } catch (e) {
    setTimeout(() => {
      console.log('error', e)
    }, 500)
  } finally {
    loading.value = false
    loadingBar.finish()
  }
}

async function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  try {
    const errors = await formRef.value?.validate()
    if (errors) {
      console.log(errors)
      message.error('Please correct the errors on the form')
    } else {
      loadingBar.start()
      await onSubmit()
      message.success(
        'You will receive a copy of the quote to the email address provided'
      )
    }
  } catch (error) {
    console.error('Error during form validation:', error)
    message.error('An error occurred. Please try again.')
  } finally {
    loadingBar.finish()
  }
}

function disablePreviousDate(ts: number) {
  return ts < new Date().getTime() - 24 * 60 * 60 * 1000
}
</script>

<template>
  <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            id="quote_form"
          >
            <n-grid :x-gap="12" :cols="4" item-responsive>
              <n-form-item-gi
                :show-label="false"
                label="Pickup Location"
                :span="4"
                path="origin"
              >
                <InputPlacesAutocompleteDark
                  @change="handleChangeOrigin"
                  name="origin"
                  placeholder="Enter Pickup Location...."
                />
              </n-form-item-gi>

              <n-form-item-gi
                :show-label="false"
                :span="4"
                label="Drop-off Location"
                path="destination"
              >
                <InputPlacesAutocompleteDark
                  name="destination"
                  @change="handleChangeDestination"
                  placeholder="Enter Drop-off Location...."
                />
              </n-form-item-gi>
            </n-grid>
            <n-grid :cols="2" item-responsive :x-gap="12">
              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Service Type"
                path="service_number"
              >
                <n-select
                  v-model:value="formValue.service_number as number"
                  :options="serviceOptions as SelectOption[]"
                  placeholder="Select Service Type..."
                  :input-props="{
                      id: 'service_type',
                    }"
                />
              </n-form-item-gi>

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Vehicle Type"
                path="vehicle_number"
              >
                <n-select
                  v-model:value="formValue.vehicle_number"
                  :options="vehicleOptions as SelectOption[]"
                  placeholder="Select Vehicle Type..."
                  :input-props="{
                      id: 'vehicle_type',
                    }"
                />
              </n-form-item-gi>

              

              <n-form-item-gi
                span="0:2 500:1"
                :show-label="false"
                label="Hours"
                path="selected_hours"
              >
                <n-select
                  v-model:value="formValue.selected_hours"
                  :options="hoursOptions"
                  placeholder="For Hourly Service..."
                  :disabled="isDisabled"
                  :input-props="{
                      id: 'hours',
                    }"
                />
              </n-form-item-gi>

              
            </n-grid>
            <n-button
              style="
                width: 100%;
                text-transform: uppercase;
                background-color: #b91c1c;
              "
              :loading="loading"
              @click="handleValidateButtonClick"
              size="large"
              color="#b91c1c"
              >Get Prices & Availability</n-button
            >
          </n-form>
</template>
