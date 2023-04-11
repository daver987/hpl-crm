<script setup lang="ts">
import { Database } from '~/types/supabase'

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

const formValue = ref({
  email: '',
  password: '',
})

const rules = {
  email: {
    required: true,
    trigger: 'blur',
  },
  password: {
    required: true,
    trigger: 'blur',
  },
}

const loading = ref(false)
const formRef = ref(null)

const login = async () => {
  loading.value = true
  try {
    const { data } = await supabase.auth.signInWithPassword(formValue.value)
    console.log('Returned From Auth', data)
    setTimeout(async () => {
      await navigateTo('/')
      loading.value = false
    }, 2000)
  } catch (error) {
    console.error(error)
    alert('Oops Something went wrong, please enter in your credentials again')
    loading.value = false
  }
}
</script>

<template>
  <n-card style="padding-top: 1rem" :bordered="false">
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item path="formValue" label="Email">
        <n-input
          v-model:value="formValue.email"
          :disabled="loading"
          type="text"
          :placeholder="emailPlaceholder"
        />
      </n-form-item>
      <n-form-item path="formValue" label="Password">
        <n-input
          v-model:value="formValue.password"
          :disabled="loading"
          type="password"
          :placeholder="passwordPlaceholder"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          style="width: 100%; text-transform: uppercase"
          color="#A57C52FF"
          :loading="loading"
          :disabled="loading"
          @click="login"
          >{{ signUp ? 'Sign Up' : 'Sign In' }}</n-button
        >
      </n-form-item>
    </n-form>
  </n-card>
</template>
