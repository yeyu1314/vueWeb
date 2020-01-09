<template>
  <div class="ces-main">
    <search-com
      size='medium '
      labelWidth = '80px'
      :searchData = "searchData"
      :searchForm = "searchForm"
      :searchHandle="searchHandle">
    </search-com>
    <table-com
      :that='that'
      size='small '
      :isSelection='true'
      :isIndex='true'
      :isHandle='true'
      :tableData='imgUploadTableData'
      :tableCols='tableCols'
      :newBtnList="detectionImgUploadBtnArrList"
      :isPagination='true'
      :tablePage='pagination'
      :longDatas="longDatas"
    >
    </table-com>

  </div>
</template>

<script>
import tableCom from '../../components/tableCompnment/tableForm'
import searchCom from '../../components/tableCompnment/searchForm'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'detectionImgUpload',
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
      newBtnList: [],

      /*  {id:1,carNumber:'粤B555'},
          {id:2,carNumber:'粤B555'},
          {id:3,carNumber:'粤B555'},

      {id : 1,btnList:[
        {type:'primary',label:'上传照片',isShow:true, handle:(row,that)=>this.showEditTest(row,that)},
        {type:'success',label:'完成',isShow:false, handle:row=>''}
      ]
      },
      {id : 2,btnList:[
        {type:'primary',label:'上传照片',isShow:true, handle:(row,that)=>this.showEditTest(row,that)},
        {type:'success',label:'完成',isShow:false, handle:row=>''}
      ]
      },
      {id : 3,btnList:[
        {type:'primary',label:'上传照片',isShow:true, handle:(row,that)=>this.showEditTest(row,that)},
        {type:'success',label:'完成',isShow:false, handle:row=>''}
      ]
      }, */

      orderPageShowOrgName: false
    }
  },
  created () {
    this.getDetectionImgUploadList()
  },
  components: {
    tableCom,
    searchCom
  },
  computed: {
    ...mapState(['imgUploadTableData', 'pagination', 'longDatas', 'pageNo', 'pageSize', 'searchData', 'detectionImgUploadBtnArrList'])// 读数据
  },
  methods: {
    ...mapActions(['getDetectionImgUploadList'])
  }
}
</script>

<style scoped>

</style>
