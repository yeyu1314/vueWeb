import net from './ajax'

export const getlistData = (param, data) => net.request('admin/order/queryListPage', 'post', param, data)

export const getOpaction = ({id}) => net.request('admin/order/queryOrderById', 'post', {id})

export const getRemarkData = ({id}) => net.request('admin/order/queryProductInfoList', 'post', {id})

export const getCode = ({userPhone}) => net.request('admin/log/getSmsCode', 'post', {userPhone})

export const logIn = ({params}) => net.request('admin/log/webLogin', 'post', {params})
