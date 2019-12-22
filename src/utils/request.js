// 对axios进行一个封装
import axios from 'axios'
import router from '../router' // 路由实例对象引入
import { Message } from 'element-ui' // 引入提示对象
import JSONBig from 'json-bigint' // 引入第三方的包
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 执行请求ok
  // config 是axios的所有配置
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 返回的config 就会作为新的请求选项去进行请求
}, function () {
  // 执行请求失败
})
// 后台数据 到达 响应拦截之前走的一个函数
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) // JSONbig.parse 替换 JSON.parse  保证数字的正确
}]
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {} // 解决当data不存在时  then中读取数据报错问题
}, function (error) {
  console.log(error)
  // 回调函数  所有的失败 都会进入到第二个回调函数
  // 失败时执行 状态码 不是200 或者201/204
  // 获取状态码 => 根据状态码 进行相应的提示或者操作
  let status = error.response.status // 获取状态码  根据状态码进行提示
  // let configurl = error.config.url // 请求地址
  let message = '' // 提示信息
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
    // 如果同样的状态码 但是不同意思 => 需要通过 请求地址来判断是哪个的响应  请求地址 + 状态码 一起来判断 怎么处理
      // resfehtoken 过期 强制跳转到登录页 resfehtoken => 是用来换取 token的
      // this.$router => 路由实例对象
      window.localStorage.removeItem('user-token') // 强制删除token
      router.push('/login')
      break
    case 401:
      // token过期
      window.localStorage.removeItem('user-token') // 强制删除token
      router.push('/login') // 强制回登录
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示消息
  // 状态码 提示
  // 想让错误拦截器的内容继续进入到以后的catch中 而不进入then

  return Promise.reject(error)
})
export default axios
