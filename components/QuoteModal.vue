<script setup lang="ts">
import { watch, ref, computed } from '#imports'
import { useClipboard } from '@vueuse/core'

interface Props {
  modelValue: boolean
  content: string
  title: string
}

const props = defineProps<Props>()

const formattedContent = computed(() => props.content.replace(/\n/g, '<br>'))
const clipboardContent = computed(() =>
  formattedContent.value.replace(/<br>/g, '\n')
)
const { copy, copied } = useClipboard()
const visible = ref(props.modelValue)
const copyToClipboard = () => {
  copy(clipboardContent.value)
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
      <p v-html="formattedContent"></p>
      <template #footer></template>
    </n-card>
  </n-modal>
</template>
