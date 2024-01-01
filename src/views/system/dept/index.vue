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
    <div class="tableBox">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="label" label="名称" />
        <el-table-column prop="deptSort" label="排序" />
        <el-table-column prop="enabled" label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.enabled" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" />
        <el-table-column label="操作" fixed="right" width="110px">
          <template v-slot="scope">
            <el-button type="primary" :icon="EditPen" @click="edit(scope.row)"></el-button>
            <el-button type="danger" :icon="Delete" @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, RefreshLeft, Plus, EditPen, Delete, Download, Refresh, Grid } from '@element-plus/icons-vue'
import { getDeptApi, delDeptApi } from '../../../api/dept'
import { User } from '../../../utils/defind'

const isShow = ref(true)

const form = reactive({
  searchValue: '',
  time: []
})

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

const tableData = ref([])

const getDept = () => {
  getDeptApi({
    sort: 'id%2Cdesc'
  }).then((res) => {
    console.log(res)
    tableData.value = res.data.content
  })
}
getDept()

const load = (row: User, treeNode: unknown, resolve: (date: User[]) => void) => {
  console.log(row, treeNode)
  setTimeout(() => {
    getDeptApi({
      pid: row.id
    }).then((res) => {
      console.log(res)
      resolve(res.data.content)
    })
  }, 500)
}

/**
 * 删除
 */
const del = (row) => {
  console.log(row)
  delDeptApi([18]).then((res) => {
    console.log(res)
  })
}
</script>
<style lang="scss" scoped>
.content {
  padding: 20px;
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: scroll;
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
.tableBox {
  margin-top: 20px;
}
</style>
