import {getlistData} from '../api'

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
    })
      .catch(res => {
        console.log('promise catch err', res.data)
        if (res.data.retcode === 1) {
          console.log('promise catch err', res.data)
        }
      })
    // console.log(result)
  }
}
