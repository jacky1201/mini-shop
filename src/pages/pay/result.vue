<template>
  <view class="order-result">
    <uni-icons type="checkbox-filled" size="70" color="#67C23A" class="order-success-icon" v-if="pay_status == 2"></uni-icons>
    <uni-icons type="clear" size="70" class="order-success-icon" v-else></uni-icons>
    <uni-card>
      <h2 class="result-title" v-if="pay_status == 2">订单支付成功</h2>
      <h2 class="result-title" v-else>订单支付失败</h2>
      <view class="wrapper">
        <view class="item">
          <view>订单号</view>
          <view class="itemCom">{{ order_no }}</view>
        </view>
        <view class="item">
          <view>下单时间</view>
          <view class="itemCom">{{ order_time }}</view>
        </view>
        <view class="item">
          <view>支付方式</view>
          <view class="itemCom">{{ pay_way }}</view>
        </view>
        <view class="item">
          <view>支付金额</view>
          <view class="itemCom">{{ pay_price }}</view>
        </view>
      </view>
      <view class="btn-group">
        <navigator url="/pages/order/order?state=0" open-type="redirect" class="mix-btn" :style="{ background: '#1a1a1a' }">查看订单</navigator>
        <navigator url="/pages/index/index" open-type="switchTab" class="mix-btn hollow">返回首页</navigator>
      </view>
    </uni-card>
  </view>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import orderApi from '@/api/order'

  const pay_status = ref<number>(2)
  const type = ref<number>(1)
  const groupon_order_id = ref<number>(0)
  const order_no = ref<string>('')
  const order_time = ref<string>('')
  const pay_way = ref<string>('')
  const pay_price = ref<string>('')
  const fontColor = ref<string>('')
  const themeBg = ref<string>('')
  const groupon_status = ref<number>(0)

  onShow(() => {
    const theme = uni.getStorageSync('theme')
    fontColor.value = theme.color
    themeBg.value = `linear-gradient(90deg, ${theme.bg1}, ${theme.bg2})`
  })

  onLoad((option: any) => {
    order_no.value = option.order_no
    getOrderInfo()
  })

  const getOrderInfo = async () => {
    const res = await orderApi.getOrderInfo({ order_no: order_no.value })
    order_time.value = res.data.create_time
    type.value = res.data.type
    if (type.value === 2) {
      groupon_order_id.value = res.data.groupon_order_id
      groupon_status.value = res.data.groupon_status
    }
    pay_way.value = res.data.pay_way === 1 ? '微信' : res.data.pay_way === 2 ? '支付宝' : '余额'
    pay_price.value = res.data.pay_price
    pay_status.value = res.data.pay_status
  }

  const goto = (url: string) => {
    uni.redirectTo({ url })
  }

  const goJoin = () => {
    uni.navigateTo({
      url: `/pages/groupon/join?id=${groupon_order_id.value}`,
    })
  }
</script>

<style lang="scss" scoped>
  .order-result {
    height: 100vh;
    margin: 10% auto;
  }
  .order-success-icon {
    position: relative;
    top: 49px;
    z-index: 99;
    left: 43%;
  }
  .result-title {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin: 25px 0 18px 0;
    color: #333;
  }
  .wrapper {
    border: 1px solid #eee;
    margin: 0 15px 23px 15px;
    padding: 17px 0;
    border-left: 0;
    border-right: 0;
  }
  .wrapper .item {
    margin-top: 10px;
    font-size: 14px;
    color: #282828;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    display: flex;
    justify-content: space-between;
  }
  .wrapper .item .itemCom {
    color: #666;
  }

  .mix-btn {
    margin-top: 30upx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600upx;
    height: 80upx;
    font-size: 28rpx;
    color: #fff;
    background-color: #e8e8e8;
    border-radius: 10upx;
    &.hollow {
      background: #fff;
      color: #303133;
      border: 1px solid #ccc;
    }
  }
  .join-groupon {
    color: #e93323;
    background: #fff;
    height: 39px;
    border: 1px solid #e93323;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-radius: 5px;
  }
</style>
