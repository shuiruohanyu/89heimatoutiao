// 权限拦截 导航守卫
import router from '../router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 拦截谁 判断拦截地址
  // 由于 某某框架升级了corejs版本 导致 字符串方式编译问题 判断 是否需要控制 先用不等于 login来判断
  if (to.path.startsWith('/home')) {
    //   进行权限判断 判断有无token 如果有token 放过 如果没有 回到登录页
    let token = window.localStorage.getItem('user-token')
    if (token) {
    //    直接放过
      next()
    } else {
      next('/login') // 强制跳转到登录页
    }
  } else {
    next() // 直接放行
  }
})
