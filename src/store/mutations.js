/*
直接更新state的多个方法的对象
 */
import {RECEIVE_TABLEDATA} from './mutation_types'
export default {
  [RECEIVE_TABLEDATA] (state, {tableData, pagination, longDatas}) {
    // console.log(longDatas)
    state.tableData = tableData
    state.pagination = pagination
    state.longDatas = longDatas
  }
}
