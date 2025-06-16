<template>
  <view class="content"  v-if="orderDetail">
    <view class="order-box">
      <view class="status"> {{ orderDetail.status_txt  || '--'}} </view>
      <view class="desc">
        <view class="desc-item">
          <view>订单编号：{{ orderDetail.order_no }}</view>
          <view>下单时间：{{ orderDetail.create_time }}</view>
        </view>
        <view class="close-btn" v-if="orderDetail.status == 2" @click="cancel()">取消订单</view>
      </view>
    </view>
    <view class="address" v-if="orderDetail.address">
      <view class="title"> 配送地址 </view>
      <view class="info">
        <view>{{ orderDetail.address.user_name || '--'}}</view>
        <view>{{ orderDetail.address.phone }}</view>
      </view>
      <view class="detail-addr"> {{ orderDetail.address.province + orderDetail.address.city + orderDetail.address.county +orderDetail.address.detail}}</view>
    </view>
    <view class="product-box">
      <view class="title">
        <view class="lt">商品信息</view>
        <view class="rt">共{{ orderDetail.totalNum }}件商品</view>
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in orderDetail.detail" :key="index">
          <image
            class="image"
            :src="item.logo"
            mode="scaleToFill"
          />
          <view class="info">
            <view class="prod-name">{{ item.goods_name }}</view>
            <view class="price">￥{{ item.price }}</view>
            <!-- <view class="spec-name">{{ item.specsName }}</view> -->
          </view>
          <view class="num"> ×{{ item.cart_num }} </view>
        </view>
      </view>
    </view>
    <view class="total-box">
      <view class="item">
        <view class="lt">小计</view>
        <view class="rt">￥{{ orderDetail.order_price }}</view>
      </view>
      <view class="item">
        <view class="lt">优惠金额</view>
        <view class="rt">￥{{ orderDetail.coupon_amount }}</view>
      </view>
      <view class="item">
        <view class="lt">运费</view>
        <view class="rt">免费配送</view>
      </view>

      <view class="item" style="margin-top: 40rpx" >
        <view class="lt">实付</view>
        <view class="rt" style="font-weight: 600">￥{{ orderDetail.pay_price }}</view>
      </view>
    </view>

    <view class="action-box">
      <view class="buy-now refund" v-if="orderDetail.pay_status == 2 && orderDetail.refund_status == 1 && orderDetail.detail.length > 0" @click="refund">申请退款</view>
      <view class="buy-now" v-if="orderDetail.status == 2" @click="orderPay">继续支付</view>
      <view class="buy-now" v-if="orderDetail.status == 4" @click="received">确认收货</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
  import orderApi from '@/api/order'
import { success,error } from '@/utils/message';
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

  const orderId = ref()
  const orderDetail = ref()
  const getOrderDetail = ()=>{
    orderApi.detail({
      id:orderId.value,
    }).then(res=>{
      orderDetail.value = res.data.order
      console.log("orderDetail", orderDetail.value.status_txt)

      let totalNum = 0
      orderDetail.value.detail.forEach((goods:any)=>{
        totalNum += goods.cart_num
      })
      orderDetail.value.totalNum = totalNum
    })
  }


  // 取消订单
  const  cancel=()=> {
      uni.showModal({
        content:'确认取消订单操作？',
        success:({confirm})=>{
          if(confirm){
            orderApi.cancel({
            id:orderId.value,
            }).then(res=>{
              success('取消成功')
              getOrderDetail()
            })
          }
        },
      })
    
  }

  //支付
  const orderPay = ()=>{
    orderApi.goPay({
      order_id:orderDetail.value.id,
      pay_way:'wechat_pay',
    }).then(res=>{
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        orderInfo:'订单编号：'+orderDetail.value.id,
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

  const received = ()=>{
    uni.showModal({
        content:'确认收货操作？',
        success:({confirm})=>{
          if(confirm){
            orderApi.received({
            id:orderId.value,
            }).then(res=>{
              success('确认收货成功')
              getOrderDetail()
            })
          }
        },
      })
  }

  const refund = ()=>{
    uni.showModal({
        content:'确认申请退款操作？',
        success:({confirm})=>{
          if(confirm){
            let detailIds:string[] = []
            let orderNumData:{order_detail_id:string,num:number}[] = []
            orderDetail.value.detail.forEach((item:any) => {
                orderNumData.push({
                  order_detail_id: item.id,
                  num: item.cart_num
                })
                detailIds.push(item.id)
            })
            let params = {
              order_id: orderId.value,
              order_detail_id:detailIds.join(','),
              order_num_data:JSON.stringify(orderNumData),
              refund_type: 1,
              remark: '用户主动申请退款',
              apply_refund_reason: '',
					    refund_img: [],
            }
            orderApi.refund(params).then(res=>{
              success('申请成功')
              getOrderDetail()
            })
          }
        },
      })
    
  }
  onLoad((option)=>{
    if(option){
      orderId.value = option.orderId
      getOrderDetail()
    }
  })
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

    .refund{
      background-color: #fff;
      color: #1a1a1a;
    }
  }
</style>
