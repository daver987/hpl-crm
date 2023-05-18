<script setup lang="ts">
interface FormValue {
  id: string
  label?: string
  per_km?: number | null
  min_distance?: number | null
  per_hour?: number | null
  min_rate?: number | null
  max_passengers?: number | null
  max_luggage?: number | null
}

interface Props {
  show: boolean
  formValue: FormValue
}

const props = defineProps<Props>()

const emits = defineEmits(['update:show'])

const toggleDrawer = () => {
  emits('update:show', !props.show)
}
const formRef = ref(null)
const formValue = reactive({
  id: '',
  label: '',
  per_km: null,
  min_distance: null,
  per_hour: null,
  min_rate: null,
  max_passengers: null,
  max_luggage: null
})

const handleUpdate = () => {
  console.log('Updated')
}
</script>

<template>
  <n-drawer
    :show="props.show"
    :width="502"
    @update:show="emits('update:show', $event)"
  >
    <n-drawer-content
      title="Update Vehicle Data"
      closable
      @close="toggleDrawer"
    >
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        id="update_vehicle_form"
      >
        <n-form-item
          :show-label="true"
          label="Vehicle Type"
          path="label"
        >
          <n-input
            v-model:value="formValue.label"
            placeholder="Update Vehicle Type.."
            :input-props="{
                id: 'label',
                type: 'text',
              }"
          />
        </n-form-item>
        <n-grid x-gap="12" :cols="2">
        <n-form-item-gi
          :show-label="true"
          label="Price Per KM"
          path="per_km"
        >
          <n-input-number
            v-model:value="formValue.per_km"
            placeholder="Update Per KM.."
            :precision="2"
            :step="0.1"
            clearable
            :input-props="{
                id: 'per_km',
              }"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :show-label="true"
          label="Minimum Distance"
          path="min_distance"
        >
          <n-input-number
            v-model:value="formValue.min_distance"
            placeholder="Update Min Distance.."
            clearable
            :input-props="{
                id: 'min_distance',
              }"
          />
        </n-form-item-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="2">
          <n-form-item-gi
          :show-label="true"
          label="Price Per Hour"
          path="per_hour"
        >
          <n-input-number
            v-model:value="formValue.per_hour"
            placeholder="Update Price Per Hour.."
            clearable
            :precision="2"
            :input-props="{
                id: 'per_hour',
              }"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :show-label="true"
          label="Minimum Rate"
          path="min_rate"
        >
          <n-input-number
            v-model:value="formValue.min_rate"
            placeholder="Update Min Rate.."
            clearable
            :precision="2"
            :step="0.1"
            :input-props="{
                id: 'min_rate',
              }"
          />
        </n-form-item-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="2">
          <n-form-item-gi
          :show-label="true"
          label="Max Passengers"
          path="max_passengers"
        >
          <n-input-number
            clearable
            v-model:value="formValue.max_passengers"
            placeholder="Update Max Passengers.."
            :input-props="{
                id: 'max_passengers',
              }"
          />
        </n-form-item-gi>
        <n-form-item-gi
          :show-label="true"
          label="Maximum Luggage"
          path="max_luggage"
        >
          <n-input-number
            clearable
            v-model:value="formValue.max_luggage"
            placeholder="Update Maximum Luggage.."
            :input-props="{
                id: 'max_luggage',
              }"
          />
        </n-form-item-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="2">
        <n-form-item-gi>
      <n-button @click="handleUpdate">
        Update Vehicle
      </n-button>
    </n-form-item-gi>
    <n-form-item-gi :show-label="true"
          label="Make Active"
          path="is_active">
      <n-space justify="center">
      <n-switch>
    <template #checked>
      Active
    </template>
    <template #unchecked>
      Inactive
    </template>
  </n-switch>
</n-space>
    </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>
