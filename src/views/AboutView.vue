<template>
  <div>
    <p>{{ userInfo.name }} - {{ userInfo.age }}</p>
    <p>{{ userInfo.newName }}</p>
    <el-button @click="changeAge1">第一种</el-button>
    <el-button @click="changeAge2">第二种</el-button>
    <el-button @click="changeAge3">第三种</el-button>
    <el-button @click="changeAge4">第四种</el-button>
    <el-button @click="changeAge5">第五种</el-button>
    <el-button @click="change">解构</el-button>
    <el-button @click="asyncChange">异步修改</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>
<script setup lang="ts">
import { useInfoStore } from '../store/index'
import { storeToRefs } from 'pinia'

const userInfo = useInfoStore()
let { name, age } = storeToRefs(userInfo)
console.log(name, age)

const changeAge1 = () => {
  userInfo.age = 18
  userInfo.name = '111'
}
const changeAge2 = () => {
  userInfo.$patch({
    name: '222',
    age: 18
  })
}

const changeAge3 = () => {
  userInfo.$patch((state) => {
    state.name = '张三'
    state.age = 22
  })
}

const changeAge4 = () => {
  userInfo.$state = {
    name: '张三',
    age: 24
  }
}

const change = () => {
  name.value = '张三'
  age.value++
}

const asyncChange = () => {
  userInfo.setUser()
}

const reset = () => {
  userInfo.$reset()
}
</script>
<style lang="scss" scoped></style>
