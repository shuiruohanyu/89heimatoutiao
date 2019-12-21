import Vue from 'vue'
import App from './App.vue'
import './permission' // 引入js
import router from './router'
import ElementUI from 'element-ui' // 引入包
import 'element-ui/lib/theme-chalk/index.css' // 引入elemenUI样式
import './styles/index.less' // 引入初始化样式
import axios from './utils/request' // 引入自己封装的一个axios
import Component from './components' // 引入组件对象
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
Vue.use(Component) // 注册全局组件对象 =>  调用该对象中的一个方法 install
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
