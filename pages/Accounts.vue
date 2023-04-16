<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default',
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
