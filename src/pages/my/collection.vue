<template>
  <view>
    <view class="collect-list">
      <view class="collect-item" v-for="item in collectMap" :key="item.id">
        <view class="goods-img" @click="navToDetailPage(item)">
          <image :src="item.goods_pic" style="width: 67px; height: 67px" />
        </view>
        <view class="goods-content" @click="navToDetailPage(item)">
          <view class="goods-title">
            {{ item.goods_name }}
          </view>
          <view class="goods-price">￥{{ item.price }}</view>
        </view>
        <view class="operate">
          <uni-icons type="trash-filled" size="20" color="#e93323" @click="rmCollect(item)"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import collectApi from '@/api/collect'
  import { success, error } from '@/utils/message'

  interface CollectItem {
    id: number
    goods_id: number
    goods_pic: string
    goods_name: string
    price: number
    // 其他字段根据实际接口补充
  }

  const loadingType = ref<'more' | 'noMore'>('more')
  const collectMap = ref<CollectItem[]>([])
  const form = ref({
    page: 1,
    limit: 10,
  })
  const totalPage = ref(1)

  onMounted(() => {
    getMyCollect()
  })

  // 获取我的收藏
  async function getMyCollect(type?: 'more') {
    uni.showLoading({ title: '请求中..' })
    const res = await collectApi.myCollect(form.value)
    uni.hideLoading()
    if (type === 'more') {
      collectMap.value = collectMap.value.concat(res.data.data)
    } else {
      totalPage.value = res.data.last_page
      collectMap.value = res.data.data
    }
    if (form.value.page === totalPage.value || totalPage.value === 0) {
      loadingType.value = 'noMore'
    } else {
      loadingType.value = 'more'
    }
  }

  // 删除收藏
  async function rmCollect(item: CollectItem) {
    uni.showLoading({ title: '请求中..' })
    const res = await (collectApi.remove({ id: item.id }) ?? Promise.resolve({ code: -1, msg: '接口未实现' }))
    uni.hideLoading()
    if (res.code === 0) {
      success(res.msg)
      form.value.page = 1
      getMyCollect()
    } else {
      error(res.msg)
    }
  }

  // 普通商品详情页
  function navToDetailPage(item: CollectItem) {
    const id = item.goods_id
    uni.navigateTo({
      url: `/pages/product/product?id=${id}`,
    })
  }

  // 加载更多
  function more() {
    form.value.page += 1
    getMyCollect('more')
  }
</script>

<style lang="scss" scoped>
  .collect-list {
    height: 100%;
    width: 100%;
    background: #fff;
    border-top: 1px solid #eee;
  }
  .collect-item {
    margin-left: 15px;
    border-bottom: 1px solid #eee;
    height: 93px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .goods-img {
    height: 67px;
    width: 67px;
    text-align: center;
  }
  .goods-content {
    width: calc(100% - 127px);
    height: 100%;
    padding: 10px 0px 5px 10px;
    .goods-title {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 14px;
    }
    .goods-price {
      margin-top: 20px;
      color: #e93323;
    }
  }
  .operate {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
  .loadmore {
    display: flex;
    flex-direction: row;
    height: 41px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
</style>
