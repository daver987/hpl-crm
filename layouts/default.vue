<script setup lang="ts">
// const menuOptions = navigation()
const route = useRoute()
</script>
<template>
  <n-layout style="height: 100dvh">
    <n-layout-header style="height: 48px; padding: 16px" bordered>
      <n-h5>{{ route.name }}</n-h5>
    </n-layout-header>
    <n-layout position="absolute" style="top: 48px; bottom: 4px" has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
      >
        <Menu />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <slot />
      </n-layout>
    </n-layout>
  </n-layout>
</template>
