<script setup lang="ts">
  import { ref } from 'vue'
  import staticImage from '@/components/staticImage.vue'
  interface OrderStatus {
    icon: string
    text: string
  }

  const orderStatuses = ref<OrderStatus[]>([
    { icon: '/static/my/order-1.png', text: '待付款' },
    { icon: '/static/my/order-2.png', text: '待发货' },
    { icon: '/static/my/order-3.png', text: '待收货' },
    { icon: '/static/my/order-4.png', text: '已完成' },
  ])

  const services = ref([
    { icon: '/static/my/address.png', text: '我的地址' },
    // { icon: '📄', text: '申请开票' },
    // { icon: '🛍️', text: '合作采购' },
    // { icon: '📄', text: '占位' },
  ])

  const memberInfo = ref({
    id: '23333',
    type: '基础会员',
    points: 0,
  })

  // 登录状态
  const isLoggedIn = ref(false)

  // 跳转到注册页面
  const navigateToRegister = () => {
    uni.navigateTo({
      url: '/pages/my/register',
    })
  }
</script>

<template>
  <view class="my-container">
    <!-- 未登录状态 -->
    <view v-if="!isLoggedIn" class="member-card not-logged-in">
      <view class="user-info" @click="navigateToRegister">
        <view class="avatar pink-bg">
          <view class="casetify-logo">CASETIFY</view>
        </view>
        <view class="info">
          <view class="login-text">登陆/注册</view>
        </view>
      </view>
    </view>

    <!-- 已登录状态 -->
    <view v-else class="member-card logged-in">
      <view class="user-info">
        <view class="avatar">
          <view class="casetify-logo">CASETIFY</view>
        </view>
        <view class="info">
          <view class="nickname">
            {{ memberInfo.id }}
            <staticImage src="/static/my/user-edit.png" width="36rpx" height="36rpx"></staticImage>
          </view>
          <view class="member-type">{{ memberInfo.type }}</view>
        </view>
      </view>

      <view class="points-info">
        <text class="points">{{ memberInfo.points }}</text>
        <text class="label">积点</text>
        <text class="check-benefits">查看会员权益</text>
      </view>

      <view class="qr-code"></view>
    </view>

    <!-- 优惠券和心愿单 -->
    <view class="quick-actions">
      <view class="action-item">
        <view class="icon">
          <staticImage src="/static/my/coupon-1.png" width="60rpx" height="60rpx"></staticImage>
        </view>
        <text>我的积分/优惠券</text>
      </view>
      <view class="divider"></view>
      <view class="action-item">
        <view class="icon">
          <staticImage src="/static/my/collect-1.png" width="60rpx" height="60rpx"></staticImage>
        </view>
        <text>我的心愿单</text>
      </view>
    </view>

    <view style="background-color: #fff; padding-top: 20rpx; min-height: 500rpx">
      <!-- 订单状态 -->
      <view class="section-header">
        <text class="title">我的订单</text>
        <view class="view-all">
          查看全部
          <uni-icons type="right" size="12" />
        </view>
      </view>
      <view class="orders-section">
        <view class="order-status-list">
          <view v-for="(status, index) in orderStatuses" :key="index" class="status-item">
            <view class="icon">
              <staticImage :src="status.icon" :alt="status.text" width="60rpx" height="60rpx"></staticImage>
            </view>
            <text>{{ status.text }}</text>
          </view>
        </view>
      </view>

      <!-- 更多服务 -->
      <view class="section-header" style="margin-top: 50rpx">
        <text class="title">更多服务</text>
      </view>
      <view class="services-section">
        <view class="services-grid">
          <view v-for="(service, index) in services" :key="index" class="service-item">
            <view class="icon">
              <staticImage :src="service.icon" :alt="service.text" width="60rpx" height="60rpx"></staticImage>
            </view>
            <text>{{ service.text }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .my-container {
    background: linear-gradient(360deg, #f0f0f0 0%, rgba(240, 240, 240, 0) 100%);
    padding-top: calc(130rpx + env(safe-area-inset-bottom)); /* 修改这里,增加刘海屏的安全区域 */
  }

  .member-card {
    border-radius: 20rpx 20rpx 0 0;
    padding: 40rpx;
    height: 280rpx;
    width: 610rpx;
    margin: 0 auto;
    position: relative;
    background: linear-gradient(360deg, #f0f0f0 0%, rgba(240, 240, 240, 0) 100%);
    &::after {
      content: '';
      position: absolute;
      top: 20rpx;
      right: 40rpx;
      width: 150rpx;
      height: 150rpx;
      background: url(/static/my/my-bg-rt.png) 100% no-repeat;
      background-size: 100% 100%;
    }
  }

  .logged-in {
    background: linear-gradient(315deg, #95b4e3 0%, #d0ddf0 100%, #d0ddf0 100%);
  }

  .not-logged-in {
    background: linear-gradient(315deg, #f4acca 0%, #f6cfd7 100%, #d0ddf0 100%);
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 50%;
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      .casetify-logo {
        font-size: 16rpx;
        font-weight: bold;
        background-color: #222;
        color: #fff;
        padding: 2rpx 6rpx;
        transform: rotate(-5deg);
      }
    }

    .pink-bg {
      background-color: #ffd6e1;
    }

    .info {
      .nickname {
        font-size: 32rpx;
        font-weight: bold;
        display: flex;
        align-items: center;
        .edit-icon {
          font-size: 24rpx;
          margin-left: 8rpx;
        }
      }

      .login-text {
        font-size: 32rpx;
        font-weight: bold;
      }

      .member-type {
        font-size: 24rpx;
        color: #666;
        margin-top: 4rpx;
      }
    }
  }

  .points-info {
    margin-top: 40rpx;

    .points {
      font-size: 48rpx;
      font-weight: bold;
    }

    .label {
      font-size: 24rpx;
      color: #666;
      margin-left: 8rpx;
    }

    .check-benefits {
      float: right;
      font-size: 24rpx;
      color: #333;
      text-decoration: underline;
    }
  }

  .qr-code {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    width: 60rpx;
    height: 60rpx;
    background-color: #000;
    border-radius: 8rpx;
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: #fff;
    }

    &::before {
      top: 10rpx;
      right: 10rpx;
      width: 20rpx;
      height: 20rpx;
      border-radius: 4rpx;
    }

    &::after {
      bottom: 10rpx;
      left: 10rpx;
      width: 15rpx;
      height: 15rpx;
      border-radius: 3rpx;
    }
  }

  .quick-actions {
    background: #fff;
    display: flex;
    width: 100%;
    border-bottom: 1rpx solid #eee;
    height: 190rpx;
    .action-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 28rpx;
      color: #1a1a1a;
      .icon {
        margin-bottom: 12rpx;
      }
    }

    .divider {
      width: 2rpx;
      background: #eee;
      margin: 0 30rpx;
      height: 120rpx;
      margin-top: 35rpx;
    }
  }

  .orders-section,
  .services-section {
    background: #ffffff;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    padding: 40rpx 50rpx;
    width: 590rpx;
    margin: 0 auto;
    margin-bottom: 20rpx;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-bottom: 20rpx;
    width: 690rpx;
    .title {
      font-size: 28rpx;
      font-weight: 600;
    }

    .view-all {
      font-size: 24rpx;
      color: #666;

      .arrow {
        margin-left: 4rpx;
      }
    }
  }

  .order-status-list {
    display: flex;
    justify-content: space-between;

    .status-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        font-size: 48rpx;
        margin-bottom: 12rpx;
      }

      text {
        font-size: 24rpx;
        color: #333;
      }
    }
  }

  .services-grid {
    display: flex;

    .service-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        font-size: 48rpx;
        margin-bottom: 12rpx;
      }

      text {
        font-size: 24rpx;
        color: #333;
      }
    }
  }
</style>
