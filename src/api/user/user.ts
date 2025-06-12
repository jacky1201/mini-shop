import http from '@/utils/request'
import { useUserStore } from '@/store/user'

const baseApi = '/estateVip'
export default {
  userLogin<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      uni.login({
        success: async ({ code }) => {
          const { data } = await http.post<T>(`/login/loginByWechat`, { login_code: code, spId: '' })
          resolve(data)
        },
        fail(err) {
          console.log(err)
          reject(err)
        },
      })
    })
  },
  // async getUser() {
  //   return await http.get(`${baseApi}/vipInfo/vipUser`, {})
  // },
  // 绑定手机号
  async bindPhone(data: object) {
    return await http.post(`/user/bindPhoneNumber`, data)
  },
  async getUserInfo(data: object = {}) {
    return await http.get(`/user/info`, data)
  },
}
