<template>
  <n-gi :span="1" v-for="(driver, index) in drivers" :key="index">
    <n-card
      size="small"
      :title="driver.firstName"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <template #header-extra>
        <n-tag
          size="small"
          round
          :type="driver.status === 'On_Duty' ? 'success' : 'error'"
        >
          {{ driver.status === 'On_Duty' ? 'On Duty' : 'Off Duty' }}
        </n-tag>
      </template>
      <div>
        <n-ellipsis style="max-width: 240px">
          <a
            style="color: lightseagreen; text-decoration: none"
            :href="`mailto:${driver.emailAddress}`"
            ><strong style="color: whitesmoke">Email:</strong>
            {{ driver.emailAddress }}</a
          >
        </n-ellipsis>
        <br />
        <a
          style="color: lightseagreen; text-decoration: none"
          :href="`tel:${driver.phoneCell}`"
          ><strong style="color: whitesmoke">Phone:</strong>
          {{ driver.phoneCell }}</a
        >
        <br />
      </div>
      <template #action>
        <n-space justify="space-between">
          <n-button
            ghost
            size="small"
            type="primary"
            @click="
              emitReservationsEvent({
                employeeId: driver.employeeId,
                displayName: driver.displayName,
              })
            "
            >Reservations
          </n-button>
          <n-button
            ghost
            size="small"
            type="warning"
            @click="emitEditEvent(driver.employeeId)"
            >Edit
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-gi>
</template>

<script setup lang="ts">
interface Driver {
  displayName: string
  firstName: string
  lastName: string
  emailAddress: string
  phoneCell: string
  status: string
  isInactive: boolean
  employeeId: number
}

interface EmployeeInfo {
  employeeId: number
  displayName: string
}

const props = defineProps({
  drivers: {
    type: Array as () => Driver[],
    required: true,
  },
})

const emit = defineEmits(['show-reservations', 'edit-driver'])

const emitReservationsEvent = (employeeInfo: EmployeeInfo) => {
  emit('show-reservations', employeeInfo)
}

const emitEditEvent = (employeeId: number) => {
  emit('edit-driver', employeeId)
}
</script>
