import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'user', 'super']
const password = ['e10adc3949ba59abbe56e057f20f883e', '21232F297A57A5A743894A0E4A801FC3'] // 123456, admin

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder({
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    'name': '花里胡哨',
    'role': {
      'rolesCode': 10000,
      'rolesName': '管理员',
      'rolesId': '1d7da9005',
      'permissions': [{
        'permissionList': ['dashboard', 'exception', 'result', 'profile', 'table', 'form', 'order', 'permission', 'role', 'user', 'support', 'author'], // 路由页面权限
        // 'actionEntitySet': [{ // 按钮权限，后面按需配置
        //   'action': 'add',
        //   'describe': '新增'
        // }, {
        //   'action': 'query',
        //   'describe': '查询'
        // }, {
        //   'action': 'update',
        //   'describe': '修改'
        // }, {
        //   'action': 'delete',
        //   'describe': '删除'
        // }, {
        //   'action': 'get',
        //   'describe': '获取'
        // }]
      }]
    }
  }
  return builder(userInfo)
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/api\/auth\/info/, 'get', info)
Mock.mock(/\/auth\/logout/, 'post', logout)
