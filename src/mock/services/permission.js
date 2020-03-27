import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  console.log('options', options)
  const permissionList = []
  for (let i = 0; i < 50; i++) {
    const userInfo = {
      'userId': 'B201' + i,
      'name': '天野远子',
      'status': 1,
      'telephone': '13420121154',
      'permissionList': ['profile', 'permission', 'user', 'support', 'author'], // 路由页面权限
      'actionEntitySet': ['add', 'query', 'update', 'delete', 'get']
    }
    permissionList.push(userInfo)
  }

  const data = {
    total: permissionList.length,
    list: permissionList
  }
  return builder(data)
}

const permissionCheckList = (options) => {
  const data = {
    list: ['profile', 'permission', 'user', 'support', 'author', 'dashrood', 'option'] // 路由页面权限
  }
  return builder(data)
}

const actionEntityCheckList = (options) => {
  const data = {
    list: ['add', 'query', 'update', 'delete', 'get', 'other', 'ban'] // 路由页面权限
  }
  return builder(data)
}

const updatePermission = (options) => {
  const data = {}
  return builder(data)
}

Mock.mock(/\/api\/author\/permission/, 'post', info)
Mock.mock(/\/api\/author\/allPermission/, 'post', permissionCheckList)
Mock.mock(/\/api\/author\/allAction/, 'post', actionEntityCheckList)
Mock.mock(/\/api\/author\/updatePermission/, 'post', updatePermission)
