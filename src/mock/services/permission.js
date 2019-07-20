import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  console.log('options', options)
  const permissionList = []
  for (let i = 0; i < 50; i++) {
    const userInfo = {
      'id': 'B201' + i,
      'name': '天野远子',
      'status': 1,
      'telephone': '13420121154',
      'permissionList': ['dashboard', 'exception', 'result', 'profile', 'table', 'form', 'order', 'permission', 'role', 'user', 'support', 'author'], // 路由页面权限
      'actionEntitySet': ['add', 'query', 'update', 'delete', 'get']
    }
    permissionList.push(userInfo)
  }
  return builder(permissionList)
}

Mock.mock(/\/api\/author\/permission/, 'post', info)
