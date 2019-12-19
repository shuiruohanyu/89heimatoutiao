import LayoutAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
  }
}
