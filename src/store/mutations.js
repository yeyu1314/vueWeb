/*
直接更新state的多个方法的对象
 */
import {RECEIVE_TABLEDATA} from './mutation_types'
export default {
  [RECEIVE_TABLEDATA] (state, {tableData, pagination, longDatas, checkButtonList, detectionOrderBtnArrList}) {
    // console.log(checkButtonList)
    state.tableData = tableData
    state.pagination = pagination
    state.longDatas = longDatas
    state.checkButtonList = checkButtonList
    state.detectionOrderBtnArrList = detectionOrderBtnArrList
  }
}
