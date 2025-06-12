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
      const token = await userApi.userLogin()
      setToken(token as string)

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
