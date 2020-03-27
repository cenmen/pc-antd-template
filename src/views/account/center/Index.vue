<template>
<a-card :bordered="false">
  <div class="userInfo-reveal">
    <h2 style="font-weight: 600;">{{this.$route.meta.title}}</h2>
    <a-row v-action:read>
      <a-col :span="2">公司名称</a-col>
      <a-col :span="5">{{userInfo.companyName}}</a-col>
    </a-row>
    <a-row v-action:read>
      <a-col :span="2">公司编号</a-col>
      <a-col :span="5">{{userInfo.companyId}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="2">用户名</a-col>
      <a-col :span="5">{{userInfo.username}}</a-col>
      <a-col :span="17">
        <span @click="pwdVisible = true" class="text-btn">修改密码</span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="2">手机号码</a-col>
      <a-col :span="5">{{userInfo.mobile}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="2">邮箱</a-col>
      <a-col :span="5">{{userInfo.email}}</a-col>
    </a-row>

    <a-modal title="修改密码" v-model="pwdVisible" width="400px">
      <a-form :form="pwdForm" layout="inline">
        <a-form-item label="新密码" class="normal-label">
          <a-input
            type="password"
            v-decorator="['newPassword',
                        {
                            validateTrigger:'change',
                            validateFirst: true,
                            rules:[
                                {required: true, message: '请输入新密码'},
                                {pattern:'^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$', message: '密码必须为6-20个字母数字组合'}
                            ]
                        }
                    ]"
          />
        </a-form-item>
        <a-form-item label="确认新密码" class="normal-label">
          <a-input
            type="password"
            v-decorator="['confirmPassword',
                        {
                            validateTrigger:'change',
                            validateFirst: true,
                            rules:[
                                {required: true, message: '请输入确认新密码'},
                                {pattern:'^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$', message: '密码必须为6-20个字母数字组合'},
                            ]
                        }
                    ]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="pwdVisible = false">取消</a-button>
        <a-button key="submit" type="primary" @click="editPassword">保存</a-button>
      </template>
    </a-modal>
  </div>
  </a-card>
</template>


<script>
import userApi from '@/api/user'

export default {
  components: {
  },

  data () {
    return {
      pwdForm: {},
      userInfo: {},
      updateMobile: true,
      updateEmail: true,
      pwdVisible: false,
      email: '',
      mobile: '',
    }
  },

  mounted () {
    this.pwdForm = this.$form.createForm(this);
    userApi.getUserInfo().then((res) => {
        console.log('getUserInfo res', res)
        if (res.code === 0) {
            this.userInfo = res.result;
        } else {
            this.$message.error(res.message);
        }
    });
  },

  methods: {
    editPassword(e) {
        e.preventDefault();
        this.pwdForm.validateFields((err, values) => {
            if (!err) {
                userApi.updatePassword(values).then((data) => {
                    if (data.code === 0) {
                        this.pwdVisible = false;
                        this.$message.success(data.message || '修改成功');
                    } else {
                        this.$message.error(data.message);
                    }
                });
            }
        });
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo-reveal {
    padding: 20px 50px;
    .ant-row {
        height: 50px;
        line-height: 50px;
    }
    .text-btn {
        color: #1d76e0;
        cursor: pointer;
        padding: 0px 10px;
    }
    .emailTips {
        display: inline-block;
        color: #ffd700;
        font-size: 14px;
        line-height: 15px;
    }
}

.btn {
    width: 94px;
    height: 32px;
    background: #1d76e0;
    border-radius: 4px;
    // margin: 20px 150px;
    span {
        font-size: 14px;
        color: #ffffff;
        line-height: 32px;
    }
}

</style>
