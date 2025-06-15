<template>
  <!-- 购物车 -->
  <view class="content">
    <view class="cart-list">
      <uni-swipe-action-item v-for="(item, index) in cartList" :key="index" :right-options="actionRightOptions" @click="delCart(item)">
        <view class="cart-item">
          <view class="check-box">
            <radio class="check" :checked="item.isChecked" color="#1A1A1A" style="transform: scale(0.7)" @click="checkItem(index)" />
            <image class="image" :src="item.images" />
            <view class="cart-info">
              <view class="prod-name">{{ item.title }}</view>
              <!-- <view class="spec-name">{{ item.specsName }}</view> -->
            </view>
            <view class="price">￥{{ item.price }}</view>
          </view>
          <view class="num-box">
            <uni-number-box
              background="#fff"
              color="#1a1a1a"
              style="border: 1rpx solid #c8c9cc; border-radius: 6rpx 6rpx 6rpx 6rpx"
              v-model="item.goods_num"
              @change="changeNum(item)"
              :min="1"
            ></uni-number-box>
          </view>
        </view>
      </uni-swipe-action-item>
    </view>

    <view class="footer">
      <view class="check-all">
        <radio class="check" @click="checkAllChange" :checked="checkAll" color="#1A1A1A" style="transform: scale(0.7)" /> 全选
      </view>
      <view class="btn-box">
        <view class="total-price"> ￥{{ totalPrice }} </view>
        <view :class="['btn', btnDisable ? 'disable' : '']" @click="checkedSubmit"> 立即结算 </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import cartApi from '@/api/cart'
  import { error } from '@/utils/message'
  interface CartItem {
    create_time: string
    goods_id: number
    goods_num: number
    id: number
    images: string
    original_price: string
    price: string | number
    rule_id: number
    rule_text: string
    title: string
    total_amount: string
    update_time: string
    user_id: number
    isChecked?: boolean
  }
  const cartList = ref<CartItem[]>([])

  const actionRightOptions = [
    {
      text: '删除',
      style: {
        backgroundColor: '#F16341',
      },
    },
  ]

  const checkAll = computed(() => {
    let index = cartList.value.findIndex((item) => !item.isChecked)
    return index === -1
  })

  const checkItem = (index: number) => {
    cartList.value[index].isChecked = !cartList.value[index].isChecked
  }

  const checkAllChange = () => {
    let all = checkAll.value
    cartList.value.forEach((item) => {
      item.isChecked = !all
    })
  }

  const totalPrice = computed(() => {
    let total = 0
    cartList.value.forEach((item) => {
      if (item.isChecked) {
        total += Number(item.price) * item.goods_num
      }
    })
    return total.toFixed(2)
  })

  const delCart = (item: CartItem) => {
    cartApi
      .remove({
        id: item.id,
      })
      .then((res) => {
        getShopCartList()
      })
  }

  const changeNum = (data: CartItem) => {
    cartApi.changeNum({
      id: data.id,
      num: data.goods_num,
    })
  }

  // 结算按钮禁用
  const btnDisable = computed(() => {
    let index = cartList.value.findIndex((item) => item.isChecked)
    return index === -1
  })

  const getShopCartList = () => {
    cartApi
      .myCartList<{ data: CartItem[] }>({
        limit: 999,
        page: 1,
      })
      .then((res) => {
        cartList.value = res.data.data.map((item) => {
          return { ...item, isChecked: true }
        })
      })
  }

  const checkedSubmit = () => {
    if (btnDisable.value) {
      return false
    }
    let goodsData = cartList.value
      .filter((item) => item.isChecked)
      .map((item) => {
        return {
          id: item.goods_id,
          cart_id: item.id,
          price: item.price,
          num: item.goods_num,
          rule_id: item.rule_id,
          type: 1,
        }
      })
    if (goodsData.length == 0) {
      error('请先选择结算商品')
    }
    uni.setStorage({
      key: 'CREATE_ORDER',
      data: JSON.stringify(goodsData),
    })

    uni.navigateTo({
      url: `/pages/order/confirm`,
    })
  }
  onShow(() => {
    getShopCartList()
  })
</script>

<style lang="scss" scoped>
  .content {
    padding-bottom: 120rpx;
  }

  .cart-list {
    .cart-item {
      padding: 40rpx 20rpx;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
      .check-box {
        display: flex;
        align-items: center;
        .check {
          padding-right: 20rpx;
        }

        .image {
          width: 150rpx;
          height: 150rpx;
          background-color: #ededed;
        }
        .cart-info {
          margin: 0 20rpx;
          flex: 1;
          height: 150rpx;
          color: #1a1a1a;
          .prod-name {
            font-size: 28rpx;
          }
          .spec-name {
            font-size: 20rpx;
            margin-top: 30rpx;
            color: rgba(26, 26, 26, 0.6);
          }
        }
        .price {
          height: 150rpx;
          color: 28rpx;
          text-align: right;
          color: #1a1a1a;
          font-weight: 500;
        }
      }

      .num-box {
        margin-top: 10rpx;
        display: flex;
        justify-content: flex-end;

        :deep(.uni-numbox__value) {
          border-left: 1rpx solid #c8c9cc;
          border-right: 1rpx solid #c8c9cc;
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    height: 80rpx;
    display: flex;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);
    padding: 20rpx 30rpx;
    width: calc(100% - 60rpx);
    line-height: 80rpx;
    justify-content: space-between;
    font-size: 24rpx;
    background-color: #fff;
    .btn-box {
      display: flex;
      .total-price {
        font-weight: 600;
        font-size: 28rpx;
      }
      .btn {
        width: 240rpx;
        margin-left: 20rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        text-align: center;
        font-size: 32rpx;
        color: #fff;
        background-color: #1a1a1a;
      }

      .disable {
        background-color: #c8c9cc;
        color: #1a1a1a;
      }
    }
  }
</style>
