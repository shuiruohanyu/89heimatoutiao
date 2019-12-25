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
        <!-- 第一种方式用  @change="changeCondition" 第二种方式 用watch-->
        <el-radio-group  v-model="formData.status">
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
                <!-- 第一种方式用  @change="changeCondition" 第二种方式 用watch-->

        <el-select  v-model="formData.channel_id">
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
         <!-- 第一种方式用  @change="changeCondition" 第二种方式 用watch-->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 主体 -->
    <el-row class='total'>
        <span>共找到{{ page.total }}条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row  v-for="item in list" :key="item.id.toString()" class='article-item' type='flex' justify="space-between">
        <!-- 左侧 -->
       <el-col :span="14">
           <el-row type='flex'>
             <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
              <div class='info'>
                <span>{{ item.title }}</span>
                <!-- 过滤器不但可以在插值表达中使用 还可以在v-bind表达式中使用 -->
                <el-tag :type="item.status | filterType" class='tag'>{{ item.status | filterStatus }}</el-tag>
                <span class='date'>{{ item.pubdate }}</span>
              </div>
           </el-row>
       </el-col>
       <!-- 右侧 -->
       <el-col :span="6">
           <el-row class='right' type='flex' justify="end">
               <span @click="toModify(item.id)"><i class="el-icon-edit"></i>修改</span>
               <span @click="delArticle(item.id)"><i  class="el-icon-delete"></i> 删除</span>
           </el-row>
       </el-col>
    </el-row>
    <!-- 分页组件 -->
    <el-row type='flex' justify="center" align="middle" style='height:60px'>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        >
        </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
/****
 * created by  gaoly 2019-11-23
 * modify  by  zhangsan 2019-12-23
 * *******/
export default {
  data () {
    return {
      formData: {
        status: 5, // 状态
        channel_id: null, // 默认是空
        dateRange: [] // 默认为一个空数组
      },
      channels: [], // 定义一个channels 接收频道
      list: [], // 接收文章列表数据
      defaultImg: require('../../assets/img/default.png'),
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 文章列表最低10条
        total: 0
      }
    }
  },
  watch: {
    formData: {
      handler () {
        // this指向组件实例 // 触发该函数时 数据已经是最新的了
        this.changeCondition()
      },
      deep: true // 深度检测
    }
  },
  filters: {
    // 处理显示状态
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 去修改页面
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`) // 到发布页面
    },
    // 删除文章
    delArticle (id) {
      // 所有已发布的文章是不可以删除的  只有草稿才可以删除
      this.$confirm('您是否要删除这个文章?').then(() => {
        // 直接删除
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功!'
          })
          // this.page.currentPage = 1 // 如果想回第一个页 就赋值 为1 否则不用管
          this.getConditionArticle() // 重新调用
        })
      })
    },
    // 改变页码事件
    changePage (newPage) {
      // 赋值当前页码
      this.page.currentPage = newPage // 赋值当前页
      this.getConditionArticle()
    },
    // 改变条件
    changeCondition () {
      // 组装条件
      this.page.currentPage = 1 // 强制将当前的页码回到第一页
      // 最新状态
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage, // 分页信息
        per_page: this.page.pageSize, // 分页信息
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 截止时间
      }
      this.getArticles(params)
    },
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 获取文章列表数据 分页 切换 / 条件切换
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params
      }).then(result => {
        this.list = result.data.results // 接收文章列表数据
        this.page.total = result.data.total_count // 文章总数
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道数据
    this.getArticles({ page: 1, per_page: 10 }) // 调用获取文章列表
  }
}
</script>

<style lang='less' scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
  .total {
      margin:60px 0;
      height: 30px;
      border-bottom: 1px dashed #ccc;
  }
  .article-item {
      margin: 20px 0;
      padding: 10px 0;
      border-bottom: 1px solid #f2f3f5;
      img {
          width: 180px;
          height: 100px;
          margin-right: 10px;
          border-radius: 4px;
      }
      .info {
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tag {
              max-width:60px;
          }
          .date {
              color: #999;
              font-size:12px;
          }
      }
      .right {
          span {
              margin-left:8px;
              font-size: 14px;
              cursor: pointer;
          }
      }
  }
}
</style>
