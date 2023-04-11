<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-calendar></n-calendar>
  </n-layout-content>
</template>

<style scoped></style>
