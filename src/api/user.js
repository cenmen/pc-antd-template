import { axios } from '@/utils/request'

export default {
  getUserInfo () {
    return axios({
      url: '/user/userInfo',
      method: 'post'
    })
  },

  updatePassword () {
    return axios({
      url: '/user/updatePassword',
      method: 'post'
    })
  }
}
