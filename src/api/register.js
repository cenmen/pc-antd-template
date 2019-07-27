import { axios } from '@/utils/request'

export default {
  register (params) {
    return axios({
      url: '/authority/register',
      method: 'post',
      params: params
    })
  }
}
