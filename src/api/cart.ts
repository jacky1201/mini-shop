import http from '@/utils/request'

export default {
  // 加入购物车
  async addCart(data: object) {
    return await http.post(`/cart/add`, data)
  },

  // 获取我的购物车
  async myCartList<T>(data = {}) {
    return await http.get<T>('/cart/list', data)
  },

  async remove(data = {}) {
    return await http.get('/cart/remove', data)
  },

  async changeNum(data = {}) {
    return await http.post('/cart/changeNum', data)
  },
}
