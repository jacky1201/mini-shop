import http from '@/utils/request'

export default {
  // 确认订单详情
  async getConfirmOrder(data: object) {
    return await http.post(`/order/index`, data)
  },

  // 开始试算
  async confirmTrail(data: object) {
    return await http.post(`/order/trail`, data)
  },

  // 创建订单
  async createOrder(data = {}) {
    return await http.post('/order/createOrder', data)
  },

  // 获取订单详情
  async getOrderInfo(data = {}) {
    return await http.get('/order/getOrderInfo', data)
  },
}
