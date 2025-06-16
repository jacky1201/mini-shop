<template>
  <view class="content">
    <view class="address">
      <view class="title">配送信息</view>
      <view class="desc" @click="gotoAddress()" v-if="false">仅支持配送至大陆地区</view>
      <view class="info" @click="gotoAddress()" v-else>
        <view class="name">
          <view>{{ addressData.name }}</view>
          <view>{{ addressData.mobile }}</view>
        </view>
        <view class="addr"> {{ addressData.address }}{{ addressData.area }} </view>
      </view>
    </view>
    <view class="product-list">
      <view class="title"> 商品信息 </view>
      <view class="list-box">
        <view class="item" v-for="(item, index) in productList" :key="index">
          <image class="pro-img" :src="item.ruleInfo.image" mode="scaleToFill" />
          <view class="info">
            <view class="goods-name">{{ item.goods.name }}</view>
            <view class="specs-name" v-if="item.ruleInfo.sku">{{ item.ruleInfo.sku }}</view>
            <view class="price"> ￥{{ item.ruleInfo.price }} </view>
          </view>
          <view class="num"> ×{{ item.num }} </view>
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
          <view class="rt"> ￥{{ orderInfo.totalPrice }} </view>
        </view>
        <view class="item">
          <view class="lt"> 优惠金额 </view>
          <view class="rt"> ￥{{ orderInfo.coupon }} </view>
        </view>
        <view class="item">
          <view class="lt"> 运费 </view>
          <view class="rt"> 免费配送 </view>
        </view>
        <view class="item total">
          <view class="lt"> 应付 </view>
          <view class="rt"> ￥{{ orderInfo.realPay }}</view>
        </view>
      </view>
    </view>
    <view class="footer-btns">
      <view class="buy-btn" @click="submitPay"> 立即购买</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import couponIcon from '@/static/product/coupon-icon.png'
  import orderApi from '@/api/order'
  import addressApi from '@/api/address'
  import { success, error } from '@/utils/message'
  const productList = ref()
  const orderInfo = ref({
    coupon: 0,
    postage: 0,
    realPay: 0,
    totalPrice: 0,
  })

  const trailData = ref()

  const addressData = reactive({
    name: '',
    mobile: '',
    address: '',
    area: '',
    default: false,
    address_id: 0,
  })
  const gotoAddress = () => {
    uni.navigateTo({
      url: '/pages/address/index',
    })
  }

  const gotoCoupon = () => {
    uni.navigateTo({
      url: '/pages/coupon/index',
    })
  }
  // 获取收获地址
  const getAddress = async () => {
    let res = await addressApi.defaultAddress()
    if (res.code == 0 && res.data) {
      addressData.name = res.data.real_name
      addressData.mobile = res.data.phone
      addressData.address = res.data.province + res.data.city + res.data.county
      addressData.area = res.data.detail
      addressData.default = true
      trailData.value.address_id = res.data.id
    } else {
      trailData.value.address_id = 0
    }

    getTrail()
  }
  const getTrail = () => {
    orderApi.confirmTrail(trailData.value).then((res) => {
      if (res.data) {
        orderInfo.value = res.data
      }
    })
  }

  const getOrderData = () => {
    orderApi.getConfirmOrder({ order_data: confirmList.value }).then((res) => {
      console.log('获取订单数据', res)
      let { buy_goods, trail, cart_ids, type, other_order_param, payWayMap, deliverType } = res.data
      productList.value = buy_goods
      trailData.value = {
        goods: JSON.parse(trail),
        cart_id: cart_ids,
        orderType: type,
        other_order_param,
        payWay: payWayMap,
        deliverType: deliverType,
        deliver_type: deliverType[0],
        pay_way: 'wechat_pay',
        coupon: 0,
        store_id: 0,
        useIntegral: false,
        remark: '',
      }

      getAddress()
      // 处理订单数据
      // productList.value = res.data.productList
      // 其他逻辑...
    })
  }

  const submitPay = () => {
    orderApi.createOrder(trailData.value).then((res) => {
      uni.requestPayment({
        provider: 'wxpay',
        orderInfo:'订单编号：'+res.msg,
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success(data) {
          success('支付成功')
          uni.redirectTo({
            url: '/pages/pay/result?order_no=' + res.msg,
          })
        },
        fail(e) {
          error('支付失败')
          uni.redirectTo({
            url: '/pages/pay/result?order_no=' + res.msg,
          })
        },
      })
    })
  }
  const confirmList = ref()
  onLoad(() => {
    uni.getStorage({
      key: 'CREATE_ORDER',
      success: (res) => {
        confirmList.value = res.data
        getOrderData()
      },
    })

    uni.$on('checkAddress', (data) => {
      addressData.name = data.name
      addressData.mobile = data.mobile
      addressData.address = data.address
      addressData.area = data.area
      addressData.default = data.default
      trailData.value.address_id = data.id
      getTrail()
    })
  })
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
