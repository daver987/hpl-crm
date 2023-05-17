<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
  middleware: ['auth'],
})
const today = ref(0)
const booked = ref(0)
const all = ref(0)
const lastSeven = ref(0)

const { data: countToday } = await useTrpc().quote.countToday.useQuery()
const { data: countBooked } = await useTrpc().quote.countBooked.useQuery()
const { data: countAll } = await useTrpc().quote.countAll.useQuery()
const { data: countLastSeven } =
  await useTrpc().quote.countLastSevenDays.useQuery()

if (typeof countToday.value === 'number') {
  today.value = countToday.value
}
if (typeof countBooked.value === 'number') {
  booked.value = countBooked.value
}
if (typeof countAll.value === 'number') {
  all.value = countAll.value
}
if (typeof countLastSeven.value === 'number') {
  lastSeven.value = countLastSeven.value
}

const { data: affiliates } = await useTrpc().drivers.getAffilates.useQuery()
console.log('affiliates', affiliates.value)
const { data: affiliatePay } = await useTrpc().drivers.getEmployeePay.mutate({
  affiliateId: 17475,
})
console.log('affiliatePay', affiliatePay)
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-col :span="4">
        <n-statistic label="Today's Quotes" :value="today" />
      </n-col>
      <n-col :span="4">
        <n-statistic label="Orders Booked" :value="booked" />
      </n-col>
      <n-col :span="4">
        <n-statistic label="Last 7 Days" :value="lastSeven" />
      </n-col>
      <n-col :span="4">
        <n-statistic label="All Quotes" :value="all" />
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="6">
        <!--       <pre>{{ affiliates }}</pre>-->
      </n-col>
      <n-col :span="6">
        <!--       <pre>{{ affiliatePay }}</pre>-->
      </n-col>
    </n-row>
  </n-layout-content>
</template>
