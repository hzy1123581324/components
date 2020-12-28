<template>
    <view class="noData-box">
        <slot>{{'~~'+i18n.nodata+'~~'}}</slot>
    </view>
</template>

<script>
</script>

<style scoped>
    .noData-box{
        text-align: center;
        margin-top: 60rpx;
    }
</style>
