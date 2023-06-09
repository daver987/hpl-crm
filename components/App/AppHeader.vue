<script setup lang="ts">
const route = useRoute()
const name = route.name
const getShowLogo = computed(() => true)
</script>

<template>
  <n-layout-header
    style="
      height: 56px;
      padding: 16px;
      border-bottom: 1px;
      border-color: aliceblue;
    "
    bordered
  >
    <div class="flex h-full text-large justify-between">
      <div class="flex justify-between items-center h-full">
        <h5 class="text-lg">High Park Livery CRM</h5>
        <!--        <LayoutBreadcrumb class="ml-3" />-->
      </div>
      <div class="flex items-center h-full">
        <!--        <AppSearch />-->
        <Notify />
        <FullScreen />
        <!--        <UserDropDown />-->
      </div>
    </div>
  </n-layout-header>
</template>
