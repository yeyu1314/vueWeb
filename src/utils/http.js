/**
 * @description 配置网络请求
 * @author luokaibin chaizhiyang
 */
import axios from 'axios'
import { Message } from 'element-ui'
import router from 'vue-router'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
axios.defaults.timeout = 300000; // 请求超时5fen
 
//请求时loading配置
var loading;
function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "Loading...",
    background: 'rgba(0, 0, 0, 0.5)',
    target: document.querySelector('.loading-area') //设置加载动画区域
  });
}
function endLoading() {
  loading.close();
}
var needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
// 请求拦截
axios.interceptors.request.use(config => {
  showFullScreenLoading();
  if (VueCookies.isKey('userinfo')) {
    const token = getToken(config);
    config.headers['token'] = token;
  }
  return config;
}, err => {
  tryHideFullScreenLoading();
  Message.error({
    message: '请求超时!'
  });
  return Promise.resolve(err);
})
// 响应拦截
axios.interceptors.response.use(res => {
  tryHideFullScreenLoading();
  switch (res.data.code) {
    case 200:
      return res.data.result;
    case 401:
      Message.error({
        message: res.data.message
      });
      router.push('/login');
      // VueCookies.remove('userinfo');
      return Promise.reject(res);
    case 201:
      Message.error({
        message: res.data.message
      });
    case 403:
      Message.warning({
        message: res.data.message
      });
      return Promise.reject(res);
    default:
      return Promise.reject(res);
  }
}, err => {
  tryHideFullScreenLoading();
  if (!err.response) {
    return false;
  }
  switch (err.response.status) {
    case 500:
      Message.error({
        message: '服务器出小差了⊙﹏⊙∥'
      });
      break;
    case 504:
      Message.error({
        message: '服务器被吃了⊙﹏⊙∥'
      });
      break;
    case 404:
      Message.error({
        message: '服务器被吃了⊙﹏⊙∥'
      });
      break;
    case 403:
      Message.error({
        message: '权限不足,请联系管理员!'
      });
      break;
    default:
      Message.error({
        message: '网络超时'
      });
  }
  return Promise.reject(err);
})
// 请求方式的配置
export const postJsonRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const getRequest = (url, data = {}) => {
  return axios({
    method: 'get',
    params: data,
    url: url,
  });
}