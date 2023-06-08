<script lang="ts" setup>
import { Ref } from 'vue'
import { NButton } from 'naive-ui'

definePageMeta({
  name: 'Drivers',
  layout: 'default',
  path: '/resources/drivers',
})
const { data, pending, error } = await useFetch('/api/employees')
</script>

<template>
  <n-layout-content>
    <n-grid v-if="displayName" :cols="1">
      <n-grid-item style="margin-bottom: 12px">
        <n-space justify-between>
          <n-button @click="goBack" bordered>Back </n-button>
          <n-h5>{{ displayName }}</n-h5>
        </n-space>
      </n-grid-item>
    </n-grid>
    <DriverReservationsTable v-if="employeeId" :employee-id="employeeId" />
    <n-grid v-else :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
      <DriverCard
        @show-reservations="getEmployeeId($event)"
        :drivers="data.items"
      />
    </n-grid>
  </n-layout-content>
</template>
