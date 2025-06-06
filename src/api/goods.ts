import http from '@/utils/request'

export default {
  // 商品分类
  async goodsCate(data: object) {
    return await http.get(`/goodsCate/index`, data)
  },
  // 分类下的商品
  async cateGoods(data: object) {
    return await http.get(`/goods/getGoodsByCateInfo`, data)
  },

  // 获取商品信息
  async goodsDetail(data: object) {
    return await http.get(`/goods/detail`, data)
  },
}
