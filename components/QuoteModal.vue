<script setup lang="ts">
import { watch, ref } from '#imports'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
})
const formattedContent = computed(() => props.content.replace(/\n/g, '<br>'))
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
      <p v-html="formattedContent"></p>
    </n-card>
  </n-modal>
</template>
