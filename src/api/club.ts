import http from '@/utils/request'

export default {
  // 绑定二维码的code
  async bindQRCode(data: object) {
    return await http.post(`/Video/unlock`, data)
  },
  // 获取绑定商品列表
  async getBindGoodsList(data: object) {
    return await http.get(`/Video/unlockGoodsList`, data)
  },
  // 获取视频列表
  async getVideoList(data: object) {
    return await http.get(`/Video/unlockVideoList`, data)
  },
}
