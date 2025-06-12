<script setup lang="ts">
  import { ref } from 'vue'
  import staticImage from '@/components/staticImage.vue'
  import userApi from '@/api/user/user'

  const isAgree = ref(true)
  const userInfo = reactive({
    userName: '',
    avatar: '',
    phone: '',
  })

  onLoad(()=>{
    getUserInfo()
  })

  const getUserInfo = ()=>{
    userApi.getUserInfo().then((result: any) => {
      console.log("result", result.data)
      userInfo.userName = result.data.userInfo.nickname
      userInfo.avatar = result.data.userInfo.avatar
      userInfo.phone = result.data.userInfo.phone
    })
  }
  const genderOptions = [
    { text: '男', value: 'male' },
    { text: '女', value: 'female' },
  ]

  const handleRegister = () => {
    if (!isAgree.value) {
      uni.showToast({
        title: '请同意隐私条款',
        icon: 'none',
      })
      return
    }
    // 处理注册逻辑
  }

  const goBack = () => {
    uni.navigateBack({ delta: 1 })
  }
  function setUserName(e: any) {
    const { value } = e.detail
    userInfo.userName = value
  }
  const bindAvatar = (e: any) => {
    console.log('头像上传成功', e.detail.avatarUrl)

    userApi.uploadImages('userAvatarUrl', { filePath: e.detail.avatarUrl, name: 'file' }).then((result: any) => {
      userInfo.avatar = result.url
    })
  }
</script>

<template>
  <view class="register-container">
    <view class="main-content">
      <view class="title">创建账号</view>

      <!-- 头像上传 -->
      <view class="avatar-upload">
        <image :src="userInfo.avatar ? userInfo.avatar : '/static/images/casetify-logo.png'" class="avatar" />
        <button class="edit-icon" open-type="chooseAvatar" @chooseavatar="bindAvatar">
          <staticImage src="/static/my/user-edit.png" width="36rpx" height="36rpx"></staticImage>
        </button>
      </view>

      <!-- 表单区域 -->
      <view class="form-group">
        <view class="form-item">
          <text class="label">昵称</text>
          <uni-easyinput type="nickname" v-model="userInfo.userName" placeholder="请输入昵称" @blur="setUserName" />
        </view>

        <!-- <view class="form-item">
          <text class="label">性别</text>
          <uni-data-select
            v-model="userInfo.gender"
            :localdata="genderOptions"
            @change="(e: any) => (gender = genderOptions[e.detail.value].value)"
          ></uni-data-select>
        </view> -->

        <view class="form-item">
          <text class="label">手机号码</text>
          <uni-easyinput disabled  v-model="userInfo.phone" placeholder="请输入手机号" placeholder-class="placeholder" />
        </view>

        <!-- <view class="form-item birth-date">
          <text class="label">出生年月</text>
          <view class="date-pickers">
            <uni-datetime-picker type="date" v-model="birthYear" />
          </view>
        </view> -->
      </view>

      <!-- 隐私协议 -->
      <view class="privacy-agreement">
        <radio  :checked="isAgree" @click="isAgree=!isAgree" color="#000" />
        <text class="agreement-text">
          我已阅读并同意 CASETiFY 的
          <text class="link">《隐私条款》</text>
        </text>
      </view>

      <!-- 注册按钮 -->
      <button class="register-btn" @tap="handleRegister"> 保存修改 </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .register-container {
    min-height: 100vh;
    background: #fff;
    padding: 0 40rpx;
    padding-top: env(safe-area-inset-top);
  }

  .header {
    height: 88rpx;
    display: flex;
    align-items: center;

    .back-icon {
      font-size: 40rpx;
      color: #000;
    }
  }

  .main-content {
    padding-top: 40rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 60rpx;
      text-align: center;
    }
  }

  .avatar-upload {
    position: relative;
    width: 160rpx;
    height: 160rpx;
    margin: 0 auto 60rpx;

    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #f5f5f5;
    }

    .edit-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 40rpx;
      height: 40rpx;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
      padding-left: 0rpx;
      padding-right: 0rpx;
    }
  }

  .form-group {
    .form-item {
      margin-bottom: 40rpx;

      .label {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 16rpx;
        display: block;
      }

      input,
      .picker-value {
        height: 88rpx;
        background: #f8f8f8;
        border-radius: 12rpx;
        padding: 0 24rpx;
        font-size: 28rpx;
      }

      .placeholder {
        color: #999;
      }

      &.birth-date {
        .date-pickers {
          display: flex;
          gap: 20rpx;

          picker {
            flex: 1;
          }
        }
      }
    }
  }

  .privacy-agreement {
    display: flex;
    align-items: center;
    margin: 40rpx 0;

    .agreement-text {
      font-size: 24rpx;
      color: #666;
      margin-left: 12rpx;

      .link {
        color: #000;
        text-decoration: underline;
      }
    }
  }

  .register-btn {
    width: 100%;
    height: 88rpx;
    background: #000;
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60rpx;

    &:active {
      opacity: 0.8;
    }
  }




</style>
