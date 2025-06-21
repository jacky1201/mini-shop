<!-- src/components/Banner.vue -->
<template>
  <view class="content">
    <swiper
      class="banner"
      indicator-dots
      autoplay
      circular
      :current="current"
      :indicator-active-color="colors[current % props.colors.length]"
      @change="onChange"
      :style="`width:${width}; height: ${height};`"
    >
      <swiper-item class="item" v-for="banner in bannerList" :key="banner.id" @click="onClick(banner)">
        <image :src="banner.pic_url" mode=""></image>
      </swiper-item>
    </swiper>
    <!-- 可选：自定义指示点 -->
    <!--
        <view class="custom-dots">
            <view v-for="(item, index) in bannerList" :key="index" :class="['dot', { active: index === current }]"></view>
        </view>
        -->
  </view>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { on } from 'events'
  interface BannerItem {
    id: number
    pic_url: string
    position: number
  }
  const props = defineProps({
    bannerList: {
      type: Array as PropType<BannerItem[]>,
      default: () => [],
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFAD60'],
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100vh',
    },
  })

  const current = ref(0)

  function onChange(e: any) {
    current.value = e.detail.current
  }

  const onClick = (banner: BannerItem) => {
    emit('click', banner)
  }

  watch(
    () => props.bannerList,
    () => {
      current.value = 0
    }
  )

  const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
  .content {
  }
  .banner {
    width: 100%;
    height: 100%;
    .item {
      width: 100%;
      height: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .custom-dots {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0;
  }
</style>
