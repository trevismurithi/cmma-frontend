<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
  layout: 'auth-layout'
})
// define rules
const fieldRule = reactive([
  function (val:any) {
    return !!val || 'field is required'
  }
])
const confirm = ref('')
const password = ref('')
const form: any = ref(null)
async function submit () {
  const result = await form.value.validate()
  if (result.valid) {
    const payload = {
      password: password.value
    }
    fetch('http://128.199.106.110:4000/auth/reset', {
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
        Change Password!
      </v-card-title>
    </div>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field
        v-model="password"
        density="compact"
        variant="outlined"
        label="New Password"
        :rules="fieldRule"
      />
      <v-text-field
        v-model="confirm"
        density="compact"
        variant="outlined"
        label="Confirm Password"
        :rules="[
          val => !!val || 'field is required',
          val => !!val && val === password || 'password do not match'
        ]"
      />
      <div class="ma-auto" style="width:fit-content">
        <v-btn color="black" type="submit">
          update
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
