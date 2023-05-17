<script setup lang="ts">
const vehicles = await useTrpc().vehicle.get.query()
</script>

<template>
  <n-card title="Quote Settings"> 
    <pre>{{ vehicles }}</pre>
  </n-card>
</template>

<style scoped>
</style>
