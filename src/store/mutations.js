/*
直接更新state的多个方法的对象
 */
import {RECEIVE_TABLEDATA, RECEIVE_IMG_UPLOAD_TABLEDATA} from './mutation_types'
export default {
  [RECEIVE_TABLEDATA] (state, {tableData, pagination, longDatas, checkButtonList, detectionOrderBtnArrList}) {
    // console.log(checkButtonList)
    state.tableData = tableData
    state.pagination = pagination
    state.longDatas = longDatas
    state.checkButtonList = checkButtonList
    state.detectionOrderBtnArrList = detectionOrderBtnArrList
  },

  [RECEIVE_IMG_UPLOAD_TABLEDATA] (state, {tableData, pagination, longDatas, detectionImgUploadBtnArrList}) {
    console.log(tableData)
    state.imgUploadTableData = tableData
    state.pagination = pagination
    state.longDatas = longDatas
    state.detectionImgUploadBtnArrList = detectionImgUploadBtnArrList
  }
}
