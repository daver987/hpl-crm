<script setup lang="ts">
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
})
const formatMessageData = (messageData: any) => {
  return {
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
