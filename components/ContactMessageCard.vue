<script setup lang="ts">
interface ContactMessage {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  message: string
  is_read: boolean
}

interface Props {
  contactMessage: ContactMessage
}

const props = defineProps<Props>()

const fullName = computed(
  () => `${props.contactMessage.first_name} ${props.contactMessage.last_name}`
)
const phoneNumber = computed(() => props.contactMessage.phone_number)
const email = computed(() => props.contactMessage.email)
const message = computed(() => props.contactMessage.message)
const is_read = computed(() => props.contactMessage.is_read)
</script>

<template>
  <div class="message-container">
    <div class="message-header">
      <h3>{{ fullName }}</h3>
      <div class="status-indicator" :class="{ 'is-read': is_read }"></div>
    </div>
    <div class="contact-info">
      <p>{{ phoneNumber }}</p>
      <p>{{ email }}</p>
    </div>
    <div class="message-body">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  background-color: #222;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #a57c52ff;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
}

.status-indicator.is-read {
  background-color: green;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.message-body {
  font-size: 1rem;
}
</style>
