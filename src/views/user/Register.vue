<template>
  <div class="main">
    <a-form class="user-layout-register" :form="form" @submit="handleSubmit">
      <a-form-item label="用户名">
        <a-input size="large" type="text" placeholder="请输入用户名"
          v-decorator="['username',
            {
                validateTrigger:'blur',
                validateFirst: true,
                rules: [
                    { required: true, message: '请输入用户名' }
                ]
            }
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item label="邮箱">
        <a-input size="large" type="text" placeholder="请输入邮箱"
          v-decorator="['email',
            {
                validateTrigger:'blur',
                validateFirst: true,
                rules: [
                    { required: true, message: '请输入邮箱' },
                    { pattern: /^[a-z0-9A-Z]+[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/, message: '邮箱输入格式错误' }
                ]
            }
          ]"
        >
          <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item label="手机号">
        <a-input size="large" type="text" placeholder="请输入手机号码"
          v-decorator="['telephone',
            {
                validateTrigger:'blur',
                validateFirst: true,
                rules: [
                    { required: true, message: '请输入手机号码' },
                    { pattern: '^[1][3,4,5,7,8][0-9]{9}$', message: '手机号码输入格式错误' }
                ]
            }
          ]"
        >
          <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item label="密码">
        <a-input size="large" type="password" autocomplete="false" placeholder="请输入密码"
          v-decorator="['password',
            {
                validateTrigger:'blur',
                validateFirst: true,
                rules: [
                    { required: true, message: '请输入密码' }
                ]
            }
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item label="确认密码">
          <a-input size="large" type="password" placeholder="请输入确认密码"
              v-decorator="['confirmPassword',
                          {
                              validateTrigger:'blur',
                              validateFirst: true,
                              rules:[
                                  {required: true, message: '请输入确认密码'},
                                  {validator: conPwdValidate}
                              ]
                          }
                      ]"
          >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
      </a-form-item>

      <a-form-item>
        <router-link :to="{ name: 'login'}" style="float: right;">切回登录</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit" class="register-button">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import registerApi from '@/api/register'
import md5 from 'md5'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields({ force: true }, (err, values) => {
        if (!err) {
            delete values.confirmPassword
            values.password = md5(values.password)
            registerApi.register(values).then((res) => {
                if (res.code === 200) {
                    this.$message.success(res.message)
                    this.$router.replace('./login')
                } else {
                    this.$message.error(res.message)
                }
            })
        }
      })
    },
    conPwdValidate(rule, value, callback) {
        const pwd = this.form.getFieldsValue(['password', 'confirmPassword'])
        if (
            typeof pwd.password !== 'undefined' &&
            pwd.password !== pwd.confirmPassword
        ) {
            callback('密码与确认密码不一致')
        } else {
            callback();
        }
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-register {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.register-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
