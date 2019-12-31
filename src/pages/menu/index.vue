<template>
  <div class="ces-main">
    <search-com
      size='medium '
      labelWidth='80px'
      :searchData="searchData"
      :searchForm="searchForm"
      :searchHandle="searchHandle"
    ></search-com>
    <table-com
      :that='that'
      size='small '
      :isSelection='true'
      :isIndex='true'
      :isHandle='true'
      :tableData='tableData'
      :tableCols='tableCols'
      :newBtnList="newBtnList"
      :isPagination='true'
      :tablePage='pagination'
      :longDatas="longDatas"
    >
    </table-com>
    <edit-com
      :that="that"
      :editCfg="editCfg"
      :editData="editData"
      :editRules="editRules"
      :showEdit="showEdit"
      :title="title"
      @closeTip="closeTip"
    ></edit-com>

  </div>
</template>

<script>
import tableCom from '../../components/tableCompnment/tableForm'
import searchCom from '../../components/tableCompnment/searchForm'
import editCom from '../../components/tableCompnment/editForm'

export default {
  components: {
    tableCom,
    searchCom,
    editCom
  },
  data() {
    let checkTypes = [{label: '全部', value: '0'}, {label: '检测', value: '1'}, {
      label: '治疗',
      value: '2'
    }, {label: '检测+治疗', value: '3'}]
    let checkTypeProps = {label: 'label', value: 'value'}
    return {
      that: this,
      // 查询表单
      searchData: {
        carNumber: null
      },
      searchForm: [// 搜索栏
        {type: 'Input', prop: 'carNumber', width: '180px', placeholder: '请输入车牌'}
      ],
      searchHandle: [ // 搜索按钮
        {label: '查询', icon: 'el-icon-search', type: 'primary', handle: () => this.searchNews()}
      ],
      tableData: [
        {id: 1, carNumber: '粤B555'},
        {id: 2, carNumber: '粤B555'},
        {id: 3, carNumber: '粤B555'}], //  表格数据
      tableCols: [// 表头
        {label: '车牌', prop: 'carNumber'},
        {label: '车辆信息', type: 'longData'},
        {label: '下单时间', prop: 'inputTime'},
        {label: '业务类型', prop: 'checkType'},
        {label: '故障描述', prop: 'note'},
        {label: '发动机缸数量', prop: 'carCylinder'},
        {label: '当前操作人', prop: 'operatorName'},
        {label: '操作', type: 'button'},
        {
          label: '冻结',
          type: 'Button',
          btnList: [
            {type: 'danger', label: '冻结工单', handle: (row, that) => this.showRecord(row, that)}
          ]
        }
      ],
      newBtnList: [
        {
          id: 1,
          btnList: [
            {type: 'primary', label: '上传照片', isShow: true, handle: (row, that) => this.showEditTest(row, that)},
            {type: 'success', label: '完成', isShow: false, handle: row => ''}
          ]
        },
        {
          id: 2,
          btnList: [
            {type: 'primary', label: '上传照片', isShow: true, handle: (row, that) => this.showEditTest(row, that)},
            {type: 'success', label: '完成', isShow: true, handle: row => ''}
          ]
        },
        {
          id: 3,
          btnList: [
            {type: 'primary', label: '上传照片', isShow: true, handle: (row, that) => this.showEditTest(row, that)},
            {type: 'success', label: '完成', isShow: true, handle: row => ''}
          ]
        }
      ],

      longDatas: [],
      pagination: {// 页数...
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      orderPageShowOrgName: false,
      editCfg: [// 编辑form表单
        {label: '车牌', prop: 'carNumber', type: 'input', width: '280px'},
        {label: '车系', prop: 'carMsg', type: 'input', width: '280px'},
        {label: '维修站', prop: 'station', type: 'input', width: '280px'},
        {label: '下单时间', prop: 'inputTime', type: 'dateTime', width: '280px'},
        {label: '业务类型', prop: 'checkType', type: 'select', options: checkTypes, props: checkTypeProps, width: '280px'}
      ],
      editData: {// 编辑form数据
        carNumber: null,
        carMsg: null,
        station: null,
        checkType: null,
        inputTime: null
      },
      showEdit: false,
      title: '编辑',
      editRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    showRecord (row, that) {
      console.log(row)
      console.log(that)
      this.showEdit = true
    },
    closeTip () {
      this.showEdit = false
    }
  }
}
</script>

<style>
</style>
