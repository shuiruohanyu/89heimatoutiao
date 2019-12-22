<template>
<!-- 基本的页面结构 -->
  <el-card>
      <bread-crumb slot="header">
         <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 素材 -->
      <el-tabs v-model="activeName">
          <el-tab-pane label="全部素材" name="all">
              <!-- 全部素材内容 -->

          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <!-- 收藏素材内容 -->
          </el-tab-pane>

      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect'
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
