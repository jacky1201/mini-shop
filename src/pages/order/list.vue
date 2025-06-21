<template>
  <view class="content">
    <navTabs :tabs="navItems" v-model="activeKey" @change="getOrderList" />
    <scroll-view scroll-y class="list-box">
      <view class="list-item" v-for="order in orderList" :key="order">
        <view class="order">
          <view class="status"> {{ order.status_txt }} </view>
          <view class="desc"> 订单编号：{{ order.order_no }} </view>
          <view class="desc"> 下单时间：{{ order.create_time }} </view>
        </view>
        <view class="product">
          <view class="title">商品信息</view>
          <view class="product-item" v-for="(item, index) in order.detail" :key="index">
            <image class="image" :src="item.logo" mode="scaleToFill" />
            <view class="info">
              <view class="prod-name">{{ item.goods_name }}</view>
              <view class="price">￥{{ item.price }}</view>
              <!-- <view class="spec-name">{{ item.specsName }}</view> -->
            </view>
            <view class="num"> ×{{ item.cart_num }} </view>
          </view>
        </view>
        <view class="total">
          <view class="total-num"> 共计{{ order.totalNum }}件商品 </view>
          <view class="total-price"> 订单总计：￥{{ order.pay_price }} </view>
        </view>
        <view class="action-btn" @click="gotoDetail(order.id)">
          <view class="detail">查看详情</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
  import navTabs from '@/components/navTabs.vue'
  import orderApi from '@/api/order'
  const navItems = [
    { key: -1, label: '全部' },
    { key: 2, label: '待支付' },
    { key: 3, label: '待发货' },
    { key: 4, label: '待收货' },
    { key: 0, label: '已完成' },
  ]
  const activeKey = ref(-1)

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

  const orderList = ref()

  const getOrderList = (status: string | number) => {
    orderApi
      .orderList({
        status: status,
        page: 1,
        limit: 999,
        keywords: '',
      })
      .then((res) => {
        orderList.value = res.data.data.map((item: any) => {
          let totalNum = 0
          item.detail.forEach((goods: any) => {
            totalNum += goods.cart_num
          })
          return { ...item, totalNum }
        })
      })
  }

  const gotoDetail = (id: string | number) => {
    uni.navigateTo({
      url: '/pages/order/detail?orderId=' + id,
    })
  }
  onLoad((option) => {
    if (option) {
      activeKey.value = Number(option.status)
      getOrderList(activeKey.value)
    }
  })
  onShow(() => {
    getOrderList(activeKey.value)
  })
</script>

<style lang="scss" scoped>
  .content {
    background: rgba(0, 0, 0, 0.1);
  }

  .list-box {
    width: 100%;
    height: calc(100vh - 100rpx);
    .list-item {
      margin-bottom: 20rpx;
      background-color: #fff;
      .order {
        padding: 30rpx;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        .status {
          font-size: 28rpx;
          color: #1a1a1a;
          font-weight: 600;
          margin-bottom: 20rpx;
          line-height: 44rpx;
        }
        .desc {
          font-size: 24rpx;
          color: #1a1a1a;
          margin-bottom: 10rpx;
          line-height: 36rpx;
        }
      }
      .product {
        padding: 30rpx;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        .title {
          font-size: 28rpx;
          color: #1a1a1a;
          font-weight: 600;
          margin-bottom: 20rpx;
          line-height: 44rpx;
        }

        .product-item {
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

      .total {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 30rpx;
        .total-num {
          font-size: 28rpx;
          color: #1a1a1a;
          font-weight: 600;
        }

        .total-price {
          font-size: 28rpx;
          color: #1a1a1a;
        }
      }

      .action-btn {
        display: flex;
        justify-content: flex-end;
        padding: 20rpx 30rpx;

        .detail {
          width: 240rpx;
          height: 70rpx;
          text-align: center;
          color: #1a1a1a;
          border-radius: 50rpx;
          border: 1rpx solid #1a1a1a;
          line-height: 70rpx;
          font-size: 32rpx;
        }
      }
    }
  }
</style>
