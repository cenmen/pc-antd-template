import { axios } from '@/utils/request'

export default {
  // 登录
  login (parameter) {
    return axios({
      url: 'auth/login',
      method: 'post',
      data: parameter
    })
  },
  // 获取用户权限等信息，登录后触发
  getInfo () {
    return axios({
      url: '/auth/info',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
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
