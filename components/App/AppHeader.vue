<script setup lang="ts">
const route = useRoute()
const name = route.name
const getShowLogo = computed(() => true)
</script>

<template>
  <n-layout-header
  style="padding-inline: 24px;"
    bordered
  >
    <n-space justify="space-between" align="center">
<n-space size="large">
  <h5 style="margin-top: 6px;">High Park Livery CRM</h5>
</n-space>
        
        <!--        <LayoutBreadcrumb class="ml-3" />-->

      <n-space justify="space-around">
        <!--        <AppSearch />-->
        <Notify />
        <FullScreen />
        <!--        <UserDropDown />-->
      </n-space>
    </n-space>
  </n-layout-header>
</template>
