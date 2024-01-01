<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="treeBox">
          <el-input v-model="filterText" placeholder="输入部门名称搜索">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
          <el-tree ref="treeRef" :props="props" :load="loadNode" lazy :filter-node-method="filterNode" />
        </div>
      </el-col>
      <el-col :span="19">
        <div class="table">
          <div class="search" v-show="isShow">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="form.searchValue" placeholder="输入名称或者邮箱搜索" />
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-value="[new Date(), new Date()]"
                  :shortcuts="shortcuts"
                />
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.status" clearable placeholder="状态">
                  <el-option label="激活" :value="true">激活</el-option>
                  <el-option label="锁定" :value="false">锁定</el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" color="#13ce66" :icon="Search">搜索</el-button>
                <el-button type="warning" color="#ffba00" :icon="RefreshLeft">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="buttonBox">
            <div class="left">
              <el-button type="primary" :icon="Plus">新增</el-button>
              <el-button type="success" color="#13ce66" :icon="EditPen">修改</el-button>
              <el-button type="danger" :icon="Delete">删除</el-button>
              <el-button type="warning" color="#ffba00" :icon="Download">导出</el-button>
              <el-button type="primary" :icon="RefreshLeft">重置密码</el-button>
            </div>
            <div class="right">
              <el-button-group class="ml-4">
                <el-button color="#999" :icon="Search" @click="isShow = !isShow" />
                <el-button :icon="Refresh" />
                <el-button :icon="Grid" />
              </el-button-group>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { Search, RefreshLeft, Plus, EditPen, Delete, Download, Refresh, Grid } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'
import { getTreeApi } from '../../../api/user'
import { ElTree } from 'element-plus'

const treeRef = ref<InstanceType<typeof ElTree>>()

let isShow = ref(true)

console.log(treeRef.value)

const form = reactive({
  searchValue: '',
  time: []
})

const filterText = ref('')
let treeData = ref([])

interface Tree {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const getTree = () => {
  getTreeApi({}).then((res) => {
    // console.log(res)
    treeData.value = res.data.content
    console.log(treeData)
  })
}
getTree()

const props = {
  label: 'name',
  isLeaf: 'leaf'
}

const loadNode = (node, resolve: (data) => void) => {
  console.log(node)
  getTreeApi({ pid: node.data.id }).then((res) => {
    console.log(res)
    return resolve(res.data.content)
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
watch(filterText, (val: any) => {
  console.log(val)
  console.log(treeData.value)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  treeRef.value.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  console.log(value)

  if (!value) return true
  return data.label.includes(value)
}
</script>
<style lang="scss" scoped>
.treeBox {
  padding: 0 20px;
}
.el-button {
  color: #fff;
}
.buttonBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table {
  padding-right: 20px;
}
</style>
