<template>
  <div class='login'>
    <!-- 放置一个卡片组件 -->
     <el-card class='login-card'>
       <div class='title'>
         <img src="../../assets/img/logo_index.png" alt="">
       </div>
       <!-- 登录表单 表单容器 -->
       <el-form style="margin-top:30px">
         <!-- 表单域 el-form-item => 一行 -->
         <el-form-item>
           <!-- 放置具体的组件 登录手机号 -->
           <el-input placeHolder="请输入手机号"></el-input>
         </el-form-item>
         <el-form-item>
           <!-- 表单域 -->
           <el-input style="width:65%" placeHolder="请输入验证码"> </el-input>
           <el-button style="float:right" plain>发送验证码</el-button>
         </el-form-item>
         <el-form-item>
           <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" style="width:100%">登录</el-button>
         </el-form-item>
       </el-form>
     </el-card>
  </div>
</template>

<script>
export default {

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
