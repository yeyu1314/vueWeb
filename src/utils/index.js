import * as http from './http'
const install = (Vue, opts = {}) => {
  if (install.installed) return
  Vue.prototype.$http = http
}
export default install
