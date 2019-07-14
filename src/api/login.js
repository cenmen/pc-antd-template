import { axios } from '@/utils/request'

export default {
  /**
   * login func
   * parameter: {
   *     username: '',
   *     password: '',
   *     remember_me: true,
   *     captcha: '12345'
   * }
   * @param parameter
   * @returns {*}
   */
  login (parameter) {
    debugger
    return axios({
      url: '/auth/login',
      method: 'post',
      data: parameter
    })
  },

  getInfo () {
    return axios({
      url: '/user/info',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },

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
