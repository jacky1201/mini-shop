import http from '@/utils/request'

export default {
  // 加入购物车
  async addCart(data: object) {
    return await http.post(`/cart/add`, data)
  },
}
