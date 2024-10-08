<script setup lang="ts">
import {
  isBefore,
  isAfter,
  endOfDay,
  startOfDay,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  getUnixTime,
} from 'date-fns'
import { ComputedRef, Ref } from 'vue'
// import { ReturnedQuote } from '~/schema/QuoteFormSchema'
import { computed } from '#imports'
import { useStorage } from '@vueuse/core'
//
// interface Props {
//   quotes: ReturnedQuote[]
//   pending: boolean
// }
//
//
//
// const props = defineProps<Props>()
//
// const pickedQuotes = computed(() => {
//   return props.quotes
// })

const defaults = {}
const pickedQuotes = useStorage('quotes', defaults)

const startOfWeekTimestamp = getUnixTime(startOfWeek(new Date()))
const endOfWeekTimestamp = getUnixTime(endOfWeek(new Date()))
const range: Ref<[number, number]> = ref([
  startOfWeekTimestamp * 1000,
  endOfWeekTimestamp * 1000,
])

const startTimestamp: ComputedRef<Date | null> = computed(() => {
  return range.value ? startOfDay(new Date(range.value[0])) : null
})

const endTimestamp: ComputedRef<Date | null> = computed(() => {
  return range.value ? endOfDay(new Date(range.value[1])) : null
})

const startDate = computed(() => {
  return startTimestamp.value ? new Date(startTimestamp.value) : null
})

const endDate = computed(() => {
  return endTimestamp.value ? new Date(endTimestamp.value) : null
})

const filteredQuotes = computed(() => {
  if (!startDate.value || !endDate.value) {
    return []
  }
  return pickedQuotes.filter((quote: any) => {
    let quoteDate = quote.created_at
    return (
      (isAfter(quoteDate, startDate.value!) ||
        isSameDay(quoteDate, startDate.value!)) &&
      (isBefore(quoteDate, endDate.value!) ||
        isSameDay(quoteDate, endDate.value!))
    )
  })
})

const totalQuotes = computed(() => {
  return (
    filteredQuotes.value.reduce(
      (total: number, obj: any) => total + obj.quote_total,
      0
    ) || 0
  ).toFixed(2)
})

const totalQuotesFormatted = computed(() => {
  const num = parseFloat(totalQuotes.value)
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
})

const itemCount = computed(() => {
  return filteredQuotes.value.length || 0
})

const todayItemCount = computed(() => {
  return (
    filteredQuotes.value.filter((quote: any) => {
      let quoteDate = quote.created_at
      return isToday(quoteDate)
    }).length || 0
  )
})

const averageQuote = computed(() => {
  if (itemCount.value > 0) {
    return (parseFloat(totalQuotes.value) / itemCount.value).toLocaleString(
      'en-CA',
      { style: 'currency', currency: 'CAD' }
    )
  } else {
    return (0).toFixed(2)
  }
})
</script>

<template>
  <n-spin :show="pending">
    <n-grid :cols="1">
      <n-grid-item style="padding: 0 16px 16px">
        <n-space justify-between>
          <n-date-picker
            v-model:value="range"
            type="daterange"
            clearable
            :default-value="range"
            format="PP"
          />
        </n-space>
      </n-grid-item>
    </n-grid>

    <n-grid :cols="4" :x-gap="12">
      <n-gi>
        <n-card>
          <n-statistic tabular-nums label="Today's Quotes">
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="todayItemCount"
              :active="false"
            />
          </n-statistic>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card>
          <n-statistic label="Total Quotes This Week" :value="itemCount" />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card>
          <n-statistic
            label="Total Quotes Value"
            :value="totalQuotesFormatted"
          />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card>
          <n-statistic label="Average Amount" :value="averageQuote" />
        </n-card>
      </n-gi>
    </n-grid>
  </n-spin>
</template>
