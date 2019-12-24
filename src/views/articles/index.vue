<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- el-row 行 -->
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
          <!--
              0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
           -->
        <!-- 单选框组 -->
        <el-radio-group v-model="formData.status">
            <!-- 全部这个5是默认的,在传参的时候判断一下 是不是5 如果是5 就传个null -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="formData.channel_id">
            <!-- 循环生成多个el-option
              label 指的是 el-option显示值
              value指的是 el-option的存储值
            -->
            <el-option v-for="item in channels" :key="item.id"
             :label="item.name"
             :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 状态
        channel_id: null, // 默认是空
        dateRange: []
      },
      channels: [] // 定义一个channels 接收频道
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道数据
  }
}
</script>

<style lang='less' scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
}
</style>
