<template>
  <NTooltip trigger="hover" placement="bottom" :delay="300">
    <template #trigger>
      <span class="app-layout-header-anction-icon" @click="toggle">
        <Icon
          name="ant-design:fullscreen-exit-outlined"
          class="h-6 w-6"
          v-if="isFullscreen"
        />
        <Icon class="h-6 w-6" name="ant-design:fullscreen-outlined" v-else />
      </span>
    </template>
    {{ getTitle }}
  </NTooltip>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
const getTitle = computed(() =>
  unref(isFullscreen) ? 'Exit Fullscreen' : 'Enter FullScreen'
)
</script>
