<template>
  <view class="content">
    <banner :bannerList="bannerList" width="100%" height="100vh" @click="gotoDetail"></banner>
  </view>
</template>

<script setup lang="ts">
  import homeApi from '@/api/home'
  import banner from '@/components/banner.vue'
  interface BannerItem {
    id: number
    pic_url: string
    position: number
    target_url: string
  }
  const bannerList = ref<BannerItem[]>([])

  const getBannerList = () => {
    homeApi.getSliderList<BannerItem[]>({ position: 1 }).then((res) => {
      bannerList.value = res.data
    })
  }

  const gotoDetail = (item: BannerItem) => {
    uni.navigateTo({
      url: item.target_url,
    })
  }
  onShow(() => {
    getBannerList()
  })

  onMounted(() => {})
</script>
<style lang="scss" scoped>
  .content {
  }
</style>
<style lang="scss">
  wx-swiper .wx-swiper-dots {
    bottom: 30rpx;
    left: 80rpx;
  }

  wx-swiper .wx-swiper-dot {
    width: 20rpx;
    height: 20rpx;
    border-radius: 20rpx;
  }

  wx-swiper .wx-swiper-dot-active {
    width: 60rpx;
    height: 20rpx;
    border-radius: 20rpx;
  }
</style>
