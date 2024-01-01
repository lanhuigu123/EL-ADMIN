<template>
  <div class="content">
    <div class="searchBox" v-if="isShow">
      <div class="search">
        <el-input v-model="form.searchValue" placeholder="请输入名称或描述搜索" clearable />
      </div>
      <div class="timeBox">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          unlink-panels
          range-separator=":"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        />
      </div>
      <div class="button">
        <el-button color="#13ce66" :icon="Search" style="color: #fff">搜索</el-button>
        <el-button color="#ffba00" :icon="RefreshLeft" style="color: #fff">重置</el-button>
      </div>
    </div>
    <div class="buttonBox">
      <div>
        <el-button type="primary" :dark="true" :icon="Plus">添加</el-button>
        <el-button color="#13ce66" :icon="EditPen" style="color: #fff">修改</el-button>
        <el-button type="danger" :icon="Delete">删除</el-button>
        <el-button color="#ffba00" :icon="Download" style="color: #fff">导出</el-button>
      </div>
      <div>
        <el-button-group class="ml-4">
          <el-button id="search" :icon="Search" style="background-color: #f4f4f5" @click="isShow = !isShow" />
          <el-button :icon="Refresh" />
          <el-button :icon="Grid" />
        </el-button-group>
      </div>
    </div>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="17">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <h4>角色列表</h4>
            </div>
          </template>
          <!-- TODO 菜单列表 -->
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never" class="box-card">
          <template #header>
            <div class="card-header">
              <h4>菜单分配</h4>
              <el-button type="primary" :icon="Check">保存</el-button>
            </div>
          </template>
          <!-- TODO 权限列表 -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Search, RefreshLeft, Plus, EditPen, Delete, Download, Refresh, Grid, Check } from '@element-plus/icons-vue'

const shortcuts = [
  {
    text: '今天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000)
      return [start, end]
    }
  },
  {
    text: '昨天',
    value: () => {
      const now = new Date()
      const end = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      start.setTime(start.getTime() - 3600 * 1000)
      end.setTime(end.getTime() - 3600 * 1000)
      return [start, end]
    }
  }
]

const isShow = ref(true)

const form = reactive({
  searchValue: '',
  time: []
})
</script>
<style lang="scss" scoped>
.content {
  padding: 20px;
}
.searchBox {
  display: flex;
}
.search {
  width: 200px;
}
.timeBox {
  margin-left: 20px;
}
.button {
  margin-left: 20px;
}
.el-date-editor {
  width: 230px;
}
.buttonBox {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-button[color] {
  color: #fff;
}
#search:hover {
  background-color: #909399 !important;
  color: #fff;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
