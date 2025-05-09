<script setup lang="ts">
  import { ref } from 'vue'
  import navTabs  from '@/components/navTabs.vue'

  interface NavItem {
    key: string
    label: string
  }

  // 导航数据
  const navItems = ref<NavItem[]>([
    { key: 'all', label: '全部' },
    { key: 'all2', label: '联名系列'},
    { key: 'all3', label: '艺术家精选' },
    { key: 'all4', label: '明星同款' },
    { key: 'all5', label: '玩转方案' },
  ])

  // 状态栏高度
  const statusBarHeight = ref(0)

  // 当前选中的导航项
  const activeNavId = ref(1)

  // 商品数据
  const products = ref([
    {
      id: 1,
      name: '波漾手机壳 - 白色',
      price: 419,
      bgColor: '#f5f5f5',
    },
    {
      id: 2,
      name: '初雪',
      price: 509,
      bgColor: '#e8e8e8',
    },
    {
      id: 3,
      name: '星野梦境',
      price: 509,
      bgColor: '#f0f0f0',
    },
  ])

  // 切换导航
  const switchNav = (id: number) => {
    // activeNavId.value = id
  }

  // 跳转到搜索页面
  const goToSearch = () => {
    uni.navigateTo({
      url: '/pages/search/search',
    })
  }

  // 跳转到商品详情
  const goToDetail = (id: number) => {
    uni.navigateTo({
      url: `/pages/product/detail?id=${id}`,
    })
  }

  // 获取系统信息
  uni.getSystemInfo({
    success: (res) => {
      statusBarHeight.value = res.statusBarHeight || 0
    },
  })
</script>

<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部标题栏 -->
    <view class="header">
      <view class="logo">CASETIFY</view>
      <view class="search-box" @tap="goToSearch">
        <text class="search-icon">🔍</text>
      </view>
      <view class="header-right">
        <text class="menu-icon">⋮</text>
        <text class="cart-icon">⊙</text>
      </view>
    </view>

    <!-- 导航栏 -->
    <nav-tabs :tabs="navItems"  @switchNav="switchNav" />
    

    <!-- 商品列表 -->
    <view class="product-grid">
      <view class="product-card" v-for="product in products" :key="product.id" @tap="goToDetail(product.id)">
        <view class="product-image-placeholder" :style="{ backgroundColor: product.bgColor }"></view>
        <view class="product-info">
          <text class="product-name">{{ product.name }}</text>
          <text class="product-price">¥ {{ product.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    background-color: #f8f8f8;
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  }

  .status-bar {
    width: 100%;
    background-color: #fff;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #fff;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24rpx;
    padding-right: calc(24rpx + env(safe-area-inset-right));
    padding-left: calc(24rpx + env(safe-area-inset-left));
    border-bottom: 1rpx solid #f0f0f0;

    .logo {
      font-size: 32rpx;
      font-weight: bold;
      color: #000;
    }

    .search-box {
      flex: 1;
      margin: 0 24rpx;
      height: 60rpx;
      background-color: #f5f5f5;
      border-radius: 30rpx;
      display: flex;
      align-items: center;
      padding: 0 24rpx;

      .search-icon {
        font-size: 32rpx;
        color: #999;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 24rpx;

      .menu-icon,
      .cart-icon {
        font-size: 40rpx;
        color: #333;
      }
    }
  }

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

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
