// 专门放置请求模块的逻辑
import request from '../utils/request'
import { API_ARTICLES, API_CHANNELS } from '../constant/api'
// 获取文章列表的方法
export function getArticles (params) {
  return request({
    url: API_ARTICLES,
    params
  })
}
// 获取频道
export function getChannels () {
  return request({
    url: API_CHANNELS
  })
}
