<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="编号ID">
              <a-input placeholder="请输入编号ID"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="账号状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">禁用</a-select-option>
                <a-select-option value="2">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table :columns="columns" :dataSource="loadData" rowKey="id">
      <span slot="status" slot-scope="text">
        {{ statusMap[text] }}
      </span>
      <span slot="permission" slot-scope="record">
        <a-tag v-for="(permission, index) in record" :key="index" style="margin: 5px;">{{ permission }}</a-tag>
      </span>
      <span slot="actions" slot-scope="record">
        <a-tag v-for="(actions, index) in record" :key="index" style="margin: 5px;">{{ actions }}</a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">查看</a>
        <a-divider type="vertical" />
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleEdit(record)">删除</a>
      </span>
    </a-table>

    <a-modal title="编辑账号权限" :width="600" v-model="visible" @ok="submitEdit">
      <a-form :form="modForm">

        <a-form-item label="编号ID" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入编号ID" v-decorator="['id']" disabled/>
        </a-form-item>

        <a-form-item label="用户名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入用户名称" v-decorator="['name', 
            { rules: [ { required: true, message: '请输入用户名称' } ] } ]"
          />
        </a-form-item>

        <a-form-item label="手机号码" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :colon="false">
          <a-input placeholder="请输入手机号码" v-decorator="['telephone', 
            { 
              validateFirst: true,
              rules: [ 
                { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }, 
                { required: true, message: '请输入手机号码' } ] } ]"
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
          <template v-for="(item, index) in alterForm.permissionList">
            <a-tag :key="index" closable :afterClose="() => handleCloseTag(item, 'permission')">
              {{ index }}
            </a-tag>
          </template>
        </a-form-item>

        <a-form-item label="具体权限" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :colon="false">
          <template v-for="(item, index) in alterForm.actionEntitySet">
            <a-tag :key="index" closable :afterClose="() => handleCloseTag(item, 'actions')">
              {{ index }}
            </a-tag>
          </template>
        </a-form-item>

      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
import permissionApi from '@/api/permission'

export default {
  name: 'permissionList',
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

      visible: false,
      form: null,
      modForm: this.$form.createForm(this),
      alterForm: {
        permissionList: [],
        actionEntitySet: [],
        removePermission: [],
        removeActions: []
      },
      columns: [
        {
          title: '编号',
          key: 'id',
          dataIndex: 'id'
        },{
          title: '用户名称',
          key: 'name',
          dataIndex: 'name'
        },{
          title: '手机号码',
          key: 'telephone',
          dataIndex: 'telephone'
        },{
          title: '账号状态',
          key: 'status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },{
          title: '操作权限',
          key: 'permissionList',
          width: 500,
          dataIndex: 'permissionList',
          scopedSlots: { customRender: 'permission' }
        },{
          title: '具体权限',
          key: 'actionEntitySet',
          width: 300,
          dataIndex: 'actionEntitySet',
          scopedSlots: { customRender: 'actions' }
        },{
          title: '操作',
          key: 'action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 权限列表数据
      loadData: [],
      selectedRowKeys: [],
      selectedRows: [],
      statusMap: {
        1: '正常',
        2: '禁用'
      }
    }
  },
  created () {
    this.loadPermissionList()
  },
  methods: {
    loadPermissionList () {
      permissionApi.getPermissonList().then(response => {
          this.loadData = response.result
        }).catch(error => {
          console.log(error)
        })
    },
    handleEdit (record) {
      this.visible = true
      this.$nextTick(() => {
        this.alterForm.permissionList = record.permissionList
        this.alterForm.actionEntitySet = record.actionEntitySet
        this.modForm.setFieldsValue({
          id: record.id,
          name: record.name,
          telephone: record.telephone,
          status: record.status,
        });
      });
    },
    submitEdit () {
      this.modForm.validateFields((err, values) => {
          if (!err) {
            const permissionList = [...this.alterForm.permissionList].filter(item => [...this.alterForm.removePermission].every(remove => remove !== item))
            const actionEntitySet = [...this.alterForm.actionEntitySet].filter(item => [...this.alterForm.removeActions].every(remove => remove !== item))
            values.permissionList = permissionList
            values.actionEntitySet = actionEntitySet
            console.log(values)
            debugger
              permissionApi.modPermission(params)
                .then((res) => {
                    if (res.code === 200) {
                        this.$message.success(res.message || '修改成功');
                    } else {
                        this.$message.error(res.message)
                    }
                })
                .finally(() => {});
            }
        });

    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleCloseTag (item, str) {
      if (str === 'permission') {
        // const tags = this.alterForm.permissionList.filter(tag => tag !== item)
        this.alterForm.removePermission.push(item)
      } else if (str === 'actions') {
        this.alterForm.removeActions.push(item)
      } 
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
