import { axios } from '@/utils/request'

export default {
  // 登录
  login (params) {
    return axios({
      url: 'auth/login',
      method: 'post',
      data: params
    })
  },
  // 获取用户权限等信息，登录后触发
  getInfo (params) {
    return axios({
      url: '/auth/info',
      method: 'post',
      data: params
    })
  },
  // 退出
  logout () {
    return axios({
      url: '/auth/logout',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
