import http from '@/utils/request'

export default {
  // 获取幻灯数据
  async getSliderList<T>(data = {}) {
    return await http.get<T>('/addons/diy/api.index/getSlider', data)
  },
}
