export const list = { // 列表页mixins,有表格搜索相关属性和方法
  data () {
    return {
      selectedRowKeys: [],
      selected: [],
      searchForm: '',
      searchLoading: false,
      current: 1,
      pageSize: 10,
      total: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50', '80', '100']
    }
  },

  created () {
    this.searchForm = this.$form.createForm(this)
  },

  methods: {
    onRowChange (rowKey, rows) {
      this.selectedRowKeys = rowKey
      this.selected = rows
    },
    resetSelected () {
      this.selectedRowKeys = []
      this.selected = []
    },
    resetFieldsAndSelected () {
      this.searchForm.resetFields()
      this.resetSelected()
    },
    resetPage () {
      this.current = 1
    },
    onSearch (e, cb) {
      e.preventDefault()
      this.resetPage()
      this.searchLoading = true
      cb().finally(() => {
        this.searchLoading = false
      })
    }
  }
}
