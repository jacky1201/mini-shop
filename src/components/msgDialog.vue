<template>
    <view>
        <uni-popup ref="popupRef">
            <view class="popup-box">
                <view class="title">
                    {{ title }}
                </view>
                <scroll-view class="popup-body" scroll-y :style="{height: height}" >
                    <view class="msg-text">
                        {{ content }}
                    </view>
                </scroll-view>

                <view class="popup-footer" v-if="!hiddenFooter">
                    
                    <template v-if="confirm.show">
                        <view class="close-btn" @click="confirmClick(false)">{{ confirm.closeText }}</view>
                        <view class="confirm-btn" @click="confirmClick(true)">{{ confirm.confirmText }}</view>
                    </template>
                    <view v-else class="submit-btn" @click="submitClick">{{ submit.subtext }}</view>
                </view>
                <uni-icons class="close-icon" type="closeempty" size="20" @click="close()" ></uni-icons>
                
            </view>
        </uni-popup>
    </view>
</template>

<script lang="ts" setup>

    const props = defineProps({
        title: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '400rpx'
        },
        content: {
            type: String,
            default: ''
        },
        submit: {
            type: Object,
            default: ()=>{
                return {
                    subtext:"确认",
                    callback: ()=>{
                        console.log('submit')
                    }
                }
            }
        },
        confirm:{
            type: Object,
            default: ()=>{
                return {
                    closeText:"取消",
                    confirmText:"确定",
                    show:false,
                    confirm: (confirm:boolean)=>{
                        console.log('confirm')
                    }
                }
            }
        },
        hiddenFooter:{
            type: Boolean,
            default: false
        }
    })

    const { confirm,hiddenFooter,submit,content,height,title } = toRefs(props)
    const popupRef = ref()

    const open = ()=>{
        popupRef.value.open()
    }

    const close = ()=>{
        popupRef.value.close()
    }

    const submitClick = ()=>{
        props.submit.callback()
        close()
    }

    const confirmClick = (confirmType:boolean)=>{
        props.confirm.confirm(confirmType)
        close()
    }

    defineExpose({
        open,
        close
    })
</script>

<style lang="scss" scoped>

    .popup-box{
        background-color: #fff;
        padding: 20rpx 40rpx;
        border-radius: 16rpx;
        width: 610rpx;
        min-height: 440rpx;
        position: relative;
        .title{
            height: 60rpx;
            text-align: center;
            line-height: 44rpx;
            font-size: 32rpx;
            
        }

        .close-icon{
            position: absolute;
            right: 40rpx;
            top: 20rpx;
        }
    }

    .popup-body{
        width: 100%;
        .msg-text{
            font-size: 28rpx;
            color: 1a1a1a;
            line-height: 36rpx;
        }
    }

    .popup-footer{
        width: 100%;
        display: flex;
        justify-content: center;
        .submit-btn{
            width: 100%;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background-color: #1a1a1a;
            border-radius: 16rpx;
            color: #fff;
            font-size: 32rpx;
        }
        .close-btn,.confirm-btn{
            width: 240rpx;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background-color: #fff;
            border-radius: 16rpx;
            border: 1px solid #ddd;
            color: #333;
            font-size: 32rpx;
        }
        .confirm-btn{
            background-color: #1a1a1a;
            color: #fff;
        }
        .close-btn{
            margin-right: 60rpx;
        }
        
    }
</style>