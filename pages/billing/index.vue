<script lang="ts" setup>
import { AgingReport } from '~/composables/fasttrak-api/schemas/AgingReportSchema'
import { Ref } from 'vue'

definePageMeta({
  name: 'Billing Overview',
  layout: 'default',
  path: '/billing',
})
const agingReport: Ref<AgingReport | null> = ref(null)
const {
  data: response,
  pending,
  error,
  refresh,
} = useFetch('/api/billing', {
  method: 'POST',
})
agingReport.value = response.value as AgingReport
</script>

<template>
  <n-layout-content>
    <n-card>
      <pre class="text-white">{{ agingReport }}</pre>
    </n-card>
  </n-layout-content>
</template>

<style scoped></style>
