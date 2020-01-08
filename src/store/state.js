/*
  状态管理对象
*/
// let checkTypes = [{label: '全部', value: '0'}, {label: '检测', value: '1'}, {
//   label: '治疗',
//   value: '2'
// }, {label: '检测+治疗', value: '3'}]
// let checkTypeProps = {label: 'label', value: 'value'}
export default {
  tableData: [],
  pagination: {// 页数...
    pageSize: 10,
    pageNum: 1,
    total: 0
  },
  longDatas: [],
  pageNo: 1,
  pageSize: 10,
  searchData: {
    carNumber: null,
    carMsg: null,
    station: null,
    checkType: null
  },
  checkButtonList: [],
  redordCols: [ // 操作记录表头
    {label: '操作人', prop: 'userName'},
    {label: '操作内容', prop: 'remarks'},
    {label: '操作时间', prop: 'inputTime'}
  ],
  redordData: [] // 操作记录数据
}
