import { defineStore } from 'pinia'
import { Names } from './store_name'

type User = {
  name: string
  age: number
}

const Login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '张三',
        age: 28
      })
    }, 2000)
  })
}

export const useInfoStore = defineStore(Names.TEST, {
  state: () => {
    return {
      name: '展立业',
      age: 20
    }
  },
  getters: {
    newName(): string {
      return `这是getter修饰过的名称 ${this.name}`
    }
  },
  actions: {
    setAge() {
      this.age = 2000
      this.name = '你好世界'
    },
    async setUser() {
      const result = await Login()
      this.name = result.name
      this.age = result.age
    }
  }
})
