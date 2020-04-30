import Mock from 'mockjs2'
import { builder } from '../util'

const getUserInfo = (options) => {
  console.log('getUserInfo options', options)
  const userInfo = {
    'companyName': '喳流滩公司',
    'companyId': 'ZLT9527',
    'username': '最强喳流滩',
    'mobile': '13420121154',
    'email': 'zaliutan@9527.com',
    'createTime': 1497160610259,
  }
  return builder(userInfo)
}

const updatePassword = (options) => {
  const info = {}
  return builder(info)
}

Mock.mock(/\/api\/user\/userInfo/, 'post', getUserInfo)
Mock.mock(/\/api\/user\/updatePassword/, 'post', updatePassword)
