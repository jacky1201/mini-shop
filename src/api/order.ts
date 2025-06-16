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

  // 获取用户订单列表
  async orderList(data = {}) {
    return await http.get('/userOrder/index', data)
  },

  // 订单详情
  async detail(data = {}) {
    return await http.get('/userOrder/detail', data)
  },

  // 取消订单
  async cancel(data = {}) {
    return await http.get('/userOrder/cancel', data)
  },
  // 去支付
  async goPay(data = {}) {
    return await http.post('/userOrder/goPay', data)
  },
  // 确认收货
  async received(data = {}) {
    return await http.get('/userOrder/received', data)
  },

  // 提交退款
  async refund(data = {}) {
    return await http.post('/orderRefund/refund', data)
  },
}
