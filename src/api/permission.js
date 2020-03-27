import { axios } from '@/utils/request'

export default {
  getPermissonList () {
    return axios({
      url: '/author/permission',
      method: 'post'
    })
  },

  // 修改用户权限
  modPermission () {
    return axios({
      url: '/author/updatePermission',
      method: 'post'
    })
  },

  // 路由总权限
  getAllPermissonList () {
    return axios({
      url: '/author/allPermission',
      method: 'post'
    })
  },

  // 子集总权限
  getAllActionList () {
    return axios({
      url: '/author/allAction',
      method: 'post'
    })
  }
}
