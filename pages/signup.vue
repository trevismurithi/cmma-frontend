<script setup lang="ts">
import { useAuthStore } from '~/store/user'
definePageMeta({
  layout: 'auth-layout'
})
// define the store
const store = useAuthStore()

</script>
<template>
  <v-card class="pa-6">
    <div>
      <v-card-title class="font-weight-black mx-auto" style="width:fit-content">
        Welcome!
      </v-card-title>
    </div>
    <auth-sign-one v-if="!store.isRegistered" />
    <auth-sign-two v-else />
  </v-card>
</template>
