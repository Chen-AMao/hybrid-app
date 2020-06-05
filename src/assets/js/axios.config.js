// axios 配置
import Vue from 'vue'
import axios from 'axios'

// 设置axios请求baseUrl
axios.defaults.baseURL = 'https://easy-mock.com/mock/5ceb51b551e3de74af53fe54/imooc/api'

/**
 * 设置拦截器，interceptors响应处理，
 * 所有使用axios的请求响应，都会优先回调到拦截器中
 * 在正确的返回情况下，数据会优先进入第一个回调方法
 * 在请求错误的情况下，错误会进入第二个回调方法
 */

axios.interceptors.response.use((response) => {
  // 统一处数据
  return response.data
}, (error) => {
  // 处理错误的响应
  return Promise.reject(error)
})

// 绑定到vue原型中，组件中: this.$http -> axios
Vue.prototype.$http = axios
