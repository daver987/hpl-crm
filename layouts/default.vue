<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <n-layout style="height: 100dvh">
    <AppHeader />
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

  <!--  <n-layout position="absolute" style="top: 48px; bottom: 4px" has-sider>-->
  <!--    <n-layout-sider-->
  <!--      bordered-->
  <!--      show-trigger-->
  <!--      collapse-mode="width"-->
  <!--      :collapsed-width="64"-->
  <!--      :width="240"-->
  <!--    >-->
  <!--      <n-card-->
  <!--        size="small"-->
  <!--        title="High Park Livery Admin"-->
  <!--        style="border-radius: 0px"-->
  <!--      >-->
  <!--      </n-card>-->
  <!--      <Menu />-->
  <!--    </n-layout-sider>-->
  <!--    <n-layout :native-scrollbar="false">-->
  <!--      <AppHeader />-->
  <!--      <slot />-->
  <!--    </n-layout>-->
  <!--  </n-layout>-->
</template>
