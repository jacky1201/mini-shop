<template>
  <view class="static-image" :style="{ width: props.width, height: props.height }">
    <image :src="props.src" :alt="props.alt"></image>
  </view>
</template>

<script lang="ts" setup>
  // 组件的作用是渲染静态图片
  // 组件的名称是 staticImage
  // 组件的 props 包括 src、alt、width 和 height
  // src 是图片的路径
  // alt 是图片的替代文本
  // width 是图片的宽度
  // height 是图片的高度
  // 组件的作用是渲染静态图片
  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '200rpx',
    },
    height: {
      type: String,
      default: '200rpx',
    },
  })
</script>

<style lang="scss" scoped>
  .static-image {
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }
  }
</style>
