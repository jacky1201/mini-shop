<template>
  <view class="content">
    <view class="list" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
      <view class="wrapper">
        <view class="address-box">
          <text class="address">{{ item.address }} {{ item.area }}</text>
        </view>
        <view class="u-box">
          <text class="name">{{ item.name }}</text>
          <text class="mobile">{{ item.mobile }}</text>
          <text v-if="item.default" class="tag" style="float: right">默认</text>
        </view>
      </view>
      <view @click.native.stop="addAddress('edit', item)">
        <uni-icons type="compose" size="24" style="position: relative; top: 13px"></uni-icons>
      </view>
    </view>
    <button class="add-btn" @click="addAddress('add')">新增地址</button>
  </view>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import addressApi from '@/api/address'

  interface AddressItem {
    id: number
    name: string
    mobile: string
    address: string
    area: string
    default: boolean
  }

  const addressList = ref<AddressItem[]>([])

  function checkAddress(item: AddressItem) {
    uni.$emit('checkAddress', item)
    uni.navigateBack()
  }

  function addAddress(type: string, item?: AddressItem) {
    uni.navigateTo({
      url: `/pages/address/detail?type=${type}&data=${JSON.stringify(item)}`,
    })
  }

  async function getAddressList() {
    const res = await addressApi.info()
    addressList.value = res.data.map((item: any) => ({
      id: item.id,
      name: item.real_name,
      mobile: item.phone,
      address: item.province + item.city + item.county,
      area: item.detail,
      default: item.is_default == 1,
    }))
  }
  onLoad(() => {
    // 获取地址列表
    getAddressList()
  })
  onMounted(() => {
    uni.$on('refreshData', getAddressList)
  })

  onBeforeUnmount(() => {
    uni.$off('refreshData', getAddressList)
  })
</script>

<style lang="scss" scoped>
  page {
    padding-bottom: 120upx;
  }
  .content {
    position: relative;
  }
  .list {
    display: flex;
    align-items: center;
    padding: 20upx 30upx;
    background: #fff;
    position: relative;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .tag {
    font-size: 24upx;
    color: #1a1a1a;
    margin-right: 10upx;
    background: #fffafb;
    border: 1px solid #ffb4c7;
    border-radius: 4upx;
    padding: 4upx 10upx;
    line-height: 1;
  }
  .address-box {
    display: flex;
    align-items: center;

    .address {
      font-size: 30upx;
      color: #1a1a1a;
    }
  }
  .u-box {
    font-size: 28upx;
    color: #1a1a1a;
    margin-top: 16upx;
    .name {
      margin-right: 30upx;
    }
  }
  .icon-bianji {
    display: flex;
    align-items: center;
    height: 80upx;
    font-size: 40upx;
    color: #1a1a1a;
    padding-left: 30upx;
  }

  .add-btn {
    position: fixed;
    left: 30upx;
    right: 30upx;
    bottom: 16upx;
    z-index: 95;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 690upx;
    height: 80upx;
    font-size: 32upx;
    color: #fff;
    background-color: #1a1a1a;
    border-radius: 10upx;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
  }
</style>
