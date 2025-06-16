<template>
  <scroll-view scroll-x class="nav-scroll" show-scrollbar="false" :scroll-into-view="`nav${activeNavId}`" scroll-with-animation>
    <view class="nav-list">
      <view
        v-for="item in tabs"
        :key="item.key"
        :id="`nav${item.key}`"
        class="nav-item"
        :class="{ active: activeNavId === item.key }"
        @click="switchNav(item.key)"
      >
        {{ item.label }}
        <!-- 选中底部色块 -->
        <view v-if="activeNavId === item.key" class="active-indicator" :style="{ backgroundColor:  activeColor}"></view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface NavItem {
  key:   string | number
  label: string
}

// 接收外部传入的导航项数据
const props = defineProps(
    {
      tabs: {
        type: Array as PropType<NavItem[]>,
        default: () => [
            { key: 1, label: '全部',  },
            { key: 2, label: '联名系列', },
            { key: 3, label: '艺术家精选',  },
            { key: 4, label: '明星同款', },
            { key: 5, label: '玩转方案',  },
        ]
      },
      modelValue: {
        type: Number,
        default: 0
      },
      colors: {
        type: Array as PropType<string[]>,
        default: ()=>['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFAD60']
      }
    }
)

// 计算颜色的index
const activeColor = computed(() => {
    let index = props.tabs.findIndex(item=> item.key === activeNavId.value)
    //取余数
    if(index+1 >= props.colors.length){
        index = index % props.colors.length
    }
  return props.colors[index]
})

// 当前选中的导航项
const activeNavId = ref(props.modelValue || props.tabs[0]?.key)
// 监听外部传入的默认选中项变化
watch(
  activeNavId,
  (newVal) => {
    emit('update:modelValue', newVal)
   
  }
)

// 切换导航
const switchNav = (key: string |number) => {
  activeNavId.value = key
  setTimeout(()=>{
    emit('change', key)
  },500) // 触发 change 事件，通知父组件
}

// 暴露事件
const emit = defineEmits<{
  (event: 'change', key: string | number): void
  (event: 'update:modelValue', key: string | number): void
}>()
</script>

<style lang="scss" scoped>
.nav-scroll {
  background-color: #fff;
  white-space: nowrap;
  padding: 24rpx env(safe-area-inset-right) 0 env(safe-area-inset-left);
  border-bottom: 1rpx solid #f0f0f0;

  .nav-list {
    display: flex;
    padding: 0 20rpx;
    position: relative;

    .nav-item {
      position: relative;
      padding: 0 30rpx;
      padding-bottom: 24rpx;
      font-size: 28rpx;
      color: #999;
      transition: all 0.3s;

      &.active {
        color: #000;
        font-weight: 500;

        .active-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 48rpx;
          height: 6rpx;
          border-radius: 6rpx;
          transition: all 0.3s;
        }
      }

      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>