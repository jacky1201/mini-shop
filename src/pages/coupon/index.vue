<template>
  <view class="content">
    <view class="coupon-list">
      <radio-group>
        <view class="item" v-for="(item, index) in couponList" :key="index">
          <view class="radio">
            <radio :checked="index === current" />
          </view>
          <view class="cont">
            <view class="icon"></view>
            <view class="text-box">
              <view class="title">集合了</view>
              <view class="desc">宝可梦：30日</view>
            </view>
            <view class="more"> 了解更多 </view>
          </view>
        </view>
      </radio-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
  const current = ref(0)
  const couponList = ref([
    {
      value: '1',
      title: '满100减10',
      desc: '1233333',
    },
  ])
</script>

<style lang="scss" scoped>
  .content {
    width: 750rpx;
    margin: auto;
    min-height: 100vh;
    background-color: #f8f8f8;
  }
  .coupon-list {
    width: 690rpx;
    margin: 0 auto;

    .item {
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      .radio {
        padding: 0 20rpx;
        display: flex;
        align-items: center;
      }
      .cont {
        padding: 24rpx 30rpx;
        background-color: #fff;
        border-radius: 8rpx;
        display: flex;
        border: 1rpx dashed rgba(0, 0, 0, 0.1);
        flex: 1;
      }
    }
  }
</style>
