<template>

  <div>
    <a-modal title="新增账号权限" :width="600" v-model="isVisible" @ok="submitEdit" @cancel.stop="closeModal">
      <a-form :form="addForm">

        <a-form-item label="ID" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入ID"
            v-decorator="['id',{ rules: [{ required: true, message: '请输入ID' }]}]"/>
        </a-form-item>

        <a-form-item label="用户名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入用户名称"
            v-decorator="['name',{ rules: [{ required: true, message: '请输入用户名称' }]}]"/>
        </a-form-item>

        <a-form-item label="密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入密码" maxlength="11"
            v-decorator="['password',{ rules: [{ required: true, message: '请输入密码' }]}]"/>
        </a-form-item>

        <a-divider />

        <a-form-item label="操作权限" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :colon="false">
          <template>
            <a-select mode="multiple" v-decorator="['permissionList', { rules: [{ required: true, message: '请选择操作权限' }]}]" style="width: 100%" placeholder="please select some permission">
              <a-select-option v-for="(item, index) in alterForm.permissionList" :key="index" :value="item">{{ item }}</a-select-option>
            </a-select>
          </template>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>

</template>

<script>
import permissionApi from '@/api/permission'

export default {
  name: 'PermissionList',
  props: {
        isVisible: Boolean,
      },
  data () {
    return {
      addForm: this.$form.createForm(this),
      alterForm: {
        permissionList: ['profile','author','center','detail','option']
      },
    }
  },
  created () {
  },
  methods: {
    //关闭对话框
    closeModal() {
      this.$emit('update:isVisible', false)
    },
    submitEdit () {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          const params = this.addForm.getFieldsValue()
          permissionApi.Insert(params).then(res => {
            if (res.code === 200) {
              this.closeModal()
              this.$emit('onSubmit')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
  }
}
</script>
