import http from '@/utils/request'

export default {
  async myCouponList(data = {}) {
    return http.get('/addons/coupon/api.userCoupon/myCoupon', data)
  },
}
