<template>
    <view class="diamond-box">
        <view class="diamond-item"><slot></slot></view>
    </view>
</template>

<script >
    /**
     * navbar 菱形，梯形组件
     * @description ''
     * @tutorial https://www.uviewui.com/components/navbar.html
     * @example <z-diamond class="diamond">这是个菱形</z-diamond>
     * <style>
     * 
     * .diamond{
        --diamond-pad-lf: 组件左内边距
        --diamond-pad-rg: 组件右内边距
        --diamond-transform: 组件形变
        --
     }
     * 
    
     </style>
     */
   
</script>

<style scoped>
    .diamond-box{
        overflow: hidden;
        position: relative;
        padding-left: var(--diamond-pad-lf,0);
        padding-right: var(--diamond-pad-rg,0);
    }
    .diamond-box::before{
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        background-color: var(--diamond-bg-color,#fff);
        transform-origin: center center;
        transform: var(--diamond-transform,skew(-20deg) translateX(-12rpx));
    }
    .diamond-item{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        color: #fff;
    }
</style>
