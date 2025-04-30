<template>
  <view class="content">
    <view class="address">
      <view class="title">配送信息</view>
      <view class="desc" @click="gotoAddress()" v-if="false">仅支持配送至大陆地区</view>
      <view class="info" @click="gotoAddress()" v-else>
        <view class="name">
          <view>收货姓名</view>
          <view>13100004444</view>
        </view>
        <view class="addr"> xxx省xxx市xxx区xxx街道xxx小区 </view>
      </view>
    </view>
    <view class="product-list">
      <view class="title"> 商品信息 </view>
      <view class="list-box">
        <view class="item" v-for="(item, index) in productList" :key="index">
          <view class="pro-img"></view>
          <view class="info">
            <view class="goods-name">{{ item.name }}</view>
            <view class="specs-name">规格1*规格2</view>
            <view class="price"> ￥{{ item.price }} </view>
          </view>
          <view class="num"> ×1 </view>
        </view>
      </view>
    </view>
    <view class="price-info">
      <view class="title">优惠方式</view>
      <view class="coupon">
        <view class="lt">
          <image :src="couponIcon" />
          <text>使用优惠券</text>
        </view>
        <uni-icons type="right" size="14" @click="gotoCoupon()" />
      </view>
      <view class="price-list">
        <view class="item">
          <view class="lt"> 小计 </view>
          <view class="rt"> ￥99.99 </view>
        </view>
        <view class="item">
          <view class="lt"> 优惠金额 </view>
          <view class="rt"> ￥99.99 </view>
        </view>
        <view class="item">
          <view class="lt"> 运费 </view>
          <view class="rt"> 免费配送 </view>
        </view>
        <view class="item total">
          <view class="lt"> 总计 </view>
          <view class="rt"> ￥999.99 </view>
        </view>
      </view>
    </view>
    <view class="footer-btns">
      <view class="buy-btn"> 立即购买</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import couponIcon from '@/static/product/coupon-icon.png'
  const productList = [
    {
      name: '商品名称2',
      price: '99.00',
      num: 1,
    },
    {
      name: '商品名称3',
      price: '99.00',
      num: 1,
    },
  ]

  const gotoAddress = () => {
    uni.navigateTo({
      url: '/pages/address/list',
    })
  }

  const gotoCoupon = () => {
    uni.navigateTo({
      url: '/pages/coupon/index',
    })
  }
</script>

<style lang="scss" scoped>
  .content {
  }
  .address {
    padding: 20rpx 30rpx;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .desc {
      font-size: 28rpx;
      color: #e8e8e8;
    }
    .info {
      margin-top: 10rpx;
      .name {
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
      }
      .addr {
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
      }
    }
  }
  .title {
    font-size: 40rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 30rpx;
  }
  .product-list {
    padding: 20rpx 30rpx;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .list-box {
      margin-top: 10rpx;
      .item {
        display: flex;
        margin-bottom: 20rpx;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 20rpx 0;
        &:last-child {
          border-bottom: none;
        }
        .pro-img {
          width: 120rpx;
          height: 120rpx;
          background-color: #e8e8e8;
        }
        .info {
          margin: 0 20rpx;
          flex: 1;
          .goods-name {
            font-size: 28rpx;
            color: #1a1a1a;
            margin-bottom: 10rpx;
          }
          .specs-name {
            font-size: 24rpx;
            color: #999;
            margin-bottom: 10rpx;
          }
          .price {
            font-size: 28rpx;
            color: #1a1a1a;
          }
        }
        .num {
          font-size: 24rpx;
          color: #1a1a1a;
          align-self: center;
        }
      }
    }
  }

  .price-info {
    padding: 20rpx 30rpx;
    .coupon {
      display: flex;
      justify-content: space-between;
      .lt {
        display: flex;
        align-items: center;
        image {
          width: 44rpx;
          height: 44rpx;
        }
        font-size: 30rpx;
        color: #1a1a1a;
      }
    }
    .price-list {
      margin-top: 40rpx;
      .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;
        .lt {
          font-size: 28rpx;
          color: #1a1a1a;
        }
        .rt {
          font-size: 28rpx;
          color: #1a1a1a;
        }
      }
      .total {
        margin-top: 40rpx;
      }
    }
  }
  .footer-btns {
    position: fixed;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    border-top: 2rpx solid rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 25rpx 0;
    .buy-btn {
      width: calc(100% - 60rpx);
      border-radius: 76rpx;
      height: 80rpx;
      line-height: 80rpx;
      background-color: #e8e8e8;
      color: #1a1a1a;
      font-size: 32rpx;
      text-align: center;
      margin: auto;
    }
  }
</style>
