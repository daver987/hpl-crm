<script setup lang="ts">
definePageMeta({
  name: 'My Office',
  layout: 'default',
})

const { data: countToday } = await useTrpc().quote.countToday.useQuery()
const { data: countBooked } = await useTrpc().quote.countBooked.useQuery()
const { data: countAll } = await useTrpc().quote.countAll.useQuery()
const { data: countLastSeven } =
  await useTrpc().quote.countLastSevenDays.useQuery()
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-col :span="4">
        <n-statistic label="Today's Quotes" :value="countToday" />
        <!--        <p>{{ parsedAddress1 }}</p>-->
      </n-col>
      <n-col :span="4">
        <n-statistic label="Orders Booked" :value="countBooked" />
        <!--        <p>{{ parsedAddress2 }}</p>-->
      </n-col>
      <n-col :span="4">
        <n-statistic label="Active Quotes" :value="countAll" />
        <!--        <p>{{ parsedAddress3 }}</p>-->
      </n-col>
    </n-row>
    <n-row>
      <AdminPanel />
    </n-row>
  </n-layout-content>
</template>
