<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/store/user'
const store = useAuthStore()
definePageMeta({
  layout: 'auth-layout'
})
// define rules
const fieldRule = reactive([
  function (val:any) {
    return !!val || 'field is required'
  }
])
const username = ref('')
const password = ref('')
const form: any = ref(null)
async function submit () {
  const result = await form.value.validate()
  if (result.valid) {
    const payload = {
      username: username.value,
      password: password.value
    }
    await useFetch('http://128.199.106.110:4000/auth/logIn', {
      method: 'post',
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
        Welcome Back!
      </v-card-title>
    </div>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field density="compact" variant="outlined" label="Username" :rules="fieldRule" />
      <v-text-field density="compact" variant="outlined" label="Password" :rules="fieldRule" />
      <div class="ma-auto" style="width:fit-content">
        <v-btn color="black" type="submit">
          login
        </v-btn>
      </div>
      <p class="text-body-2 mt-2 text-blue text-decoration-underline mx-auto" style="width:fit-content">
        create an account {{ store.isAuth }}
      </p>
    </v-form>
  </v-card>
</template>
