<template>
  <NuxtLink :to="{ name: path }">
    <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
}
</script>
