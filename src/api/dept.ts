import http from '../utils/httpRequset'
import { GetDept } from '../utils/defind'

export const getDeptApi = (params: GetDept) => http.get('/api/dept', params)

export const delDeptApi = (data: number[]) => http.delete('/api/dept', data)
