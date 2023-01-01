<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '~/store/user'
// define router
const router = useRouter()
// define the store
const store = useAuthStore()
// define variables
const username = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
// form ref
const form: any = ref(null)
// define rules
const fieldRule = reactive([
  function (val:any) {
    return !!val || 'field is required'
  }
])
function redirectUser () {
  store.toggleAuth(true)
  // eslint-disable-next-line no-console
  console.log(router)
  router.push('/login')
}

async function submit () {
  // validate the form
  const result = await form.value.validate()
  if (result.valid) {
    const payload = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value
    }
    try {
      const res: any = await useFetch('http://128.199.106.110:4000/auth/signUp', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      // add userId
      const data = await res.data._rawValue
      store.setAuthUser({
        userId: data.userId
      })
      store.toggleRegistered(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('form not validated')
  }
}
</script>
<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-text-field v-model="username" density="compact" variant="outlined" label="Username" :rules="fieldRule" />
    <v-text-field v-model="firstName" density="compact" variant="outlined" label="First Name" :rules="fieldRule" />
    <v-text-field v-model="lastName" density="compact" variant="outlined" label="Last Name" :rules="fieldRule" />
    <v-text-field v-model="email" density="compact" variant="outlined" label="Email" :rules="fieldRule" />
    <v-text-field v-model="phone" density="compact" variant="outlined" label="Phone" :rules="fieldRule" />
    <div class="ma-auto" style="width:fit-content">
      <v-btn class="text-capitalize" color="black" type="submit">
        sign up
      </v-btn>
    </div>
    <p
      class="text-body-2 mt-2 text-blue text-decoration-underline mx-auto"
      style="width:fit-content;user-select:none"
      @click.prevent="redirectUser"
    >
      create an account
    </p>
  </v-form>
</template>
