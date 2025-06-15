import http from '@/utils/request'

export default {
  // 获取默认地址
  async defaultAddress(data: object = {}) {
    return await http.get(`/address/getDefaultAddress`, data)
  },

  // 省市区
  async area(data: object = {}) {
    return await http.get(`/address/area`, data)
  },
  // 获取用户地址
  async info(data = {}) {
    return await http.get('/address/getUserAddress', data)
  },
  // 添加地址
  async add(data = {}) {
    return await http.post('/address/add', data)
  },
  // 编辑地址
  async edit(data = {}) {
    return await http.post('/address/edit', data)
  },
}
