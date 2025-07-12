import http from '@/utils/request'

export default {
  // 获取基础信息
  async baseInfo(data = {}) {
    return http.get('/addons/chat/api.Index/index', data)
  },
  // 获取聊天记录
  async getChatLog(data = {}) {
    return http.get('/addons/chat/index.Index/getChatLog', data)
  },
}
