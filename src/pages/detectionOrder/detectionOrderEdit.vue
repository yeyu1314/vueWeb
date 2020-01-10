<!--待编辑报告-->
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
      size='medium '
      :isSelection='true'
      :isIndex='true'
      :isHandle='true'
      :tableData='editDetectionTableData'
      :tableCols='tableCols'
      :newBtnList='detectionOrderEditBtnArrList'
      :isPagination='true'
      :tablePage='editDetectionPagination'
      :longDatas="editDetectionLongData"
    >
    </table-com>
    <record-form
      :that='that'
      :redordData='redordData'
      :redordCols='redordCols'
      :isShowRecord="isShowRecord"
      @closeTip="closeTip"
    ></record-form>
  </div>
</template>

<script>
import tableCom from '../../components/tableCompnment/tableForm'
import searchCom from '../../components/tableCompnment/searchForm'
import recordForm from '../../components/tableCompnment/recordForm'
import {getOperatingRecord, frozenOrder} from '../../api'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'detectionOrderEdit',
  components: {
    tableCom,
    searchCom,
    recordForm
  },
  data () {
    return {
      that: this,
      searchForm: [ // 搜索栏
        {type: 'Input', prop: 'carNumber', width: '180px', placeholder: '请输入车牌'}
      ],
      searchHandle: [ // 搜索按钮
        {label: '查询', icon: 'el-icon-search', type: 'primary', handle: () => this.searchNews()}
      ],
      tableCols: [// 表头
        {label: '车牌', prop: 'carNumber'},
        {label: '车辆信息', type: 'longData'},
        {label: '下单时间', prop: 'inputTime'},
        {label: '业务类型', prop: 'checkTypeLaber'},
        {label: '故障描述', prop: 'note'},
        {label: '发动机缸数量', prop: 'carCylinder'},
        {label: '当前操作人', prop: 'operatorName'},
        {label: '操作', type: 'button'},
        /* {
          label: '操作',
          type: 'Button',
          btnList: [
            {type: 'warning', isShow: true, label: '编辑报告', handle: (that, row) => this.showReport(that, row)},
            {type: 'success', isShow: true, label: '编辑', handle: (that, row) => this.editReport(that, row)}
          ]
        }, */
        {
          label: '操作记录',
          type: 'Button',
          btnList: [
            {type: 'success', isShow: true, label: '查看', handle: (that, row) => this.showRecord(that, row)}
          ]
        },
        {
          label: '冻结',
          type: 'Button',
          btnList: [
            {type: 'danger', isShow: true, label: '冻结工单', handle: (that, row) => this.frozen(that, row)}
          ]
        }
      ],
      isShowRecord: false // 操作记录弹窗
    }
  },
  created () {
    this.getDetectionOrderEditList()
  },
  computed: {
    ...mapState(['editDetectionTableData', 'editDetectionPagination', 'editDetectionLongData', 'pageNo', 'pageSize', 'searchData', 'redordData', 'redordCols', 'detectionOrderEditBtnArrList'])// 读数据
  },
  methods: {
    ...mapActions(['getDetectionOrderEditList']),
    showRecord (that, row) { // 点击操作记录
      // console.log(that, row)
      this.isShowRecord = true
      getOperatingRecord({ id: row.jobId })
        .then(res => {
          console.log(res)
        }).catch(res => {
          console.log('操作记录', res)
          const data = res.data.data.list
          this.$store.state.redordData = data
        })
    },
    closeTip () { // 关闭弹窗
      this.isShowRecord = false
    },
    frozen (that, row) { // 冻结
      this.$confirm('此操作将冻结此工单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(that, row)
        frozenOrder({jobId: row.jobId, version: row.version})
          .then(res => {
            console.log(res)
          }).catch(res => {
            console.log(res)
            this.getDetectionOrderList()
          })
      })
    },
    showReport (that, row) {
      console.log(that, row)
    },
    editReport (that, row) {
      console.log(that, row)
    }
  }
}
</script>

<style scoped>

</style>
