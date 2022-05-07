<template>
    <view class="noData-box">
        <image class="no-data-img" src="./images/1.png" mode="widthFix"></image>
        <slot>{{noDataTxt}}</slot>
    </view>
</template>

<script>
    export default {
        name: 'no-data',
        setup(){
          let noDataTxt = ref('暂无数据');
          return {
            noDataTxt,
          }
        }
    }
</script>

<style scoped>
    
    .noData-box{
        margin-top: 60rpx;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .no-data-img{
        width: 200rpx;
        height: 100rpx;
        margin-bottom: 20rpx;
    }
</style>
