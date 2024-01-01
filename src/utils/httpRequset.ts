import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken, removeToken } from './auth'
import { ElMessageBox } from 'element-plus'
import router from '@/router'
import * as TS from './defind'
const url = 'https://eladmin.vip'

const config = {
  // 默认地址
  baseURL: url as string,
  // 设置超时时间
  timeout: TS.RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class httpRequest {
  instance: AxiosInstance
  constructor(baseConfig: AxiosRequestConfig) {
    this.instance = axios.create(baseConfig)
    this.instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = getToken()
        return config
      },
      (err: AxiosError) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data, status } = res
        if (status === TS.RequestEnums.UNAUTHORIZED) {
          removeToken()
          router.replace('/login')
          return Promise.reject(data)
        }
        return res
      },
      (err: AxiosError) => {
        const { response } = err

        let title = ''
        let message = ''

        if (err && response) {
          message = response.statusText

          if (response.status === TS.RequestEnums.UNAUTHORIZED) {
            router.replace({
              name: 'Login'
            })
          }
          switch (response.status) {
            case TS.RequestEnums.BADREQUEST:
              title = '错误请求'
              break
            case TS.RequestEnums.UNAUTHORIZED:
              title = '资源未授权'
              break
            case TS.RequestEnums.NOTFOUND:
              title = '未找到所请求的资源'
              break
            case TS.RequestEnums.ERROR:
              title = '内部服务器错误'
              break
            default:
              title = response.status.toString()
          }
          return ElMessageBox.alert(message, title, {
            confirmButtonText: 'OK',
            type: 'warning'
          })
        } else {
          return ElMessageBox.alert('未知错误,请联系管理员', '提示', {
            confirmButtonText: 'OK',
            type: 'error'
          })
        }
      }
    )
  }

  public adUrl(url: string) {
    // console.log(process.env.VUE_APP_BASE_API, 'process')
    return !process.env.VUE_APP_BASE_API ? url : process.env.VUE_APP_BASE_API + url
  }

  get(url: string, params?: object) {
    return this.instance.get(this.adUrl(url), { params })
  }

  post(url: string, params?: object) {
    return this.instance.post(this.adUrl(url), params)
  }

  put(url: string, params?: object) {
    return this.instance.put(this.adUrl(url), params)
  }

  delete(url: string, params?: object) {
    return this.instance.delete(this.adUrl(url), { params })
  }
}

const http = new httpRequest(config)

export default http
