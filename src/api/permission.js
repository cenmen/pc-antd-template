import { axios } from '@/utils/request'

export default {
  getPermissonList () {
    return axios({
      url: '/author/permission',
      method: 'post'
    })
  }
}
