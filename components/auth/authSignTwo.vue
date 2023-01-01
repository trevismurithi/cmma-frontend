<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '~/store/user'
// define store
const store: any = useAuthStore()
// define variables
const dob = ref('')
const gender = ref('')
const country = ref('')
const city = ref('')
const interest = ref([])
const password = ref('')

// form ref
const form: any = ref(null)
// define rules
const fieldRule = reactive([
  function (val: any) {
    return !!val || 'field is required'
  }
])
// country and city variables
const countries = ['Kenya']
const cities = ['Nairobi']
const interests = ['Pop', 'Hip-Hop', 'Rock']
async function submit () {
  // validate the form
  const result = await form.value.validate()
  if (result.valid) {
    const payload = {
      userId: store.user.userId,
      dob: dob.value,
      gender: gender.value,
      country: country.value,
      city: city.value,
      genres: interest,
      password: password.value
    }
    await useFetch('http://128.199.106.110:4000/auth/signUp', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }
}
</script>
<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-text-field
      v-model="dob"
      density="compact"
      type="date"
      variant="outlined"
      label="Date Of Birth"
      :rules="fieldRule"
    />
    <v-select
      v-model="gender"
      density="compact"
      variant="outlined"
      :items="['Male', 'Female']"
      label="Gender"
      :rules="fieldRule"
    />
    <v-select
      v-model="country"
      density="compact"
      variant="outlined"
      :items="countries"
      label="Country"
      :rules="fieldRule"
    />
    <v-select
      v-model="city"
      density="compact"
      variant="outlined"
      :items="cities"
      label="City"
      :rules="fieldRule"
    />
    <v-autocomplete
      v-model="interest"
      density="compact"
      variant="outlined"
      label="Interests"
      multiple
      :items="interests"
      :rules="fieldRule"
    />
    <v-text-field
      v-model="password"
      density="compact"
      variant="outlined"
      label="Password"
      type="password"
      :rules="fieldRule"
    />
    <div class="ma-auto" style="width: fit-content">
      <v-btn class="text-capitalize" color="black" type="submit">
        sign up
      </v-btn>
    </div>
  </v-form>
</template>
