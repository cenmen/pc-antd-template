<template>

  <div>
    <a-modal title="编辑账号权限" :width="600" v-model="visible" @ok="submitEdit" @cancel="closeModal">
      <a-form :form="modForm">

        <a-form-item label="编号ID" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入编号ID" v-decorator="['userId']" disabled/>
        </a-form-item>

        <a-form-item label="用户名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input
            placeholder="请输入用户名称"
            v-decorator="['name',
                          { rules: [ { required: true, message: '请输入用户名称' } ] } ]"
          />
        </a-form-item>

        <a-form-item label="手机号码" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input
            placeholder="请输入手机号码"
            v-decorator="['telephone',
                          {validateFirst: true, rules: [{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' },{ required: true, message: '请输入手机号码' }]}
            ]"
          />
        </a-form-item>

        <a-form-item label="账号状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-select placeholder="请选择账号状态" v-decorator="['status', {rules: [{ required: true, message: '请选择账号状态' }]}]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-divider />

        <a-form-item label="操作权限" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :colon="false">
          <a-checkbox-group style="width: 100%;"
            v-decorator="['permissionList', { initialValue: record.permissionList }]">
                <a-checkbox v-for="(item, index) in permissionCheckList" :key="index" :value="item" >
                  {{ item }}
                </a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item label="具体权限" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :colon="false">
          <a-checkbox-group style="width: 100%;"
            v-decorator="['actionEntitySet', { initialValue: record.actionEntitySet }]">
                <a-checkbox v-for="(item, index) in actionEntityCheckSet" :key="index" :value="item" >
                  {{ item }}
                </a-checkbox>
          </a-checkbox-group>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>

</template>

<script>
import permissionApi from '@/api/permission'

export default {
  name: 'userPanel',
  props: ['isVisible', 'record', 'permissionCheckList', 'actionEntityCheckSet'],
  data () {
    return {
      visible: false,
      formData: {},
      modForm: this.$form.createForm(this),
      statusMap: {
        1: '正常',
        2: '禁用'
      }
    }
  },
  mounted () {
  },
  watch: {
    isVisible(value) {
      this.visible = value
    },
    record(record) {
      this.$nextTick(() => {
        this.formData = record
        this.modForm.setFieldsValue({
          userId: record.userId,
          name: record.name,
          telephone: record.telephone,
          status: record.status,
          permissionList: record.permissionList,
          actionEntitySet: record.actionEntitySet,
        })
      })
    }
  },
  methods: {
    //关闭对话框
    closeModal() {
      this.$emit('onChangeVisible', {key: 'userPanelVisible', value: false})
    },
    submitEdit () {
      this.modForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          permissionApi.modPermission(values)
            .then((res) => {
              if (res.code === 0) {
                this.closeModal()
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
