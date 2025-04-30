<template>
  <!-- 购物车 -->
  <view class="content">
    <view class="cart-list">
      <view class="cart-item" v-for="(item, index) in cartList" :key="index">
        <view class=check-box>
          <radio class="check" :checked="item.isChecked" color="#1A1A1A" style="transform:scale(0.7)"/>
          <view class="image"></view>
          <view class="cart-info">
              <view class="prod-name">{{ item.productName }}</view>
              <view class="spec-name">{{ item.specsName }}</view>
          </view>
          <view class="price">￥{{ item.price }}</view>
        </view>
        <view class="num-box">
          <uni-number-box  background="#fff" color="#1a1a1a" style="border:1rpx solid #C8C9CC;border-radius: 6rpx 6rpx 6rpx 6rpx;" v-model="item.num" ></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  const cartList = ref([
    {
      productName:'测试商品',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:false,
      specsName:'测试规格',
    }
  ])
</script>

<style lang="scss" scoped>
.content{

}

.cart-list{
  .cart-item{
    padding: 40rpx 20rpx;
    border-bottom: 1rpx solid rgba(0,0,0,0.1);
    .check-box{
      display: flex;
      align-items: center;
      .check{
        padding-right: 20rpx;
      }

      .image{
        width: 150rpx;
        height: 150rpx;
        background-color: #ededed;
      }
      .cart-info{
        margin: 0 20rpx;
        flex: 1;
        height: 150rpx;
        color: #1a1a1a;
        .prod-name{
          font-size: 28rpx;
        }
        .spec-name{
          font-size: 20rpx;
          margin-top: 30rpx;
          color: rgba(26,26,26,0.6);
        }
      }
      .price{
        height: 150rpx;
        color: 28rpx;
        text-align: right;
        color: #1a1a1a;
        font-weight: 500;
      }
    }

    .num-box{
      margin-top: 10rpx;
      display: flex;
      justify-content: flex-end;

      :deep(.uni-numbox__value){
        border-left: 1rpx solid #C8C9CC;
        border-right: 1rpx solid #C8C9CC;
      }
    }
  }
}
</style>
