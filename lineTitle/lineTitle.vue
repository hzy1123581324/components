<template>
    <view class="lineTitle-box">
       <view class="title-main">
           <slot></slot>
       </view>
    </view>
</template>

<script>
    /**
     * lineTitle 标题
     * @description  标题左右是图片
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {Array} list  传入数组
     * @property {Boolean} direction 是否横向滚动 
     * @property {String,Number} row  一版排列行数
     * @property {String,Number} column  一版排列的列数
     * @property {Sting,Number} iconSize 图标尺寸默认88
     * @example <lineTitle></lineTitle>
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
        --line-space: 20upx;
        

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
