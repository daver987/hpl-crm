<script setup lang="ts">
import { watch, ref, computed } from '#imports'
import { useClipboard } from '@vueuse/core'

interface Props {
  modelValue: boolean
  quoteNumber: string
  firstName?: string
  lastName?: string
  title: string
  origin?: string | null
  destination?: string | null
  flight?: string | null
  price: string
  isBooked: boolean
  pickupDateTime: string
  travelTime: string
  travelDistance: string
  tripNotes: string
  vehicleLabel: string
  serviceLabel: string
}

const props = defineProps<Props>()
const formattedContent = computed(() => props.firstName)
const clipboardContent = computed(() => formattedContent.value)

const { copy, copied } = useClipboard()
const visible = ref(props.modelValue)
const copyToClipboard = () => {
  copy(JSON.stringify(clipboardContent.value))
}

watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal
  }
)
const emit = defineEmits(['update:modelValue'])

watch(visible, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('update:modelValue', newVal)
  }
})
</script>

<template>
  <n-modal v-model:show="visible">
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      :segmented="{
          content: true,
          footer: 'soft',
        }"
    >
      <template #header-extra>
        <n-button @click="copyToClipboard" text
          ><span v-if="!copied">Copy</span> <span v-else>Copied!</span>
        </n-button>
      </template>
      <h2>{{ firstName }} {{ lastName }}</h2>
      <p><strong>Pickup Date: </strong>{{ pickupDateTime }}</p>
      <p><strong>Pickup Location: </strong>{{ origin }}</p>
      <p><strong>Drop Off Location: </strong>{{ destination }}</p>
      <p><strong>Vehicle Type: </strong>{{ vehicleLabel }}</p>
      <p><strong>Service Type: </strong>{{ serviceLabel }}</p>
      <p><strong>Trip Time:</strong> {{ travelTime }}</p>
      <p> <strong>Trip Distance:</strong> {{ travelDistance }}</p>
      <p><strong>Flight: </strong>{{ flight }}</p>
      <p><strong>Price: </strong>$ {{ price }}</p>

      <template #footer>
        Trip Notes: {{ tripNotes }}
      </template>
      <template #action>
        <n-space justify="space-between">
          <n-button type="primary">Edit</n-button>
          <n-button typeof="info">Book</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
