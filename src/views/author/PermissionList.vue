<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form :form="searchForm" layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="编号ID">
              <a-input placeholder="请输入编号ID" v-decorator="['id']"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="用户名称">
              <a-input placeholder="请输入用户名称" v-decorator="['name']"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="loadPermissionList">查询</a-button>
              <a-button style="margin-left: 8px" @click="resetFieldsAndSelected">重置</a-button>
              <a-button style="margin-left: 8px" type="primary" icon="plus" @click="addPerVisible= true">新增</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      :columns="columns"
      :dataSource="loadData"
      rowKey="id"
      :pagination="false"
    >
      <span slot="permission" slot-scope="record">
        <a-tag v-for="(permission, index) in record" :key="index" style="margin: 5px;">{{ permission }}</a-tag>
      </span>
      <span slot="option" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="Are you sure delete this record?" @confirm="deletePermission(record.id)" okText="Yes" cancelText="No">
          <a href="javascript:void(0);">删除</a>
        </a-popconfirm>
      </span>
    </a-table>

    <user-panel 
      :isVisible.sync="userPanelVisible"
      :record="currentRecord"
      :permissionCheckList="permissionCheckList"
      @onSubmit="loadPermissionList">
    </user-panel>

    <add-permission :isVisible.sync="addPerVisible" @onSubmit="loadPermissionList"></add-permission>

  </a-card>
</template>

<script>
import permissionApi from '@/api/permission'
import { list } from '@/mixins/list'
import addPermission from './components/addPermission' // 新增用户
import userPanel from './components/userPanel' // 编辑用户

export default {
  name: 'PermissionList',
  // mixins: [list],
  components: {
    addPermission,
    userPanel
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      userPanelVisible: false, // 编辑用户
      addPerVisible: false, // 新增用户
      searchForm: this.$form.createForm(this),
      modForm: this.$form.createForm(this),
      currentRecord: {},
      permissionCheckList: ['profile','author','center','detail','option'], //总权限集合
      columns: [
        {
          title: 'ID',
          key: 'id',
          dataIndex: 'id'
        }, {
          title: '用户名称',
          key: 'name',
          dataIndex: 'name'
        }, {
          title: '密码',
          key: 'password',
          dataIndex: 'password'
        }, {
          title: '操作权限',
          key: 'permission',
          width: 500,
          dataIndex: 'permission',
          scopedSlots: { customRender: 'permission' }
        }, {
          title: '操作',
          key: 'option',
          dataIndex: 'option',
          scopedSlots: { customRender: 'option' }
        }
      ],
      // 权限列表数据
      loadData: [],
    }
  },
  created () {
    this.loadPermissionList()
  },
  methods: {

    // 加载列表数据
    loadPermissionList () {
      const params = this.searchForm.getFieldsValue()
      permissionApi.List(params).then(res => {
        if (res.code === 200) {
          this.loadData = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 打开编辑框初始化信息
    handleEdit (record) {
      this.userPanelVisible = true
      this.currentRecord = record
    },

    // 确认删除
    deletePermission(id) {
      permissionApi.Delete({id}).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message || '删除成功')
          this.loadPermissionList()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    //重置表单
    resetFieldsAndSelected() {
      this.searchForm.resetFields();
    },
  }
}
</script>
