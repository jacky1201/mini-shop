<template>
  <picker @change="bindPickerChange" @columnchange="columnchange" :range="array" range-key="name" :value="value" mode="multiSelector">
    <slot></slot>
  </picker>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import addressApi from '@/api/address'

  interface Address {
    id: string | number
    name: string
    child?: Address[]
  }

  const value = ref([0, 0, 0])
  const array = reactive<Array<Array<{ code: string | number; name: string }>>>([[], [], []])
  const allAddress = ref<Address[]>([])

  const selectVal = ref(['', '', ''])
  const selectCode = ref(['', '', ''])

  const $emit = defineEmits<{
    (e: 'change', payload: { index: number[]; data: string[]; code: (string | number)[] }): void
  }>()

  // 初始化地址选项
  function initSelect() {
    updateSourceData()
    updateAddressData()
    nextTick()
  }

  // 地址控件改变控件
  function columnchange(e: any) {
    updateSelectIndex(e.detail.column, e.detail.value)
    updateSourceData()
    updateAddressData()
    nextTick()
  }

  async function getAreaData() {
    const res = await addressApi.area()
    allAddress.value = res.data
    initSelect()
  }

  /**
   * 更新源数据
   * */
  function updateSourceData() {
    array[0] = allAddress.value.map((obj) => ({
      code: obj.id,
      name: obj.name,
    }))
    array[1] =
      allAddress.value[value.value[0]]?.child?.map((obj) => ({
        code: obj.id,
        name: obj.name,
      })) || []
    if (allAddress.value[value.value[0]]?.child?.[value.value[1]]?.child) {
      array[2] = allAddress.value[value.value[0]].child![value.value[1]].child!.map((obj) => ({
        code: obj.id,
        name: obj.name,
      }))
    } else {
      array[2] = []
    }
  }

  /**
   * 更新索引
   * */
  function updateSelectIndex(column: number, val: number) {
    const arr = [...value.value]
    arr[column] = val
    if (column === 0) {
      arr[1] = 0
      arr[2] = 0
    }
    if (column === 1) {
      arr[2] = 0
    }
    value.value = arr
  }

  /**
   * 更新结果数据
   * */
  function updateAddressData() {
    selectVal.value[0] = array[0][value.value[0]]?.name || ''
    selectVal.value[1] = array[1][value.value[1]]?.name || ''
    selectVal.value[2] = array[2][value.value[2]]?.name || ''

    selectCode.value[0] = array[0][value.value[0]]?.code !== undefined ? String(array[0][value.value[0]]?.code) : ''
    selectCode.value[1] = array[1][value.value[1]]?.code !== undefined ? String(array[1][value.value[1]]?.code) : ''
    selectCode.value[2] = array[2][value.value[2]]?.code !== undefined ? String(array[2][value.value[2]]?.code) : ''
  }

  /**
   * 点击确定
   * */
  function bindPickerChange() {
    $emit('change', {
      index: value.value,
      data: [...selectVal.value],
      code: [...selectCode.value],
    })
  }

  onMounted(() => {
    getAreaData()
  })
</script>

<style>
  .uni-picker-item {
    font-size: 16px;
  }
</style>
