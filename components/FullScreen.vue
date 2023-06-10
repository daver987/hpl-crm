<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'


const { toggle, isFullscreen } = useFullscreen()
const getTitle = computed(() =>
  unref(isFullscreen) ? 'Exit Fullscreen' : 'Enter FullScreen'
)
</script>

<template>
  <NTooltip trigger="hover" placement="bottom" :delay="300">
    <template #trigger>
      <span class="app-layout-header-anction-icon" @click="toggle">
        <Icon
          name="ant-design:fullscreen-exit-outlined"
          style="width: 24px; height: 24px;"
          v-if="isFullscreen"
        />
        <Icon style="width: 24px; height: 24px;" name="ant-design:fullscreen-outlined" v-else />
      </span>
    </template>
    {{ getTitle }}
  </NTooltip>
</template>


