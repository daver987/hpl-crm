<script setup lang="ts">
import AppHeader from '~/components/App/AppHeader.vue'

const route = useRoute()
</script>
<template>
  <n-layout style="height: 100dvh" has-sider>
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
    >
      <n-card
        size="small"
        title="High Park Livery Admin"
        style="border-radius: 0px"
      >
      </n-card>
      <Menu />
    </n-layout-sider>
    <n-layout :native-scrollbar="false">
      <AppHeader />
      <slot />
    </n-layout>
  </n-layout>
</template>
