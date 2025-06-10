import http from '@/utils/request'
import { useUserStore } from '@/store/user'

const baseApi = '/estateVip'
export default {
  userLogin() {
    uni.login({
      success: async ({ code }) => {
        const { data } = await http.get<string>(`${baseApi}/open/getTokenByCode`, { code })
        useUserStore().setToken(data)
      },
    })
  },
  async getUser() {
    return await http.get(`${baseApi}/vipInfo/vipUser`, {})
  },
}
