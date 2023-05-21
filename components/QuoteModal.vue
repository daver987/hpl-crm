<template>
  <n-modal v-model:show="visible">
    <n-card
      style="width: 600px"
      title="Quote Reply Generator"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <p v-if="pending" style="text-align: center">
        <n-spin size="large">
          Generating your email follow-up message. Please wait...
        </n-spin>
      </p>
      <p v-else v-html="content"></p>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
  pending: {
    type: Boolean,
    default: false,
  },
})

const visible = ref(props.modelValue)

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
