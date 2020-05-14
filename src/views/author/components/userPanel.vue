<template>

  <div>
    <a-modal title="编辑账号权限" :width="600" v-model="isVisible" @ok="onSubmit" @cancel="closeModal">
      <a-form :form="modForm">

        <a-form-item label="ID" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入ID" disabled
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
              <a-select-option v-for="(item, index) in permissionLists" :key="index" :value="item">{{ item }}</a-select-option>
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
  name: 'userPanel',
  props: ['isVisible', 'record', 'permissionCheckList'],
  data () {
    return {
      permissionLists: [],
      modForm: this.$form.createForm(this),
    }
  },
  mounted () {
    this.permissionLists = this.permissionCheckList
    
  },
  watch: {
    isVisible(value) {
      if (value) {
        this.openUserPanel(this.record)
      }
    }
  },
  methods: {
    //关闭对话框
    closeModal() {
      this.$emit('update:isVisible', false)
    },
    openUserPanel(record) {
      const {id} = record
      permissionApi.Detail({id}).then((res) => {
        if (res.code === 200) {
          const data = res.data[0]
          this.modForm.setFieldsValue({
            id: data.id,
            name: data.name,
            password: data.password,
            permissionList: data.permission,
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onSubmit () {
      this.modForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          permissionApi.Update(values).then((res) => {
              if (res.code === 200) {
                this.closeModal()
                this.$emit('onSubmit')
                this.$message.success(res.message || '修改成功')
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
