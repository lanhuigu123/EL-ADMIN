import http from '../utils/httpRequset'

// 获取侧边菜单
export const getMenuApi = () => http.get('/api/menus/build')

// 菜单列表
interface Menu {
  sort?: string
  page?: number
  size?: number
  pid?: number
}
export const getMenu = (params: Menu) => http.get('/api/menus', params)
