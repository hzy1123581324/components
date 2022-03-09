<template>
    <view class="lineTitle-box">
       <view class="title-main">
           <slot></slot>
       </view>
    </view>
</template>

<script>
    /**
     * z-line-title 标题
     * @description  标题左右是图片
     * @tutorial https://www.uviewui.com/components/button.html
     * @example <z-line-title class="line-title">这个是标题</z-line-title>
     * <style>
        .line-title{
            --line-bg:   用于左右图片一样
            --line-bg-lf  左边图片
            --line-bg-rg  右边图片
            --line-space  图片与标题的间隔  默认20rpx
            --title-min-width 标题的最小宽度
            --title-max-width  标题的最大宽度
            --line-width   图片的宽度
            --line-height  图片的高度
        }
     </style>
     */
    export default {
        name: 'lineTitle',
    }
</script>

<style scoped>
    .lineTitle-box{
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        --line-bg-lf: var(--line-bg); /*用于左右图片一样*/ 
        --line-bg-rg: var(--line-bg); /*用于左右图片一样*/
        --line-space: 20rpx;
  

    }
    .title-main{
        min-width: var(--title-min-width,unset);
        max-width: var(--title-max-width,unset);
        position: relative;
        text-align: center;
    }
    .title-main::before,.title-main::after{
        content: "";
        position: absolute;
        width: var(--line-width,0);
        height: var(--line-height,0);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        top: 50%;
        margin-top: calc(var(--line-height,0) / -2 );
    }
    .title-main::before{
        background-image: var(--line-bg-lf);
        transform: translateX(-100%);
        left: 0;
        margin-left: calc(var(--line-space) * -1);
    }
    .title-main::after{
        background-image: var(--line-bg-rg);
        transform: translateX(100%);
        right: 0;
        margin-right: calc(var(--line-space) * -1);
    }
</style>
