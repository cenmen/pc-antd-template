<template>
  <div class="main">
    <a-form
      class="user-layout-login"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入用户名/邮箱/手机号"
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: '请输入帐户名' }
              ]
            }
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码' }
              ]
            }
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <router-link
          :to="{ name: 'register'}"
          class="forge-password"
          style="float: right;"
        >新用户注册</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
        >登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import store from '@/store'
import { timeFix } from '@/utils/util'

export default {
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit (e) {
      e.preventDefault()

      this.state.loginBtn = true
      const _this = this
      this.form.validateFields({ force: true }, (err, values) => {
        if (!err) {
          const loginParams = {
            username: values.username,
            password: md5(values.password)
          }
          console.log('login form', store.state.user.name)
          this.Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              _this.state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            _this.state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      console.log('loginSuccess' + res)
      this.$router.push({ name: 'dashboard' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: err.message || '请求出现错误，请稍后再试'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
