import { defineStore } from 'pinia'
import { Names } from './store_name'

export const userStore = defineStore(Names.USER, {
  state: () => {
    return {
      user: {}
    }
  },
  getters: {},
  actions: {}
})
