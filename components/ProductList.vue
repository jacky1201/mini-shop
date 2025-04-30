<template>
  <view class="product-list">
    <view v-for="(product, index) in products" :key="index" class="product-item">
      <view class="product-image" :style="{ backgroundColor: product.imageColor }">
        <view v-if="product.hot" class="hot-tag">热门</view>
      </view>
      <view class="product-info">
        <text class="product-name">{{ product.name }}</text>
        <view class="price-row">
          <text class="price-symbol">¥</text>
          <text class="product-price">{{ product.price }}</text>
        </view>
        <view class="product-tags">
          <text v-if="product.isNew" class="tag new-tag">新品</text>
          <text v-if="product.isBestSeller" class="tag bestseller-tag">畅销</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  interface Product {
    name: string
    price: number
    image: string
    imageColor: string
    hot: boolean
    isNew: boolean
    isBestSeller: boolean
  }

  const products = ref([
    {
      name: 'iPhone 14 Pro Max 手机壳',
      price: 399,
      image: '/static/products/case1.jpg',
      imageColor: '#f5f5f5',
      hot: true,
      isNew: true,
      isBestSeller: false,
    },
    {
      name: 'AirPods Pro 保护套',
      price: 199,
      image: '/static/products/case2.jpg',
      imageColor: '#f0f0f0',
      hot: false,
      isNew: false,
      isBestSeller: true,
    },
    {
      name: 'iPad Mini 6 保护壳',
      price: 299,
      image: '/static/products/case3.jpg',
      imageColor: '#f8f8f8',
      hot: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      name: 'MacBook Pro 13寸保护壳',
      price: 499,
      image: '/static/products/case4.jpg',
      imageColor: '#f2f2f2',
      hot: false,
      isNew: true,
      isBestSeller: false,
    },
  ])
</script>

<style lang="scss" scoped>
  .product-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    padding: 20rpx;
  }

  .product-item {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
  }

  .product-image {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* 1:1 aspect ratio */
  }

  .actual-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hot-tag {
    position: absolute;
    top: 16rpx;
    right: 16rpx;
    background: #ff4d4f;
    color: #fff;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
    font-size: 24rpx;
  }

  .product-info {
    padding: 16rpx;
  }

  .product-name {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 16rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-row {
    display: flex;
    align-items: baseline;
    margin-bottom: 8rpx;
  }

  .price-symbol {
    font-size: 24rpx;
    color: #ff4d4f;
    margin-right: 4rpx;
  }

  .product-price {
    font-size: 32rpx;
    color: #ff4d4f;
    font-weight: bold;
  }

  .product-tags {
    display: flex;
    gap: 8rpx;
  }

  .tag {
    font-size: 20rpx;
    padding: 2rpx 8rpx;
    border-radius: 4rpx;
  }

  .new-tag {
    background: #e6f7ff;
    color: #1890ff;
  }

  .bestseller-tag {
    background: #f6ffed;
    color: #52c41a;
  }
</style>
