<script setup lang="ts">
definePageMeta({
  name: 'Sign In',
  layout: 'auth',
})
</script>

<template>
  <AuthForm
    :sign-up="false"
    title="Welcome back"
    subtitle="Please enter your details"
    email-placeholder="Enter your email"
    password-placeholder="Enter your password"
  >
    <template #actions>
      <n-card>
        <span class="text-subtitle1">
          Don't have an account?
          <NuxtLink to="/signup" class="font-bold q-ml-sm text-blue-9"
            >Sign up here!</NuxtLink
          ></span
        ></n-card
      ></template
    >
  </AuthForm>
</template>
