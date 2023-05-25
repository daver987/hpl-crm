<script lang="ts" setup>
const route = useRoute()
const name = route.name
</script>

<template>
  <n-layout-header style="height: 56px; padding: 16px">
    <n-h5>{{ name }}</n-h5>
  </n-layout-header>
</template>

<style scoped></style>
