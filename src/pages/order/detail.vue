<template>
  <view class="content">
    <view class="order-box">
      <view class="status"> 代付款 </view>
      <view class="desc">
        <view class="desc-item">
          <view>订单编号：222222222</view>
          <view>下单时间：2025-03-14</view>
        </view>
        <view class="close-btn">取消订单</view>
      </view>
    </view>
    <view class="address">
      <view class="title"> 配送地址 </view>
      <view class="info">
        <view>mmmm</view>
        <view>13145451212</view>
      </view>
      <view class="detail-addr"> xxxx省xxxx市xxxx区xxxx街道xxxx小区xxxx栋xxxx单元 </view>
    </view>
    <view class="product-box">
      <view class="title">
        <view class="lt">商品信息</view>
        <view class="rt">共9件商品</view>
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in productList" :key="index">
          <view class="image"></view>
          <view class="info">
            <view class="prod-name">{{ item.productName }}</view>
            <view class="price">￥{{ item.price }}</view>
            <view class="spec-name">{{ item.specsName }}</view>
          </view>
          <view class="num"> ×{{ item.num }} </view>
        </view>
      </view>
    </view>
    <view class="total-box">
      <view class="item">
        <view class="lt">小计</view>
        <view class="rt">￥999</view>
      </view>
      <view class="item">
        <view class="lt">优惠金额</view>
        <view class="rt">￥999</view>
      </view>
      <view class="item">
        <view class="lt">运费</view>
        <view class="rt">免费配送</view>
      </view>

      <view class="item" style="margin-top: 40rpx">
        <view class="lt">总计</view>
        <view class="rt" style="font-weight: 600">￥999</view>
      </view>
    </view>

    <view class="action-box">
      <view class="buy-now">继续支付</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
  const productList = ref([
    {
      productName: '测试商品1',
      price: 123,
      num: 1,
      imgUrl: '',
      isChecked: true,
      specsName: '测试规格',
    },
    {
      productName: '测试商品2',
      price: 123,
      num: 1,
      imgUrl: '',
      isChecked: true,
      specsName: '测试规格',
    },
    {
      productName: '测试商品3',
      price: 123,
      num: 1,
      imgUrl: '',
      isChecked: true,
      specsName: '测试规格',
    },
  ])
</script>
<style lang="scss" scoped>
  .content {
    padding-bottom: calc(82rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(82rpx + env(safe-area-inset-bottom));
  }
  .order-box {
    padding: 30rpx 40rpx;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);

    .status {
      font-size: 36rpx;
      line-height: 54rpx;
      color: #1a1a1a;
      font-weight: 600;
    }
    .desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      .desc-item {
        font-size: 28rpx;
        color: #1a1a1a;
        line-height: 44rpx;
      }

      .close-btn {
        width: 160rpx;
        height: 50rpx;
        line-height: 50rpx;
        background-color: #1a1a1a;
        color: #fff;
        border-radius: 50rpx;
        text-align: center;
        font-size: 24rpx;
      }
    }
  }

  .address {
    padding: 30rpx 40rpx;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
    .title {
      font-size: 36rpx;
      line-height: 54rpx;
      color: #1a1a1a;
      font-weight: 600;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #1a1a1a;
      line-height: 44rpx;
    }
    .detail-addr {
      margin-top: 20rpx;
      font-size: 24rpx;
      color: #1a1a1a;
    }
  }

  .product-box {
    padding: 30rpx 40rpx;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 36rpx;
      line-height: 54rpx;
      color: #1a1a1a;
      font-weight: 600;
      .lt {
        font-size: 36rpx;
        line-height: 54rpx;
        color: #1a1a1a;
        font-weight: 600;
      }
      .rt {
        font-size: 28rpx;
        color: #1a1a1a;
        line-height: 44rpx;
      }
    }
    .list {
      margin-top: 20rpx;
      .item {
        display: flex;
        align-items: center;
        .image {
          width: 150rpx;
          height: 150rpx;
          background-color: #ededed;
        }
        .num {
          height: 150rpx;
        }

        .info {
          flex: 1;
          padding: 20rpx 20rpx;
          height: 150rpx;
          color: #1a1a1a;
          .prod-name,
          .price {
            font-size: 28rpx;
            font-weight: 600;
          }
          .price {
            margin-top: 10rpx;
          }
          .spec-name {
            font-size: 24rpx;
            margin-top: 20rpx;
            color: rgba(26, 26, 26, 0.6);
          }
        }
      }
    }
  }
  .total-box {
    padding: 30rpx 40rpx;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      .lt {
        font-size: 28rpx;
        color: #1a1a1a;
      }
      .rt {
        font-size: 28rpx;
        color: #1a1a1a;
      }
    }
  }

  .action-box {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    bottom: 0;
    background: #fff;
    height: 80rpx;
    border-top: 2rpx solid rgba(0, 0, 0, 0.1);
    padding: 25rpx 0;
    width: 100%;

    .buy-now {
      width: 180rpx;
      height: 60rpx;
      border-radius: 76rpx;
      font-size: 28rpx;
      line-height: 60rpx;
      text-align: center;
      margin: 0 20rpx;
    }

    .add-to-cart {
      background-color: #fff;
      color: #1a1a1a;
      border: 1rpx solid #000000;
    }

    .buy-now {
      background-color: #1a1a1a;
      color: #fff;
      border: 1rpx solid #000000;
    }
  }
</style>
