<template>
  <div class="content">
    <!-- 商品列表 -->
    <view class="product-grid">
      <view class="product-card" v-for="product in goodsList" :key="product.id" @click="goToDetail(product.id)">
        <image class="product-image-placeholder" :src="product.slider_image" mode="scaleToFill" />
        <view class="product-info">
          <text class="product-name">{{ product.name }}</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script lang="ts" setup>
  import clubApi from '@/api/club'
  import { getQueryString } from '@/utils/util'
  onLoad((option) => {
    if (option && option.q) {
      console.log(option.q)
      let code = getQueryString(option.q, 'code')
      if (code) {
        bindCode(code)
      } else {
        uni.showToast({
          title: '二维码无效',
          icon: 'none',
          duration: 2000,
        })
      }
    }
    getGoodsList()
  })
  const goodsList = ref<{ id: string; name: string; slider_image: string }[]>([])
  const getGoodsList = () => {
    clubApi.getBindGoodsList({ page: 1, limit: 999 }).then((res: any) => {
      goodsList.value = res.data.data || []
    })
  }
  // bindCode('1c93ef0f-2f63-455c-aca5-4fe0931d1a82')
  const bindCode = (code: string) => {
    clubApi.bindQRCode({ code }).then((res: any) => {
      if (res.code === 0) {
        uni.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000,
        })
      } else {
        uni.showToast({
          title: res.msg || '绑定失败',
          icon: 'none',
          duration: 2000,
        })
      }
    })
  }

  const goToDetail = (id: string) => {
    uni.navigateTo({
      url: '/pages/club/videoList?id=' + id,
    })
  }
</script>

<style lang="scss" scoped>
  .product-grid {
    padding: 20rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
  }

  .product-card {
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .product-image-placeholder {
      width: 100%;
      height: 240rpx;
      border-radius: 8rpx 8rpx 0 0;
    }

    .product-info {
      padding: 16rpx;
      text-align: center;

      .product-name {
        font-size: 28rpx;
        color: #333;
        display: block;
        margin-bottom: 16rpx;
      }

      .product-price {
        font-size: 24rpx;
        color: #000;
        font-weight: bold;
        margin-top: 8rpx;
        display: block;
      }
    }
  }
</style>
