import http from '../utils/httpRequset'
import { getTree } from '../utils/defind'

export const getTreeApi = (params: getTree) => http.get('/api/dept?sort=id,desc', params)
