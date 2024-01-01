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
          <el-button :icon="Refresh" @click="updateMenuList" />
          <el-button :icon="Grid" />
        </el-button-group>
      </div>
    </div>
    <div class="tableBox">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="label" label="菜单标题" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="menuSort" label="排序" />
        <el-table-column prop="permission" label="权限标识" />
        <el-table-column prop="component" label="组件路径" width="160px" />
        <el-table-column prop="iFrame" label="外链">
          <template v-slot="scope">
            <div>
              {{ scope.row.iFrame ? '是' : '否' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cache" label="缓存">
          <template v-slot="scope">
            <div>
              {{ scope.row.cache ? '是' : '否' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="可见">
          <template v-slot="scope">
            <div>
              {{ scope.row.hidden ? '否' : '是' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
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
import { reactive, ref } from 'vue'
import { Search, RefreshLeft, Plus, EditPen, Delete, Download, Refresh, Grid } from '@element-plus/icons-vue'
import { getMenu } from '../../../api/menu'

const form = reactive({
  searchValue: '',
  time: []
})

const loading = ref(false)

const isShow = ref(true)

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

const updateMenuList = () => {
  loading.value = true
  setTimeout(() => {
    getMenuHandle()
    loading.value = false
  }, 300)
}

const getMenuHandle = () => {
  getMenu({}).then((res) => {
    console.log(res.data.content)
    tableData.value = res.data.content
  })
}
getMenuHandle()

interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}

const load = (row: User, treeNode: unknown, resolve: (date: User[]) => void) => {
  console.log(row, treeNode)

  setTimeout(() => {
    getMenu({
      pid: row.id
    }).then((res) => {
      console.log(res.data.content)
      resolve(res.data.content)
    })
  }, 500)
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
