// axios 配置
import Vue from 'vue'
import axios from 'axios'

// 设置axios请求baseUrl
// axios.defaults.baseURL = 'https://easy-mock.com/mock/5ceb51b551e3de74af53fe54/imooc/api'
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'

/**
 * 所有使用axios发送的请求，在请求发送出去之前，都会进入到这个方法
 * 在这里，为所有的请求添加上token
 */
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = '76576b10-a70f-11ea-ad19-03481aa896cd'
  } else {
    config.params = {
      token: '76576b10-a70f-11ea-ad19-03481aa896cd'
    }
  }
  // 不要忘记config对象需要return
  return config
})

/**
 * 设置拦截器，interceptors响应处理，
 * 所有使用axios的请求响应，都会优先回调到拦截器中
 * 在正确的返回情况下，数据会优先进入第一个回调方法
 * 在请求错误的情况下，错误会进入第二个回调方法
 */

axios.interceptors.response.use((response) => {
  // 统一处数据， 使组件中的请求只获取到需要的业务数据，
  // 而不需要去关注返回的状态码等与业务无关的数据
  console.log('interceptors response')
  return response.data.data
}, (error) => {
  // 处理错误的响应
  console.log('interceptors error', error)
  return Promise.reject(error)
})

// 绑定到vue原型中，组件中: this.$http -> axios
Vue.prototype.$http = axios
