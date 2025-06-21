<template>
  <view class="content">
    <view class="coupon-list">
      <radio-group>
        <view class="item" v-for="(item, index) in couponList" :key="index">
          <view class="radio" v-if="!viewType">
            <radio :checked="index === current" />
          </view>
          <view class="cont">
            <view class="icon">
              <image :src="couponIcon" />
            </view>
            <view class="text-box">
              <view class="title">集合了</view>
              <view class="desc">
                <view> 宝可梦：30日 </view>
                <view class="more" @click="moreRuleShow"> 了解更多 </view>
              </view>
            </view>
          </view>
        </view>
      </radio-group>
    </view>
    <view class="footer" v-if="!viewType">
      <view class="footer-btn">确定</view>
    </view>
    <msg-Dialog ref="dialogRef" title="优惠券使用说明" content="我的优惠券期限和内容" />
  </view>
</template>

<script lang="ts" setup>
  import couponIcon from '@/static/product/coupon-icon.png'
  import msgDialog from '@/components/msgDialog.vue'
  import couponApi from '@/api/coupon'
  const current = ref(3)
  const dialogRef = ref()
  const couponList = ref([
    {
      value: '1',
      title: '满100减10',
      desc: '1233333',
    },
  ])
  const moreRuleShow = () => {
    dialogRef.value.open()
  }

  const getCouponList = () => {
    couponApi.myCouponList({ status: 1, page: 1, limit: 999 }).then((res) => {})
  }

  const viewType = ref(false)
  onLoad((option: any) => {
    // 页面加载时可以获取传入的参数
    console.log('页面加载，参数:', option)
    if (option) {
      viewType.value = option.type === 'view'
    }
    getCouponList()
  })
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
        padding: 40rpx 30rpx;
        background-color: #fff;
        border-radius: 8rpx;
        display: flex;
        align-items: center;
        border: 1rpx dashed rgba(0, 0, 0, 0.1);
        flex: 1;
        .icon {
          width: 66rpx;
          height: 66rpx;
          padding: 10rpx 0;
          padding-right: 20rpx;
          border-right: 2rpx solid rgba(26, 26, 26, 0.2);
          image {
            width: 100%;
            height: 100%;
          }
        }

        .text-box {
          padding-left: 20rpx;
          flex: 1;
          .title {
            font-weight: 400;
            font-size: 24rpx;
            color: #1a1a1a;
            line-height: 32rpx;
            margin-bottom: 34rpx;
          }
          .desc {
            font-size: 20rpx;
            color: #1a1a1a;
            line-height: 28rpx;
            display: flex;
            justify-content: space-between;
            .more {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    background-color: #fff;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .footer-btn {
      width: 600rpx;
      height: 80rpx;
      line-height: 70rpx;
      font-size: 32rpx;
      margin: 20rpx auto;
      background: #1a1a1a;
      color: #fff;
      text-align: center;
      border-radius: 40rpx;
    }
  }
</style>
