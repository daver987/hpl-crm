<script lang="ts" setup>
definePageMeta({
  name: 'Drivers',
  layout: 'default',
  path: '/resources/drivers',
})
const { data, pending, error, refresh } = await useFetch('/api/employees')
</script>

<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <DriverCard :drivers="data.items" />
  </n-grid>
  <!--  <EmployeeTable :data="data" :pending="pending" />-->
</template>
