<!--suppress ES6PreferShortImport -->
<script setup lang="ts">
import { Database } from '~/types/supabase'
import { z } from 'zod'
const supabase = useSupabaseAuthClient<Database>()
const props = defineProps({
  signUp: {
    type: Boolean,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  emailPlaceholder: {
    type: String,
    default: '',
  },
  passwordPlaceholder: {
    type: String,
    default: '',
  },
})

const credentials = ref({
  email: '',
  password: '',
})

const identitySchema = z
  .object({
    identity: z.string(),
  })
  .strip()

const loading = ref(false)
const login = async () => {
  loading.value = true
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: credentials.value.email,
      password: credentials.value.password,
    })
    await console.log(data)
    setTimeout(async () => {
      navigateTo('/')
      loading.value = false
      const { data } = await useFetch('/api/create-user')
      console.log('Chat Id', data)
      const { identity } = identitySchema.parse(data.value)
      console.log(identity)
      localStorage.setItem('chat_id', identity)
    }, 2000)
  } catch (error) {
    console.error(error)
    alert('Oops Something went wrong, please enter in your credentials again')
    loading.value = false
  }
}
</script>

<template>
  <q-card-section>
    <h2 class="font-bold text-center q-mb-md text-h5">
      {{ title }}
    </h2>
    <p class="text-center text-subtitle1 q-mb-md">
      {{ subtitle }}
    </p>
  </q-card-section>
  <q-card-section>
    <q-form class="q-gutter-md" @submit.prevent="login">
      <q-input
        v-model="credentials.email"
        label="Email"
        name="email"
        for="email"
        outlined
        dense
        required
        :disabled="loading"
        type="email"
        :placeholder="emailPlaceholder"
        dark
      />

      <q-input
        v-model="credentials.password"
        outlined
        dense
        label="Password"
        :disabled="loading"
        name="password"
        for="password"
        type="password"
        :placeholder="passwordPlaceholder"
        dark
      />
      <div class="space-y-2 col">
        <q-btn
          v-if="!signUp"
          to="/forgotpassword"
          label="Forgot your password"
          flat
          no-caps
          class="row q-mb-md"
        />
        <q-btn
          no-caps
          :loading="loading"
          :disabled="loading"
          type="submit"
          class="row full-width"
          color="primary"
          unelevated
          >{{ signUp ? 'Sign Up' : 'Sign In' }}</q-btn
        >
      </div>
    </q-form>
  </q-card-section>

  <q-card-section class="row justify-evenly">
    <q-btn
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-apple"
      color="grey-8"
    >
    </q-btn>
    <q-btn
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-google"
      color="red-7"
    />
    <q-btn
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-twitter"
      color="blue-7"
    >
    </q-btn>
    <q-btn
      :disabled="loading"
      type="button"
      round
      flat
      size="1.2rem"
      icon="fa-brands fa-facebook"
      color="light-blue-9"
    >
    </q-btn>
  </q-card-section>
  <q-card-section class="q-pa-none">
    <slot name="actions" />
  </q-card-section>
</template>
