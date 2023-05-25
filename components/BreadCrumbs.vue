<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="(route, index) in breadcrumbRoutes" :key="index">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumbRoutes = computed(() => {
  let pathArray = route.path.split('/')
  pathArray.shift() // remove first empty element due to leading slash
  let breadcrumbRoutes = []
  let pathAccumulator = ''

  pathArray.forEach((segment, index) => {
    pathAccumulator += `/${segment}`
    let name = segment
    if (index === pathArray.length - 1 && route.meta.value && route.name) {
      name = route.meta.value.title || segment // use title from page meta or segment if unavailable
    }
    breadcrumbRoutes.push({
      path: pathAccumulator,
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize the name
    })
  })

  return breadcrumbRoutes
})
</script>
