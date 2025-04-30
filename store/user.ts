import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const setToken = (token) => {
    uni.setStorageSync('token', token)
  }

  const getToken = () => {
    return uni.getStorageSync('token')
  }
  return { setToken, getToken }
}, {
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
})
