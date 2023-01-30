<script setup lang="ts">
import { navigation } from '~/data/navigation'

const route = useRoute()
console.log(route)
const client = useSupabaseAuthClient()
const loading = ref(false)

const signOut = async () => {
  loading.value = true
  setTimeout(async () => {
    const { error } = await client.auth.signOut()
    if (error) {
      console.error(error)
    }
    loading.value = false
    navigateTo('/login')
  }, 2500)
}

const leftDrawerOpen = ref(false)

const miniMode = ref(false)

function toggleLeftDrawer() {
  miniMode.value = !miniMode.value
}

const $q = useQuasar()
const isDark = ref(true)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  $q.dark.toggle()
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-dark" bordered>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title></q-toolbar-title>
        <span class="text-primary text-bold text-uppercase text-h6">{{
          route.name
        }}</span>
        <q-space />
        <q-btn
          round
          @click="toggleDarkMode"
          :icon="isDark ? 'dark_mode' : 'light_mode'"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="200"
      :mini="miniMode"
      show-if-above
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="avatar"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>My Dashboard</q-item-section>
      </q-item>
      <q-list padding bordered>
        <q-item
          v-for="item in navigation"
          :key="item.id"
          v-ripple
          class="rounded-r-full q-mb-sm"
          clickable
          :to="item.to"
          :tabindex="item.id"
          exact-active-class="text-primary"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section> {{ item.name }}</q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item
          v-ripple
          clickable
          exact-active-class="text-primary"
          @click="signOut"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section click="signOut"> Log Out</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
    <q-inner-loading :showing="loading" />
  </q-layout>
</template>
