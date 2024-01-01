import http from '../utils/httpRequset'
import { LoginRequest } from '../utils/defind'

// 获取验证码图片
export const getCodeImg = () => http.get('/auth/code')

// 登录
export const loginApi = (params: LoginRequest) => http.post('/auth/login', params)
