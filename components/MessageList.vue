<script setup lang="ts">
interface Message {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  message: string
  is_read: boolean
  id: string
}

interface Props {
  messages: Message[]
}

const props = defineProps<Props>()

const formatMessageData = (messageData: Messages) => {
  return {
    id: messageData.user.id,
    first_name: messageData.user.first_name,
    last_name: messageData.user.last_name,
    phone_number: messageData.user.phone_number,
    email: messageData.user.email_address,
    message: messageData.message,
    is_read: messageData.is_read,
  }
}
</script>

<template>
  <div class="contact-message-list">
    <contact-message-card
      v-for="messageData in messages"
      :key="messageData.id"
      :contact-message="formatMessageData(messageData)"
    />
  </div>
</template>

<style scoped>
.contact-message-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
