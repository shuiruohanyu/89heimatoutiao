<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <!-- 一级路由容器 -->
    <router-view />
  </div>
</template>

<style lang="less">
</style>
