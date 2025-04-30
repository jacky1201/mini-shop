<template>
  <view class="address-list">
    <view class="header">
      <text class="title">收货地址列表</text>
      <button class="add-btn" @click="addAddress">新增地址</button>
    </view>
    <view class="address-item" v-for="(address, index) in addressList" :key="index">
      <view class="info">
        <text class="name">{{ address.name }}</text>
        <text class="phone">{{ address.phone }}</text>
        <text class="detail">{{ address.detail }}</text>
      </view>
      <view class="actions">
        <button class="edit-btn" @click="editAddress(index)">编辑</button>
        <button class="delete-btn" @click="deleteAddress(index)">删除</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  interface Address {
    name: string
    phone: string
    detail: string
  }

  const addressList = ref<Address[]>([
    { name: '张三', phone: '13800138000', detail: '北京市朝阳区某小区1号楼' },
    { name: '李四', phone: '13900139000', detail: '上海市浦东新区某小区2号楼' },
  ])

  const addAddress = () => {
    // 跳转到新增地址页面
    uni.navigateTo({ url: '/pages/address/add' })
  }

  const editAddress = (index: number) => {
    // 跳转到编辑地址页面，传递地址索引
    uni.navigateTo({ url: `/pages/address/edit?index=${index}` })
  }

  const deleteAddress = (index: number) => {
    // 删除地址
    addressList.value.splice(index, 1)
  }
</script>

<style scoped>
  .address-list {
    padding: 20rpx;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }
  .title {
    font-size: 36rpx;
    font-weight: bold;
  }
  .add-btn {
    background-color: #007aff;
    color: #fff;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
  }
  .address-item {
    border: 1rpx solid #ddd;
    border-radius: 10rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
  }
  .info {
    margin-bottom: 10rpx;
  }
  .name {
    font-size: 32rpx;
    font-weight: bold;
  }
  .phone {
    font-size: 28rpx;
    color: #666;
  }
  .detail {
    font-size: 28rpx;
    color: #999;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  .edit-btn,
  .delete-btn {
    background-color: #007aff;
    color: #fff;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
    margin-left: 10rpx;
  }
  .delete-btn {
    background-color: #ff3b30;
  }
</style>
