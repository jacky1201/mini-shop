<template>
  <view class="product-detail">
    <swiper class="product-swiper" indicator-dots autoplay circular>
      <swiper-item class="swiper-item" v-for="img in detailInfo.slider_image" :key="img">
        <image :src="img" mode="scaleToFill" />
      </swiper-item>
    </swiper>

    <view class="product-info">
      <view class="product-title">
        <text>{{ detailInfo.name }}</text>
        <!-- star-filled -->
        <uni-icons :type="favorite ? 'star-filled' : 'star'" size="24" @click="toFavorite" />
      </view>
      <view class="product-price">￥{{ detailInfo.price }}</view>
      <view class="product-specs" v-if="detailInfo.spec == 2">
        <view class="specs-title">
          <image :src="specsIcon" class="specs-icon" />
          <text>产品规格</text>
        </view>
        <view class="specs-btn" @click="buyNow">
          <text style="margin-right: 10rpx">选择</text>
          <uni-icons type="right" size="12" />
        </view>
      </view>
    </view>
    <view class="product-description" v-if="detailDesc">
      <view class="title">商品详情</view>
      <rich-text :nodes="detailDesc"></rich-text>
    </view>
    <view class="button-box">
      <view class="lt">
        <button class="msg-btn" open-type="contact">
          <image class="cart-icon" :src="msgIcon" mode="aspectFit"></image>
        </button>
        <image class="msg-icon" :src="cartIcon" @click="addToCart" mode="aspectFit"></image>
      </view>
      <view class="rt">
        <button class="add-to-cart" @click="addToCart">加入购物车</button>
        <button class="buy-now" @click="buyNow">立即购买</button>
      </view>
    </view>
    <!-- 规格弹窗 -->
    <uni-popup ref="showSpecRef" type="bottom">
      <view class="modal-content">
        <view class="modal-header">
          <uni-icons type="closeempty" size="24" @click="closeSpec" />
        </view>
        <swiper class="modal-swiper">
          <swiper-item class="modal-item" v-for="(img, index) in skuInfo.image" :key="index">
            <image class="modal-img" :src="img"></image>
          </swiper-item>
        </swiper>
        <view class="modal-body">
          <view class="spec-info">
            <view class="lt">
              <view class="price"> ￥{{ skuInfo.price }} </view>
            </view>
            <view class="rt">
              <view class="spec-code"> 商品编码：{{ skuInfo.code }} </view>
            </view>
          </view>
          <view class="spec-item">
            <view class="spec-name"> 商品数量 </view>
            <uni-number-box :min="1" :max="skuInfo.stock" v-model="skuInfo.num" class="picker-box" background="#fff" :width="50" />
          </view>
          <scroll-view v-if="false" scroll-y style="height: 360rpx">
            <view class="spec-item" v-for="(spec, index) in specs" :key="index">
              <view class="spec-name">{{ spec.name }}</view>
              <view class="options-box">
                <view v-if="spec.type === 'version'" class="picker-box">
                  <text>{{ spec.options[0] }}</text>
                  <uni-icons type="down" size="12"></uni-icons>
                </view>

                <template v-if="spec.type === 'color'">
                  <view v-for="(color, index) in spec.options" :key="index" :class="['color-box', index === 0 ? 'color-selected' : '']">
                    <view :style="{ 'background-color': color }" class="color-icon"></view>
                  </view>
                </template>

                <view v-if="spec.type === 'size'">
                  <view class="sku-name">某某某规格</view>
                  <view class="sku-images-box">
                    <view
                      v-for="(image, index) in spec.options"
                      :key="index"
                      :style="{ 'background-color': image }"
                      :class="['sku-image', index === 2 ? 'sku-image-selected' : '']"
                    >
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="modal-footer">
          <button class="confirm-btn" @click="confirmSpecs">{{ buyType == 1 ? '立即购买' : '加入购物车' }}</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import cartIcon from '@/static/product/cart-icon.png'
  import msgIcon from '@/static/product/msg-icon.png'
  import specsIcon from '@/static/product/specs-icon.png'
  import goodsAPI from '@/api/goods'
  import { formatRichText } from '@/utils/util'
  import cartApi from '@/api/cart'
  import collectApi from '@/api/collect'
  import { success, error } from '@/utils/message'
  onLoad((option) => {
    if (option) {
      goodsId.value = option.id
      getGoodsDetail(option.id)
    }
  })
  const goodsId = ref()
  const detailInfo = ref()
  const detailDesc = ref()
  const favorite = ref(false)
  const skuInfo = ref<{
    image: string
    price: number
    stock: number
    code: string
    num: number
  }>({
    image: '',
    price: 0,
    stock: 0,
    code: '',
    num: 0,
  })
  const getGoodsDetail = async (id: string | number) => {
    const res = await goodsAPI.goodsDetail({
      id,
    })
    detailInfo.value = res.data.goodsDetail
    favorite.value = res.data.favorite
    detailDesc.value = formatRichText(res.data.goodsContent.content)
    if (res.data.goodsDetail.spec == 1) {
      skuInfo.value = {
        image: res.data.goodsDetail.slider_image,
        price: res.data.goodsDetail.price,
        stock: res.data.goodsDetail.stock || 1,
        num: 1,
        code: goodsId.value,
      }
    }
  }

  const showSpecRef = ref()
  const specs = ref([
    { name: '选择版本：', options: ['标准版', '豪华版'], type: 'version' },
    { name: '选择外观：', options: ['blue', 'red', '#ededed'], type: 'size' },
    { name: '选择颜色：', options: ['#e60012', '#ccc', '#f15b41'], type: 'color' },
  ])
  const selectedSpecs = ref(Array(specs.value.length).fill(null))
  const buyType = ref(1) // 1: buy now, 2: add to cart
  const buyNow = () => {
    console.log(showSpecRef.value)
    showSpecRef.value.open()
    buyType.value = 1
  }
  const addToCart = () => {
    showSpecRef.value.open()
    buyType.value = 0
  }
  const closeSpec = () => {
    showSpecRef.value.close()
  }

  const selectSpec = (index: number, option: string) => {
    selectedSpecs.value[index] = option
  }

  // 1是购买 2 是加入购物车
  const confirmSpecs = () => {
    console.log('确认规格', skuInfo.value)
    if (skuInfo.value.num > skuInfo.value.stock) {
      error('库存不足')
      return false
    }
    if (buyType.value == 1) {
      let param = [{ id: parseInt(goodsId.value), num: skuInfo.value.num, rule_id: 0 }]
      uni.setStorage({
        key: 'CREATE_ORDER',
        data: JSON.stringify(param),
      })

      uni.navigateTo({
        url: `/pages/order/confirm`,
      })
    } else {
      cartApi
        .addCart({
          goods_id: goodsId.value,
          rule: [],
          num: skuInfo.value.num,
        })
        .then((res) => {
          success('已加入购物车')
          closeSpec()
        })
    }
  }

  const gotoCart = () => {
    uni.switchTab({
      url: '/pages/shopCart/index',
    })
  }

  // 收藏
  const toFavorite = () => {
    if (favorite.value) {
      collectApi.removeByGoods({ goods_id: goodsId.value }).then((res) => {
        error('取消收藏')
        favorite.value = false
      })
    } else {
      collectApi
        .add({
          goods_id: goodsId.value,
          goods_name: detailInfo.value.name,
          goods_pic: detailInfo.value.slider_image[0],
          price: detailInfo.value.price,
        })
        .then((res) => {
          error('收藏成功')
          favorite.value = true
        })
    }
  }

  const gotoChat = () => {
    uni.navigateTo({
      url: '/pages/chat/index?goods_id=' + goodsId.value,
    })
  }
</script>

<style lang="scss" scoped>
  :deep(.uni-numbox) {
    align-items: center;
  }
  .product-swiper {
    width: 100%;
    height: 1000rpx;
    .swiper-item {
      width: 100%;
      height: 100%;
      // background-color: #f5f5f5;
      .image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .product-info {
    margin-top: 20rpx;
    padding: 0 40rpx;
  }

  .product-title {
    font-size: 40rpx;
    font-weight: bold;
    color: #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price {
    font-size: 32rpx;
    color: #1a1a1a;
    margin-top: 14rpx;
  }

  .product-specs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;
    font-size: 24rpx;
    .specs-title {
      display: flex;
      align-items: center;
      .specs-icon {
        width: 24rpx;
        height: 24rpx;
        margin-right: 10rpx;
      }
    }
    .specs-btn {
      display: flex;
      align-items: center;
      padding-left: 30rpx;
    }
  }

  .product-description {
    margin-top: 40rpx;
    background-color: #fff;
    width: 100%;
    padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #1a1a1a;
      padding: 20rpx 40rpx;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
    }
  }

  .button-box {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    background: #fff;
    height: 80rpx;
    border-top: 2rpx solid rgba(0, 0, 0, 0.1);
    padding: 25rpx 0;
    width: 100%;
    .lt {
      width: 200rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 48rpx;
        height: 48rpx;
        margin-left: 30rpx;
      }
    }
    .rt {
      display: flex;
      .add-to-cart,
      .buy-now {
        width: 250rpx;
        height: 78rpx;
        border-radius: 76rpx;
        font-size: 32rpx;
        line-height: 70rpx;
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
  }

  .modal-content {
    background: #fff;
    width: 100%;
    height: 1100rpx;
    position: relative;
    padding-bottom: 110rpx;
  }
  .modal-swiper {
    height: 490rpx;
    width: 100%;
    .modal-item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      .modal-img {
        width: 364rpx;
        height: 100%;
      }
    }
  }
  .modal-header {
    height: 50rpx;
    text-align: right;
    padding: 8rpx 20rpx;
  }

  .modal-title {
    font-size: 32rpx;
    font-weight: bold;
  }

  .close-btn {
    font-size: 36rpx;
    background: none;
    border: none;
    cursor: pointer;
  }

  .modal-body {
    margin-top: 50rpx;
    line-height: 44rpx;
    .spec-info {
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
      .lt {
        .price {
          font-size: 32rpx;
          font-weight: bold;
          color: #f15b41;
        }
      }
      .rt {
        font-size: 24rpx;
        color: #666;
      }
    }
  }

  .spec-item {
    padding: 0 20rpx;
    margin-top: 20rpx;
    .spec-name {
      font-size: 28rpx;
      margin-bottom: 16rpx;
      font-weight: 600;
    }
    .options-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .picker-box {
      width: 200rpx;
      height: 64rpx;
      border-radius: 76rpx;
      background: #fff;
      border: 2rpx solid #1a1a1a;
      font-size: 24rpx;
      line-height: 64rpx;
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
    }

    .color-icon {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      padding: 6rpx;
    }

    .color-box,
    .color-selected {
      width: 58rpx;
      height: 58rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .color-selected {
      border: 1rpx solid #1a1a1a;
    }

    .sku-name {
      color: #1a1a1a;
      font-size: 24rpx;
    }
    .sku-images-box {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20rpx;
      width: 100%;
      .sku-image {
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;
        border-radius: 12rpx;
      }

      .sku-image-selected {
        border: 2rpx solid #1a1a1a;
      }
    }
  }

  .spec-option {
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    padding: 10rpx 20rpx;
    border: 1rpx solid #ccc;
    border-radius: 5rpx;
    background: #f5f5f5;
    cursor: pointer;
  }

  .spec-option.selected {
    background: #1a1a1a;
    color: #fff;
    border-color: #1a1a1a;
  }

  .modal-footer {
    padding: 20rpx;
    border-top: 1px solid #eee;
    text-align: center;
    position: absolute;
    width: calc(100% - 40rpx);
    bottom: 0rpx;
    .confirm-btn {
      padding: 10rpx 20rpx;
      background: #1a1a1a;
      color: #fff;
      border: none;
      font-weight: 600rpx;
      border-radius: 76rpx;
      font-size: 32rpx;
      line-height: 62rpx;
      height: 80rpx;
      cursor: pointer;
    }
  }

  .msg-btn {
    background: #fff;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :deep(wx-button:after) {
    border: 0px;
  }
</style>
