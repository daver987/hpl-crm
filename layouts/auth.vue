<script setup>
//scrips
</script>

<template>
  <n-layout style="min-height: 100dvh">
    <n-space justify="center">
      <n-layout-content style="height: 100%">
        <n-card style="width: 450px">
          <n-space justify="center">
            <n-image width="150" src="/images/HPL-Logo-White.png" />
          </n-space>
          <slot />
        </n-card>
      </n-layout-content>
    </n-space>
  </n-layout>
</template>
