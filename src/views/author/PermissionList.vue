<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form :form="searchForm" layout="inline" @submit="onSearch($event,loadPermissionList)">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="编号ID">
              <a-input placeholder="请输入编号ID" v-decorator="['userId']"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码" maxlength="11" v-decorator="['telephone']"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="账号状态">
              <a-select placeholder="请选择" v-decorator="['status']">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">禁用</a-select-option>
                <a-select-option value="2">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" htmlType="submit">查询</a-button>
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
      rowKey="userId"
      @change="onTableChange"
      :pagination="{
        current:current,
        pageSizeOptions:pageSizeOptions,
        pageSize:pageSize,
        showTotal:(total)=>`共 ${total} 条`,
        total: total,
        showSizeChanger: true }"
    >
      <span slot="status" slot-scope="text">
        {{ statusMap[text] }}
      </span>
      <span slot="permission" slot-scope="record">
        <a-tag v-for="(permission, index) in record" :key="index" style="margin: 5px;">{{ permission }}</a-tag>
      </span>
      <span slot="actions" slot-scope="record">
        <a-tag v-for="(actions, index) in record" :key="index" style="margin: 5px;">{{ actions }}</a-tag>
      </span>
      <span slot="option" slot-scope="text, record">
        <a @click="handleEdit(record)">查看</a>
        <a-divider type="vertical" />
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="Are you sure delete this record?" @confirm="deletePermission(record)" okText="Yes" cancelText="No">
          <a href="javascript:void(0);">删除</a>
        </a-popconfirm>
      </span>
    </a-table>

    <user-panel 
      :isVisible="userPanelVisible"
      :record="currentRecord"
      :permissionCheckList="permissionCheckList"
      :actionEntityCheckSet="actionEntityCheckSet"
      @onChangeVisible="onChangeVisible">
    </user-panel>

    <add-permission :isVisible.sync="addPerVisible"></add-permission>

  </a-card>
</template>

<script>
import permissionApi from '@/api/permission'
import { list } from '@/mixins/list'
import addPermission from './components/addPermission' // 新增用户
import userPanel from './components/userPanel' // 编辑用户

export default {
  name: 'PermissionList',
  mixins: [list],
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
      permissionCheckList: [], //总权限集合
      actionEntityCheckSet: [], //总子集权限集合
      alterForm: {
        permissionList: ['Unremovable1','Unremovable2','Unremovable3','Unremovable4'],
        actionEntitySet: ['actionEntitySet1','actionEntitySet2','actionEntitySet3','actionEntitySet4'],
        removePermission: [],
        removeActions: []
      },
      columns: [
        {
          title: '编号',
          key: 'userId',
          dataIndex: 'userId'
        }, {
          title: '用户名称',
          key: 'name',
          dataIndex: 'name'
        }, {
          title: '手机号码',
          key: 'telephone',
          dataIndex: 'telephone'
        }, {
          title: '账号状态',
          key: 'status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        }, {
          title: '操作权限',
          key: 'permissionList',
          width: 500,
          dataIndex: 'permissionList',
          scopedSlots: { customRender: 'permission' }
        }, {
          title: '具体权限',
          key: 'actionEntitySet',
          width: 300,
          dataIndex: 'actionEntitySet',
          scopedSlots: { customRender: 'actions' }
        }, {
          title: '操作',
          key: 'option',
          dataIndex: 'option',
          scopedSlots: { customRender: 'option' }
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
    this.loadAllPermissionCheckList()
    this.loadAllActionCheckList()
  },
  methods: {
    // emit visible
    onChangeVisible(data) {
      this[data.key] = data.value
    },
    // 加载列表数据
    loadPermissionList () {
      const params = this.searchForm.getFieldsValue()
      params.pageNum = this.current;
      params.pageSize = this.pageSize;
      permissionApi.getPermissonList(params).then(res => {
        if (res.code === 0) {
          this.loadData = res.result.list
          this.total = res.result.total
          this.resetSelected()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 加载总路由数据
    loadAllPermissionCheckList () {
      permissionApi.getAllPermissonList().then(res => {
        if (res.code === 0) {
          this.permissionCheckList = res.result.list
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 加载总子集数据
    loadAllActionCheckList () {
      permissionApi.getAllActionList().then(res => {
        if (res.code === 0) {
          this.actionEntityCheckSet = res.result.list
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onTableChange(page) {
      this.current = page.current
      this.pageSize = page.pageSize
      this.loadPermissionList()
    },
    // 打开编辑框初始化信息
    handleEdit (record) {
      this.userPanelVisible = true
      this.currentRecord = record
    },
    // delete a permission
    deletePermission(record) {
      permissionApi.deletePermission().then(res => {
        if (res.code === 0) {
          this.$message.success(res.message || '删除成功')
          // 重新获取列表数据
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}
</script>
