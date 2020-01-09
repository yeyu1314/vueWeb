import {getlistData, getCheckout, getDetectionOrderListData, editDetectionOrder, getDetectionImgUploadData} from '../api'
import {RECEIVE_IMG_UPLOAD_TABLEDATA, RECEIVE_TABLEDATA} from './mutation_types'
import router from '../router/permission'
import moment from 'moment'
import {Message, MessageBox} from 'element-ui'

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
    const showEditTest = (that, row) => { // 开始编辑
      console.log('点击啦!!!!', that, row, row.jobId)
      editDetectionOrder({jobId: row.jobId, version: row.version})
        .then(res => {
          console.log(res)
        }).catch(res => {
          console.log(res)
          if (res.data.retcode === 1) {
            const data = state.detectionOrderBtnArrList
            Message.success('请再次点击进入报告编辑')
            for (let i = 0; i < data.length; i++) {
              if (row.jobId === data[i].jobId) {
                data[i].btnList[0].isShow = false
                data[i].btnList[1].isShow = true
              }
            }
            // getDetectionOrderListData({pageNo: state.pageNo, pageSize: state.pageSize}, {type: 3})
          }
        })
    }
    const starEdit = (that, row) => { // 编辑检测报告
      console.log(that, row)
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
          if (tableData[i].jobCode === 100) {
            btnArr.push(
              {type: 'success', label: '开始编辑', isShow: true, handle: (that, row) => { showEditTest(that, row) }},
              {type: 'warning', label: '编辑检测报告', isShow: false, handle: (that, row) => { starEdit(that, row) }}
            )
          } if (tableData[i].jobCode === 210 || tableData[i].jobCode === 220 || tableData[i].jobCode === 221) {
            btnArr.push(
              {type: 'success', label: '开始编辑', isShow: false, handle: (that, row) => { showEditTest(that, row) }},
              {type: 'warning', label: '编辑检测报告', isShow: true, handle: (that, row) => { starEdit(that, row) }}
            )
          }
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
  },

  async getDetectionImgUploadList ({commit, state}) {
    const showEditTest = (that, row) => {
      MessageBox('此操作将提交照片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Message.success('操作成功', 'success')
        const data = state.detectionImgUploadBtnArrList
        for (let i = 0; i < data.length; i++) {
          if (row.jobId === data[i].jobId) {
            data[i].btnList[1].isShow = true
          }
        }
      })
    }
    const finshUpload = (that, row) => {
      console.log(that, row)
    }
    await getDetectionImgUploadData({pageNo: state.pageNo, pageSize: state.pageSize}, {type: 2}).then(res => {
      console.log(res)
    }).catch(res => {
      if (res.data.retcode === 1) {
        const tableData = res.data.data.rows
        console.log('待上传照片', tableData)
        const pagination = { // 分页数据
          pageSize: res.data.data.pageSize,
          pageNum: res.data.data.pageNo,
          total: res.data.data.total
        }
        let longDatas = []
        let imgBtnArr = []
        let minArr = []
        let detectionImgUploadBtnArrList = []
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
          if (tableData[i].jobCode === 20) {
            imgBtnArr.push(
              {type: 'primary', label: '上传照片', isShow: true, handle: (that, row) => { showEditTest(that, row) }},
              {type: 'success', label: '完成', isShow: false}
            )
          } if (tableData[i].jobCode === 30 || tableData[i].jobCode === 31 || tableData[i].jobCode === 32) {
            imgBtnArr.push(
              {type: 'primary', label: '上传照片', isShow: true, handle: (that, row) => { showEditTest(that, row) }},
              {type: 'success', label: '完成', isShow: true, handle: (that, row) => { finshUpload(that, row) }}
            )
          }
        }
        imgBtnArr.forEach((c, index) => {
          if (minArr.length === 2) {
            minArr = []
          }
          if (minArr.length === 0) {
            detectionImgUploadBtnArrList.push({
              jobId: tableData[index / 2].jobId,
              btnList: minArr
            })
          }
          minArr.push(c) // 将当前分类保存到小数组中
        })
        commit(RECEIVE_IMG_UPLOAD_TABLEDATA, {tableData, pagination, longDatas, detectionImgUploadBtnArrList})// 提交一个mutation
      }
    })
  }
}
