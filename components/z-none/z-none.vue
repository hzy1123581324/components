<template>
    <view class="none">
        <image src="@/static/images/empty/none.png" mode="widthFix"></image>
        <view class="nodata-txt">{{noTitle}}</view>
    </view>
</template>

<script>
    export default {
        name: 'none',
        props: {
            noTitle: {
                type: String,
                default: 'no record'
            },
        },
        data(){
            return {
               
            }
        }
    }
</script>

<style lang="scss" scoped>
    .none {
      width: 100%;
      height: 100%;
      padding: 126rpx;
      text-align: center;
    
      image {
        width: 154rpx;
        height: 178rpx;
      }
    
      .nodata-txt {
        margin-top:48rpx;
        font-size: 26rpx;
        font-family: SF Pro Text;
        font-weight: 400;
        color: #A6A6AC;
        opacity: 0.77;
      }
    }
</style>
