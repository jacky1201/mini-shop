import { defineStore } from 'pinia'
import userApi from '@/api/user/user'
export const useUserStore = defineStore(
  'userStore',
  () => {
    const setToken = (token: string) => {
      uni.setStorageSync('token', token)
    }

    const getToken = () => {
      return uni.getStorageSync('token')
    }

    const refToken = async () => {
      let { token } = await userApi.userLogin<{ token: string }>()
      console.log('refToken', token)
      setToken(token)

      return token
    }
    return { setToken, getToken, refToken }
  },
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  }
)
