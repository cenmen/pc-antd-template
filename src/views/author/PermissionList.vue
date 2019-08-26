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

    <a-modal title="编辑账号权限" :width="600" v-model="visible" @ok="submitEdit">
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

    <add-permission :isVisible.sync="addPerVisible"></add-permission>

  </a-card>
</template>

<script>
import permissionApi from '@/api/permission'
import { list } from '@/mixins/list'
import addPermission from './components/addPermission'

export default {
  name: 'PermissionList',
  mixins: [list],
  components: {
    addPermission
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

      visible: false,
      addPerVisible: false,
      searchForm: this.$form.createForm(this),
      modForm: this.$form.createForm(this),
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
  },
  methods: {
    loadPermissionList () {
      const params = this.searchForm.getFieldsValue()
      params.pageNum = this.current;
      params.pageSize = this.pageSize;
      permissionApi.getPermissonList(params).then(response => {
        if (response.code === 200) {
          this.loadData = response.result
          this.total = response.count
          this.resetSelected()
        } else {
          // mock
          const permissionList = []
          for (let i = 0; i < 50; i++) {
            const userInfo = {
              'userId': 'B201' + i,
              'name': '天野远子',
              'status': 1,
              'telephone': '13420121154',
              'permissionList': ['dashboard', 'exception', 'result', 'profile', 'table', 'form', 'order', 'permission', 'role', 'user', 'support', 'author'], // 路由页面权限
              'actionEntitySet': ['add', 'query', 'update', 'delete', 'get']
            }
            permissionList.push(userInfo)
          }
          this.loadData = permissionList
          this.$message.error(response.message)
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
      this.visible = true
      this.$nextTick(() => {
        this.alterForm.permissionList = record.permissionList
        this.alterForm.actionEntitySet = record.actionEntitySet
        this.modForm.setFieldsValue({
          userId: record.userId,
          name: record.name,
          telephone: record.telephone,
          status: record.status,
          permissionList: record.permissionList,
          actionEntitySet: record.actionEntitySet,
        })
      })
    },
    // delete a permission
    deletePermission(record) {
      this.$message.success(record.userId)
    },
    submitEdit () {
      this.modForm.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          permissionApi.modPermission(values)
            .then((res) => {
              if (res.code === 200) {
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
