<script lang="ts" setup>
import { EmployeeResponseSchema } from '~/composables/fasttrak-api/schemas/EmployeeSchema'

definePageMeta({
  name: 'Resources',
  layout: 'default',
  path: '/resources',
})
const { data, pending, error, refresh } = await useFetch('/api/employees')
const employees = EmployeeResponseSchema.parse(data.value)
</script>

<template>
  <n-card>
    <template v-for="employee in employees.items" :key="employee.employeeId">
      <p>{{ employee.displayName }}</p>
      <p>ID: {{ employee.employeeId }}</p>
    </template>
    <p></p>
    <pre>{{ employees }}</pre>
  </n-card>
</template>

<style scoped></style>
