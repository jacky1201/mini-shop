<template>
  <view class="content">
    <view v-for="video in videoList" :key="video.id" class="video-card">
      <view class="video-cover-wrapper">
        <video :src="video.url" :poster="video.cover_url" controls class="video-player"></video>
      </view>
      <view class="video-title">{{ video.title }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
  import clubApi from '@/api/club'
  onLoad((option) => {
    if (option && option.id) {
      getVideoList(option.id)
    }
  })
  const videoList = ref<{ id: string; url: string; title: string; cover_url: string }[]>([])
  const getVideoList = (id: string) => {
    clubApi.getVideoList({ goods_id: id }).then((res: any) => {
      videoList.value = res.data.map((item: any) => {
        return {
          id: item.id,
          url: item.play_url,
          title: item.title,
          cover_url: item.cover_url,
        }
      })
    })
  }
</script>
<style lang="scss" scoped>
  .video-card {
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 32rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .video-cover-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 12rpx;
    margin-bottom: 16rpx;
    // background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-player {
    width: 100%;
    height: 600rpx;
    object-fit: cover;
    border-radius: 12rpx;
    background: #000;
  }

  .video-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #222;
    margin-top: 8rpx;
    line-height: 1.4;
    word-break: break-all;
  }
</style>
