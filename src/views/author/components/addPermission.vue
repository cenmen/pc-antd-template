<template>

  <div>
    <a-modal title="新增账号权限" :width="600" v-model="isVisible" @ok="submitEdit" @cancel.stop="closeModal">
      <a-form :form="addForm">

        <a-form-item label="用户名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入用户名称"
            v-decorator="['name',{ rules: [{ required: true, message: '请输入用户名称' }]}]"/>
        </a-form-item>

        <a-form-item label="手机号码" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入手机号码" maxlength="11"
            v-decorator="['telephone',{validateFirst: true, rules: [{ required: true, message: '请输入手机号码' },{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }]}]"/>
        </a-form-item>

        <a-form-item label="账号状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-select placeholder="请选择账号状态" v-decorator="['status', {rules: [{ required: true, message: '请选择账号状态' }]}]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-divider />

        <a-form-item label="操作权限" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :colon="false">
          <template>
            <a-select mode="multiple" v-decorator="['permissionList']" style="width: 100%" placeholder="please select some permission">
              <a-select-option v-for="(item, index) in alterForm.permissionList" :key="index" :value="item">{{ item }}</a-select-option>
            </a-select>
          </template>
        </a-form-item>

        <a-form-item label="具体权限" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :colon="false">
          <template>
            <a-select mode="multiple" v-decorator="['actionEntitySet']" style="width: 100%" placeholder="please select some actionEntity">
              <a-select-option v-for="(item, index) in alterForm.actionEntitySet" :key="index" :value="item">{{ item }}</a-select-option>
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
        permissionList: ['Unremovable1','Unremovable2','Unremovable3','Unremovable4'],
        actionEntitySet: ['actionEntitySet1','actionEntitySet2','actionEntitySet3','actionEntitySet4'],
      },
      statusMap: {
        1: '正常',
        2: '禁用'
      }
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
        }
      })
    },
  }
}
</script>
