<script setup lang="ts">
import { useEcharts } from '~/composables/useEcharts'
import type { ECOption } from '~/composables/useEcharts'
import { format } from 'date-fns'
import { computed, ref } from '#imports'
import {
  QuoteReturnedPickedSchema,
  ReturnedQuote,
} from '~/schema/QuoteFormSchema'

interface Props {
  quotes: ReturnedQuote
}

const props = defineProps<Props>()

const pickedQuotes = computed(() => {
  return QuoteReturnedPickedSchema.array().parse(props.quotes)
})

const weeklyData = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
}

pickedQuotes.value.forEach((quote) => {
  const date = quote.created_at
  const dayOfWeek = format(date, 'EEEE')
  weeklyData[dayOfWeek] += 1
})

const options: Ref<ECOption> = ref({
  xAxis: {
    type: 'category',
    data: Object.keys(weeklyData),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: Object.values(weeklyData),
      type: 'bar',
    },
  ],
})

const { domRef } = useEcharts(options)
</script>
<template>
  <div ref="domRef" style="width: 600px; height: 400px"></div>
</template>
