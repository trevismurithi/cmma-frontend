<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
  layout: 'auth-layout'
})
const email = ref('')
const form: any = ref(null)
async function submit () {
  // validate the email
  const result = await form.value.validate()
  if (result.valid) {
    const payload = {
      email: email.value
    }
    await useFetch('http://128.199.106.110:4000/auth/forgot-password', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }
}
</script>
<template>
  <v-card class="pa-6">
    <div>
      <v-card-title class="font-weight-black mx-auto" style="width:fit-content">
        Provide Email!
      </v-card-title>
    </div>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field v-model="email" density="compact" variant="outlined" label="Email" />
      <div class="ma-auto" style="width:fit-content">
        <v-btn color="black">
          send
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
