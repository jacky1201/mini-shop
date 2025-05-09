<template>
  <!-- 购物车 -->
  <view class="content">
    <view class="cart-list">
      <uni-swipe-action-item v-for="(item, index) in cartList" :key="index" :right-options="actionRightOptions"  @click="delCart(index)">
        <view class="cart-item">
          <view class=check-box>
              <radio 
                class="check" 
                :checked="item.isChecked" 
                color="#1A1A1A" 
                style="transform:scale(0.7)"
                @click="checkItem(index)"
                />
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
      </uni-swipe-action-item>
	
      
    </view>

    <view class="footer">
        <view class="check-all">
          <radio class="check" @click="checkAllChange" :checked="checkAll" color="#1A1A1A" style="transform:scale(0.7)"/> 全选
        </view>
        <view class="btn-box">
          <view class="total-price">
            ￥{{ totalPrice }}
          </view>
          <view :class="['btn', btnDisable?'disable':'']" @click="checkedSubmit">
            立即结算
          </view>
        </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  const cartList = ref([
    {
      productName:'测试商品1',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    },
    {
      productName:'测试商品2',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    },
    {
      productName:'测试商品3',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    },{
      productName:'测试商品4',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    },
    {
      productName:'测试商5',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    }
  ])

  const actionRightOptions = [
      {
      text: '删除',
      style: {
        backgroundColor: '#F16341'
      }
    }
  ]

  const checkAll = computed(()=>{
    let index = cartList.value.findIndex(item=> !item.isChecked)
    return index === -1
  })

  const checkItem = (index:number)=>{
    cartList.value[index].isChecked = !cartList.value[index].isChecked
  }

  const checkAllChange = ()=>{
    let all = checkAll.value
    cartList.value.forEach(item=>{
      item.isChecked = !all
    })
  }

  const totalPrice = computed(()=>{
    let total = 0
    cartList.value.forEach(item=>{
      if(item.isChecked){
        total += item.price * item.num
      }
    })
    return total
  })

  const delCart = (index:number)=>{
    cartList.value.splice(index,1)
  }

  // 结算按钮禁用
  const btnDisable = computed(()=>{
    let index = cartList.value.findIndex(item=> item.isChecked)
    return index === -1
  })

  const checkedSubmit = ()=>{
    if(btnDisable.value){
      return false
    }
    const checkedList = cartList.value.filter(item=> item.isChecked)
    console.log("submit", checkedList)
  }
</script>

<style lang="scss" scoped>
.content{
  padding-bottom: 120rpx;
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

.footer{
  position: fixed;
  bottom: 0;
  height: 80rpx;
  display: flex;
  border-top: 1rpx solid rgba(0,0,0,0.1);
  padding: 20rpx 30rpx;
  width: calc(100% - 60rpx);
  line-height: 80rpx;
  justify-content: space-between;
  font-size: 24rpx;
  background-color: #fff;
  .btn-box{
    display: flex;
    .total-price{
      font-weight: 600;
      font-size: 28rpx;
    }
    .btn{
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

    .disable{
      background-color: #C8C9CC;
      color:#1a1a1a;
    }
  }
  

}
</style>
