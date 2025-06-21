import http from '@/utils/request'

export default {
  // 收藏列表
  async myCollect(data = {}) {
    return await http.get('/userCollect/myCollect', data)
  },
  // 添加收藏
  async add(data = {}) {
    return await http.post('/userCollect/add', data)
  },
  // 删除收藏
  async remove(data = {}) {
    return await http.get('/userCollect/remove', data)
  },
  // 根据商品id移除
  async removeByGoods(data = {}) {
    return await http.get('/userCollect/removeByGoodsId', data)
  },
}
