<template>
  <div class="content">
    <div class="form">
      <el-form :model="loginForm" :rules="rules" label-position="right" ref="form" class="form">
        <p>ELADMIN 后台管理系统</p>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="codeBox">
            <el-input v-model="loginForm.code">
              <template #prefix>
                <el-icon><CircleCheck /></el-icon>
              </template>
            </el-input>
            <el-image style="width: 140px; height: 30px; margin-left: 10px" :src="loginForm.imgSrc" fit="contain" />
          </div>
        </el-form-item>
        <el-form-item prop="code">
          <el-checkbox v-model="rememberMe" label="记住我" name="type" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as API from '../../api/login'
import { reactive, ref } from 'vue'
import { User, CircleCheck, Lock } from '@element-plus/icons-vue'
import { Login } from '../../utils/defind'
import { encrypt } from '../../utils/rsaEncrypt'
import { setToken } from '../../utils/auth'
import { userStore } from '../../store/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfo = userStore()
const rememberMe = ref(false)
let loginForm: Login = reactive({
  username: 'admin',
  password: '123456',
  uuid: '',
  code: '',
  imgSrc: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

/**
 * 获取验证码图片
 */
const getCode = () => {
  API.getCodeImg().then((res) => {
    console.log(res)
    loginForm.imgSrc = res.data.img
    loginForm.uuid = res.data.uuid
  })
  console.log(loginForm)
}
getCode()

/**
 * 登录
 */
const handleLogin = () => {
  if (loginForm.password === '123456') {
    loginForm.password = encrypt(loginForm.password)
  }
  // console.log(loginForm)
  const { username, password, code, uuid } = loginForm
  // console.log(username)
  // console.log(password)
  // console.log(code)
  // console.log(uuid)

  API.loginApi({ username, password, code, uuid }).then((res) => {
    console.log(res)
    setToken(res.data.token)
    userInfo.$patch((state) => {
      state.user = res.data.user.user
    })
    router.push('/')
  })
}
</script>
<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/background.webp');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.form {
  width: 400px;
  height: 350px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
}
.form p {
  padding: 0 0 30px 0;
  text-align: center;
  font-weight: 700;
}
.codeBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-image__inner {
  height: 100%;
}
.el-button--primary {
  width: 100%;
}
</style>
