import {getlistData, getCheckout, getDetectionOrderListData} from '../api'
import {RECEIVE_TABLEDATA} from './mutation_types'
import router from '../router/permission'
import moment from 'moment'

export default {
  async getDataList ({commit, state}) {
    const record = (jobId, step) => {
      console.log('点击啦!!!!', jobId, step)
      const param = {
        jobId: jobId,
        step: step
      }
      getCheckout(param).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    }
    console.log('点击啦', state)
    await getlistData(
      {pageNo: state.pageNo, pageSize: state.pageSize},
      {
        type: 9,
        carNumber: state.searchData.carNumber,
        orgName: state.searchData.station,
        seriesName: state.searchData.carMsg,
        checkType: state.searchData.checkType
      }
    ).then(res => {
      console.log(res)
    }).catch(res => {
      const showCheck = (that, row) => { // 点击查看检测报告
        console.log('aaa', that, row)
        record(row.jobId, 1)
        router.push({
          path: '/article_list',
          name: '文章列表',
          params: {
            operId: 1,
            row: row,
            pageNo: state.pageNo,
            pageSize: state.pageSize,
            carNumber: state.searchData.carNumber,
            enter: true,
            print: true
          }
        })
      }
      if (res.data.retcode === 1) {
        const tableData = res.data.data.rows // 表格数据
        // console.log(tableData)
        const pagination = { // 分页数据
          pageSize: res.data.data.pageSize,
          pageNum: res.data.data.pageNo,
          total: res.data.data.total
        }
        let longDatas = []
        let checkButtonArr = []
        let checkArr = []
        const checkButtonList = []// 二维数组
        for (let i = 0; i < tableData.length; i++) {
          tableData[i].checkTypeLaber = tableData[i].checkType === 1 ? '检测' : (tableData[i].checkType === 3 ? '治疗+检测' : '治疗') // 业务类型
          tableData[i].inputTime = moment(tableData[i].inputTime).format('YYYY-MM-DD HH:MM')
          longDatas.push({ // 车辆信息
            jobId: tableData[i].jobId,
            note: [
              tableData[i].factoryName,
              tableData[i].seriesName,
              tableData[i].modelName
            ]
          })
          if (tableData[i].checkType === 1 || tableData[i].checkType === 3) { // 控制显示隐藏的条件    1---检测 2----治疗  3 ----检测+治疗
            checkButtonArr.push({id: tableData[i].jobId, type: 'primary', label: '查看检测报告', isShow: true, size: 'small ', handle: (that, row) => { showCheck(that, row) }})
          } else {
            checkButtonArr.push({id: tableData[i].jobId, type: 'primary', label: '查看检测报告', isShow: false})
          }
        }
        checkButtonArr.forEach((c, index) => {
          if (checkArr.length === 1) { // 如果小数组已经满了，创建一个新的  （两个为一组）
            checkArr = []
          }
          if (checkArr.length === 0) { // 如果minArr是空的，将小数组保存到大数组中
            checkButtonList.push({
              id: c.id,
              btnList: checkArr
            })
          }
          checkArr.push(c)// 将当前分类保存到小数组中
        })
        commit(RECEIVE_TABLEDATA, {tableData, pagination, longDatas, checkButtonList})// 提交一个mutation
      }
    })
  },
  async getDetectionOrderList ({commit, state}) {
    const showEditTest = (that, row) => {
      console.log('点击啦!!!!', that, row, row.jobId)
      const data = state.detectionOrderBtnArrList
      for (let i = 0; i < data.length; i++) {
        if (row.jobId === data[i].jobId) {
          console.log('sssssssss', data[i].jobId)
          console.log(data[i].btnList, data[i].btnList[1].isShow)
          data[i].btnList[0].isShow = false
          data[i].btnList[1].isShow = true
        }
      }
    }
    await getDetectionOrderListData({pageNo: state.pageNo, pageSize: state.pageSize}, {type: 3}).then(res => {
      console.log(res)
    }).catch(res => {
      console.log('待编辑报告数据', res)
      if (res.data.retcode === 1) {
        const tableData = res.data.data.rows
        const pagination = { // 分页数据
          pageSize: res.data.data.pageSize,
          pageNum: res.data.data.pageNo,
          total: res.data.data.total
        }
        let longDatas = []
        let btnArr = []
        let minArr = []
        let detectionOrderBtnArrList = []
        for (let i = 0; i < tableData.length; i++) {
          tableData[i].checkTypeLaber = tableData[i].checkType === 1 ? '检测' : (tableData[i].checkType === 3 ? '治疗+检测' : '治疗') // 业务类型
          tableData[i].inputTime = moment(tableData[i].inputTime).format('YYYY-MM-DD HH:MM')
          longDatas.push({ // 车辆信息
            jobId: tableData[i].jobId,
            note: [
              tableData[i].factoryName,
              tableData[i].seriesName,
              tableData[i].modelName
            ]
          })
          btnArr.push(
            {type: 'primary', label: '上传照片', isShow: true, handle: (that, row) => { showEditTest(that, row) }},
            {type: 'success', label: '完成', isShow: false, handle: (that, row) => this.showEditTest(that, row)}
          )
        }
        btnArr.forEach((c, index) => {
          if (minArr.length === 2) {
            minArr = []
          }
          if (minArr.length === 0) {
            detectionOrderBtnArrList.push({
              jobId: tableData[index / 2].jobId,
              btnList: minArr
            })
          }
          minArr.push(c) // 将当前分类保存到小数组中
        })
        commit(RECEIVE_TABLEDATA, {tableData, pagination, longDatas, detectionOrderBtnArrList})// 提交一个mutation
      }
    })
  }
}
