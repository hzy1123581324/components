<template>
    <view class="panel-box">
        <view class="panel-head">
            <slot name="panel-head"><text class="panel-title">{{title}}</text></slot>
        </view>
        <view class="panel-body">
            <slot></slot>
        </view>
        <view class="panel-foot">
            <slot name="panel-foot"></slot>
        </view>
    </view>
</template>

<script>
    /**
     * input 面板
     * @description 此组件为一个面板,分为panel-head, panel-body,panel-foot 三部分
     * @tutorial http://uviewui.com/components/input.html
     * @property {String} title 标题
     * @example <z-panel class="panel"></z-panel>
     * @example <z-panel class="panel" title="这是个标题"></z-panel>
     * <style>
         .panel{
             --panel-radius  组件圆角 默认是0
             --panel-top-radius 组件上圆角 继承--panel-radius
             --panel-btm-radius 组件下圆角 继承--panel-radius
             --panel-shadow  组件阴影
             --panel-bg-color  组件背景色 默认 #fff
             --panel-head-bg-color  组件头部背景色 默认 #fcfcfc
             --panel-head-font-size  组件头部字体大小 默认 26rpx
             --panel-head-weight  组件头部字体字重 默认 bold
             --panel-head-color  组件头部字体颜色 默认 #333
             --panel-head-height  组件头部高度 默认 78rpx
             --panel-head-pad: 组件头部内边距 默认 0 32rpx
         }
     </style>
     */
    export default {
        name: 'panel',
        props:{
            title: {
                type: String,
                default: '',
            }
        }
    }
</script>

<style scoped>
    .panel-box{
        --head-height: 78rpx;
        border-top-right-radius: var(--panel-top-radius,var(--panel-radius,0));
        border-top-left-radius: var(--panel-top-radius,var(--panel-radius,0));
        border-bottom-left-radius: var(--panel-btm-radius,var(--panel-radius,0));
        border-bottom-right-radius: var(--panel-btm-radius,var(--panel-radius,0));
        overflow: hidden;
        box-shadow: var(--panel-shadow,var(--shadow));
        background-color: var(--panel-bg-color,#fff);
    }
    
    .panel-head{
        --font-size: 26rpx;
        background-color: var(--panel-head-bg-color,#F3F3F3);
        height: var(--panel-head-height,var(--head-height));
        
        font-size: var(--panel-head-font-size,var(--font-size));
        font-weight: var(--panel-head-weight,bold);
        color: var(--panel-head-color,#333);
    }
    .panel-title{
        --pad: 0 32rpx;
        line-height: var(--panel-head-height,var(--head-height));
        padding: var(--panel-head-pad,var(--pad));
    }
</style>
