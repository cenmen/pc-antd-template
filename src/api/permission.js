import { axios } from '@/utils/request'

export default {
  List (params) {
    return axios({
      url: '/permission/list',
      method: 'post',
      data: params
    })
  },
  
  Detail (params) {
    return axios({
      url: '/permission/detail',
      method: 'get',
      params: params
    })
  },
  
  // 删除
  Delete (params) {
    return axios({
      url: '/permission/delete',
      method: 'get',
      params: params
    })
  },

  // 修改
  Update (params) {
    return axios({
      url: '/permission/update',
      method: 'post',
      data: params
    })
  },

  // 新增
  Insert (params) {
    return axios({
      url: '/permission/insert',
      method: 'post',
      data: params
    })
  }
}
