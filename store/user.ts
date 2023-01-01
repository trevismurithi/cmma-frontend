import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', {

  state: () => ({
    isAuth: false,
    isRegistered: false,
    user: {}
  }),
  actions: {
    toggleRegistered (val: boolean) {
      this.isRegistered = val
    },
    toggleAuth (val: boolean) {
      this.isAuth = val
    },
    setAuthUser (user: object) {
      this.user = user
    }
  }
})
