<template>
  <div class='login'>
    <!-- 放置一个卡片组件 -->
     <el-card class='login-card'>
       <div class='title'>
         <img src="../../assets/img/logo_index.png" alt="">
       </div>
       <!-- 登录表单 表单容器  el-form 需要绑定model属性 rules属性绑定验证规则对象-->
       <el-form ref="myForm" style="margin-top:30px" :model="loginForm" :rules="loginRules">
         <!-- 表单域 el-form-item => 一行   => 校验 => prop => 要检验的字段名-->
         <el-form-item prop="mobile">
           <!-- 放置具体的组件 登录手机号 v-model 双向绑定数据对象-->
           <el-input v-model="loginForm.mobile" placeHolder="请输入手机号"></el-input>
         </el-form-item>
         <el-form-item prop="code">
           <!-- 表单域 -->
           <el-input v-model="loginForm.code" style="width:65%" placeHolder="请输入验证码"> </el-input>
           <el-button style="float:right" plain>发送验证码</el-button>
         </el-form-item>
         <el-form-item prop="check">
           <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <el-form-item>
           <!-- 注册点击事件 -->
           <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
         </el-form-item>
       </el-form>
     </el-card>
  </div>
</template>

<script>
export default {
// 第一步 在data中定义表单数据对象
  data () {
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则 验证登录表单的  key(字段名):value(数组)
        // required true -> 必填
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/,
          message: '验证码格式不正确'
        }],
        // 自定义函数
        check: [{ validator: function (rule, value, callback) {
          //   rule当前的规则 没什么用
          // value指的就是我们要校验的字段的值
          if (value) {
            //  认为校验通过 放过去
            callback() // 直接执行callback 认为通过
          } else {
            //  认为校验不通过 要提示信息
            callback(new Error('您必须无条件同意被我们坑'))
          }
        } }]
      }
    }
  },
  methods: {
    // 提交登录表单
    submitLogin () {
      //  el-form实例
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          //  认为前端校验登录表单成功
          // 地址参数  查询参数 params 对象
          // body参数 data对象
          this.$axios({
            url: '/authorizations', // 请求地址
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token) // 前端缓存令牌
            this.$router.push('/home') // 跳转到主页
            //  成功以后才会进入到then
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 写上scoped属性 那么只会对当前的组件样式产生作用 原理 是 为当前的标签生成了 data-v-随机数
   // 100vh相当于当前可视区域的100%高度
  .login {
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover; // 自适应背景图片
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 440px;
      height: 350px;
      .title {
        text-align: center;
        img {
          height: 44px;
        }
      }
    }
  }
</style>
