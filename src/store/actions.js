import {getlistData} from '../api'
import {RECEIVE_TABLEDATA} from './mutation_types'

export default {
  async getDataList ({commit, state}) {
    console.log('点击啦')
    await getlistData(
      {pageNo: 1, pageSize: 10},
      {
        type: 9,
        carNumber: '',
        orgName: '',
        seriesName: '',
        checkType: ''
      }
    ).then(res => {
      // if (res.retcode === 1) {
      //   this.listData = res.data.rows
      //   this.total = res.data.total
      // } else {
      //   net.message(this, "获取数据失败", "warning")
      // }
      console.log(res)
    }).catch(res => {
      // console.log('promise catch err', res.data)
      if (res.data.retcode === 1) {
        console.log('promise catch err', res.data.data)
        const tableData = res.data.data.rows
        console.log(tableData)
        const pagination = {
          pageSize: res.data.data.pageSize,
          pageNum: res.data.data.pageNo,
          total: res.data.data.total
        }
        let longDatas = []
        for (let i = 0; i < tableData.length; i++) {
          longDatas.push({
            jobId: tableData[i].jobId,
            note: [
              tableData[i].factoryName,
              tableData[i].seriesName,
              tableData[i].modelName
            ]
          })
        }
        commit(RECEIVE_TABLEDATA, {tableData, pagination, longDatas})// 提交一个mutation
      }
    })
    // console.log(result)
  }
}
