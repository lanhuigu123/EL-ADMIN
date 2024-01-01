<template>
  <div>
    <div class="logo">
      <img src="@/assets/eladmin-logo.png" alt="" />
      <span v-if="!isCollapse">ELADMIN-后台管理 </span>
    </div>
    <el-menu
      router
      :default-active="$route.path"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-color="#409eff"
      :unique-opened="true"
    >
      <el-menu-item index="/dashboard">
        <el-icon><icon-menu /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="" @click="pushVPN">
        <el-icon><icon-menu /></el-icon>
        <span>VPS推荐</span>
      </el-menu-item>
      <el-sub-menu index="/system">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/user">
          <el-icon><Setting /></el-icon>
          用户管理
        </el-menu-item>
        <el-menu-item index="/system/role">
          <el-icon><Setting /></el-icon>
          角色管理
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <el-icon><Setting /></el-icon>
          菜单管理
        </el-menu-item>
        <el-menu-item index="/system/dept">
          <el-icon><Setting /></el-icon>
          部门管理
        </el-menu-item>
        <el-menu-item index="/system/job">
          <el-icon><Setting /></el-icon>
          岗位管理
        </el-menu-item>
        <el-menu-item index="/system/dict">
          <el-icon><Setting /></el-icon>
          字典管理
        </el-menu-item>
        <el-menu-item index="/system/timing">
          <el-icon><Setting /></el-icon>
          任务调度
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>系统监控</span>
        </template>
        <el-menu-item index="2-1">
          <el-icon><Setting /></el-icon>
          在线用户
        </el-menu-item>
        <el-menu-item index="2-2">
          <el-icon><Setting /></el-icon>
          操作日志
        </el-menu-item>
        <el-menu-item index="2-3">
          <el-icon><Setting /></el-icon>
          异常日志
        </el-menu-item>
        <el-menu-item index="2-4">
          <el-icon><Setting /></el-icon>
          服务监控
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>运维管理</span>
        </template>
        <el-menu-item index="3-1">
          <el-icon><Setting /></el-icon>
          服务器
        </el-menu-item>
        <el-menu-item index="3-2">
          <el-icon><Setting /></el-icon>
          应用管理
        </el-menu-item>
        <el-menu-item index="3-3">
          <el-icon><Setting /></el-icon>
          部署管理
        </el-menu-item>
        <el-menu-item index="3-4">
          <el-icon><Setting /></el-icon>
          部署备份
        </el-menu-item>
        <el-menu-item index="3-5">
          <el-icon><Setting /></el-icon>
          数据库管理
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>系统工具</span>
        </template>
        <el-menu-item index="4-1">
          <el-icon><Setting /></el-icon>
          代码生成
        </el-menu-item>
        <el-menu-item index="4-2">
          <el-icon><Setting /></el-icon>
          存储管理
        </el-menu-item>
        <el-menu-item index="4-3">
          <el-icon><Setting /></el-icon>
          邮件工具
        </el-menu-item>
        <el-menu-item index="4-4">
          <el-icon><Setting /></el-icon>
          支付宝工具
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>组件管理</span>
        </template>
        <el-menu-item index="5-1">
          <el-icon><Setting /></el-icon>
          图表库
        </el-menu-item>
        <el-menu-item index="5-2">
          <el-icon><Setting /></el-icon>
          图标库
        </el-menu-item>
        <el-menu-item index="5-3">
          <el-icon><Setting /></el-icon>
          富文本
        </el-menu-item>
        <el-menu-item index="5-4">
          <el-icon><Setting /></el-icon>
          Markdown
        </el-menu-item>
        <el-menu-item index="5-5">
          <el-icon><Setting /></el-icon>
          Yaml编辑器
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>多级菜单</span>
        </template>
        <el-sub-menu index="6-1">
          <template #title>
            <el-icon><Setting /></el-icon>
            二级菜单1
          </template>
          <el-menu-item index="6-1-1">
            <el-icon><Setting /></el-icon>
            三级菜单1
          </el-menu-item>
          <el-menu-item index="6-1-2">
            <el-icon><Setting /></el-icon>
            三级菜单2
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="6-2">
          <el-icon><Setting /></el-icon>
          二级菜单2
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

defineProps(['isCollapse'])

const pushVPN = () => {
  window.open('https://eladmin.vip/pages/040101/')
}
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
  span {
    font-weight: 600;
    font-size: 14px;
    color: #fff;
  }
}
.el-menu {
  border-right: 0;
}
</style>
