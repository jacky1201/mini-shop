<template>
  <view class="content">
    <view class="row b-b">
      <text class="tit">联系人</text>
      <input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
    </view>
    <view class="row b-b">
      <text class="tit">手机号</text>
      <input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
    </view>
    <view class="row b-b">
      <text class="tit">省市区</text>
      <pickerAddress @change="chooseLocation" style="width: 78%; height: 22px">
        <span style="font-size: 30upx; color: #8f939c" v-if="addressData.address == '选择省市区'">{{ addressData.address }}</span>
        <span style="font-size: 30upx; color: #303133" v-else>{{ addressData.address }}</span>
      </pickerAddress>
    </view>
    <view class="row b-b">
      <text class="tit">详细地址</text>
      <input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
    </view>

    <view class="row default-row">
      <text class="tit">设为默认</text>
      <switch :checked="addressData.default" color="#e93323" @change="switchChange" />
    </view>
    <button class="add-btn" @click="confirm">提交</button>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
  import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
  import addressApi from '@/api/address'
  import { success, error } from '@/utils/message'

  interface AddressData {
    id?: number
    name: string
    mobile: string
    area: string
    address: string
    province?: string
    city?: string
    county?: string
    default: boolean
  }

  const addressData = reactive<AddressData>({
    name: '',
    mobile: '',
    area: '',
    address: '选择省市区',
    province: '',
    city: '',
    county: '',
    default: false,
  })

  const manageType = ref('add')

  function switchChange(e: any) {
    addressData.default = e.detail.value
  }

  function chooseLocation(val: any) {
    addressData.address = ''
    addressData.province = val.data[0]
    addressData.city = val.data[1]
    addressData.county = val.data[2]
    val.data.forEach((item: string) => {
      addressData.address += item
    })
  }

  async function confirm() {
    const data = addressData
    if (!data.name) {
      error('请填写收货人姓名')
      return
    }
    if (!/(^1[3|4|5|7|8|9][0-9]{9}$)/.test(data.mobile)) {
      error('请输入正确的手机号码')
      return
    }
    if (!data.address || data.address == '选择省市区') {
      error('请选择省市区')
      return
    }
    if (!data.area) {
      error('请填写门牌号信息')
      return
    }

    const param: any = {
      id: data.id,
      real_name: data.name,
      phone: data.mobile,
      detail: data.area,
      is_default: data.default ? 1 : 2,
    }
    if (data.province) param.province = data.province
    if (data.city) param.city = data.city
    if (data.county) param.county = data.county

    let res
    if (manageType.value === 'edit') {
      res = await addressApi.edit(param)
    } else {
      res = await addressApi.add(param)
    }

    if (res.code === 0) {
      success('保存成功')
      uni.$emit('refreshData')
      setTimeout(() => {
        uni.navigateBack()
      }, 800)
    }
  }

  // 兼容uniapp onLoad
  // 使用uni-app的onLoad生命周期
  onLoad((option: any) => {
    let title = '新增收货地址'
    if (option.type === 'edit') {
      title = '编辑收货地址'
      let data = JSON.parse(option.data)
      // Object.assign(addressData, JSON.parse(option.data))
      addressData.id = data.id
      addressData.address = data.address
      addressData.area = data.area
      addressData.default = data.default
      addressData.mobile = data.mobile
      addressData.name = data.name

      addressData.province = ''
      addressData.city = ''
      addressData.county = ''
      console.log(addressData)
    }
    manageType.value = option.type || 'add'
    uni.setNavigationBarTitle({ title })
  })
</script>

<style lang="scss" scoped>
  page {
    background: #fff;
    padding-top: 16upx;
  }
  .content {
    position: relative;
  }
  .row {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30upx;
    height: 110upx;
    background: #fff;

    .tit {
      flex-shrink: 0;
      font-size: 30upx;
      color: #1a1a1a;
      width: 150upx;
    }
    .input {
      flex: 1;
      font-size: 30upx;
      color: #1a1a1a;
    }
    .icon-shouhuodizhi {
      font-size: 36upx;
      color: #1a1a1a;
    }
  }
  .default-row {
    margin-top: 16upx;
    .tit {
      flex: 1;
    }
    switch {
      transform: translateX(16upx) scale(0.9);
    }
  }
  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 690upx;
    height: 80upx;
    margin: 60upx auto;
    font-size: 24rpx;
    color: #fff;
    background-color: #1a1a1a;
    border-radius: 10upx;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
  }
  .title {
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0 5px 0;
  }

  .data-pickerview {
    height: 400px;
    border: 1px #e5e5e5 solid;
  }

  .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #ebeef5;
  }
  .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #ebeef5;
  }
</style>
