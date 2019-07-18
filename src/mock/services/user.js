import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'name': '天野远子',
    'username': 'admin001',
    'avatar': '/avatar2.jpg',
    'status': 1,
    'telephone': '13420121154',
    'createTime': 1497160610259,
    'role': {
      'rolesCode': 10000,
      'rolesName': '管理员',
      'rolesId': '1d7da9005',
      'permissions': [{
        'permissionList': ['dashboard', 'exception', 'result', 'profile', 'table', 'form', 'order', 'permission', 'role', 'user', 'support', 'author'], // 路由页面权限
        'actionEntitySet': [{ // 按钮权限，后面按需配置
          'action': 'add',
          'describe': '新增'
        }, {
          'action': 'query',
          'describe': '查询'
        }, {
          'action': 'update',
          'describe': '修改'
        }, {
          'action': 'delete',
          'describe': '删除'
        }, {
          'action': 'get',
          'describe': '获取'
        }]
      }]
    }
  }
  return builder(userInfo)
}

Mock.mock(/\/api\/user\/info/, 'get', info)
