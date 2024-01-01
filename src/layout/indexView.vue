<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '205px'">
        <MenuView :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { getMenuApi } from '../api/menu'
import MenuView from './menuView.vue'
import { ref } from 'vue'
const isCollapse = ref(false)

const getMenu = () => {
  getMenuApi().then((res) => {
    // console.log(res)
    console.log(res.data)
  })
}
getMenu()
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #304156;
  height: 100vh;
}
.el-main {
  padding: 0;
}
</style>
