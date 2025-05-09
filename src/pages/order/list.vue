<template>
    <view class="content">
        <navTabs :tabs="navItems"  />
        <scroll-view scroll-y class="list-box">
            <view class="list-item" v-for="order in 3">
                <view class="order">
                    <view class="status"> 已取消 </view>
                    <view class="desc">
                        订单编号：1234567890
                    </view>
                    <view class="desc">
                        下单时间：2020-01-01 12:00:00
                    </view>
                </view>
                <view class="product">
                    <view class="title">商品信息</view>
                    <view class="product-item" v-for="(item, index) in productList">
                        <view class="image"></view>
                        <view class="info">
                            <view class="prod-name">{{ item.productName }}</view>
                            <view class="price">￥{{ item.price }}</view>
                            <view class="spec-name">{{ item.specsName }}</view>
                        </view>
                        <view class="num">
                            ×{{ item.num }}
                        </view>
                    </view>
                </view>
                <view class="total">
                    <view class="total-num">
                        共计99件商品
                    </view>
                    <view class="total-price">
                        订单总计：￥999.00
                    </view>
                </view>
                <view class="action-btn">
                    <view class="detail">查看详情</view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
<script lang="ts" setup>
    import navTabs from '@/components/navTabs.vue'
    const navItems = [
        { key: '1', label: '全部'},
        { key: '2', label: '待付款'},
        { key: '3', label: '待发货'},
        { key: '4', label: '待收货'},
        { key: '5', label: '待收货'},
        { key: '6', label: '已完成'},
    ]

    const productList = ref([
    {
      productName:'测试商品1',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    },
    {
      productName:'测试商品2',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    },
    {
      productName:'测试商品3',
      price:123,
      num:1,
      imgUrl:"",
      isChecked:true,
      specsName:'测试规格',
    }
  ])
</script>

<style lang="scss" scoped>
    .content{
        background: rgba(0,0,0,0.1);
    }

    .list-box{
        width: 100%;
        height: calc(100vh - 100rpx);
        .list-item{
            margin-bottom: 20rpx;
            background-color: #fff;
            .order{
                padding: 30rpx;
                border-bottom: 2px solid rgba(0,0,0,0.1);
                .status{
                    font-size: 28rpx;
                    color:#1A1A1A;
                    font-weight: 600;
                    margin-bottom: 20rpx;
                    line-height: 44rpx;
                }
                .desc{
                    font-size: 24rpx;
                    color:#1A1A1A;
                    margin-bottom: 10rpx;
                    line-height: 36rpx;
                }
            }
            .product{
                padding: 30rpx;
                border-bottom: 2px solid rgba(0,0,0,0.1);
                .title{
                    font-size: 28rpx;
                    color:#1A1A1A;
                    font-weight: 600;
                    margin-bottom: 20rpx;
                    line-height: 44rpx;
                }

                .product-item{
                    display: flex;
                    align-items: center;
                    .image{
                        width: 150rpx;
                        height: 150rpx;
                        background-color: #ededed;
                    }
                    .num{
                        height: 150rpx;
                    }

                    .info{
                        flex: 1;
                        padding: 20rpx 20rpx;
                        height: 150rpx;
                        color: #1a1a1a;
                        .prod-name,.price{
                            font-size: 28rpx;
                            font-weight: 600;
                        }
                        .price{
                            margin-top: 10rpx;
                        }
                        .spec-name{
                            font-size: 24rpx;
                            margin-top: 20rpx;
                            color: rgba(26,26,26,0.6);
                        }
                    }
                }
            }

            .total{
                display: flex;
                justify-content: space-between;
                padding: 20rpx 30rpx;
                .total-num{
                    font-size: 28rpx;
                    color:#1A1A1A;
                    font-weight: 600;
                }

                .total-price{
                    font-size: 28rpx;
                    color:#1A1A1A;
                }
            }

            .action-btn{
                display: flex;
                justify-content: flex-end;
                padding: 20rpx 30rpx;
                
                .detail{
                    width: 240rpx;
                    height: 70rpx;
                    text-align: center;
                    color: #1A1A1A;
                    border-radius: 50rpx;
                    border: 1rpx solid #1A1A1A;
                    line-height: 70rpx;
                    font-size: 32rpx;
                }
            }
        }
    }
</style>