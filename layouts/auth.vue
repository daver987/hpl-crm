<script setup>
//scrips
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center" padding>
        <q-card class="q-pa-md" style="width: 450px">
          <q-card-section class="flex justify-center">
            <q-img src="/images/HPL-Logo-White.png" width="150px" />
          </q-card-section>
          <slot />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
