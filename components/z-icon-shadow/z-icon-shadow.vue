<!-- 
这是利用 filter实现改变图标颜色的组件，不支持渐变
 -->
<template>
    <view class="icon-shadow">
        <view class="iconshadowbg"></view>
    </view>
</template>

<script>
    /**
     * z-icon-shadow 
     * @description 图标变色，带透明度的图标
     * @tutorial https://ext.dcloud.net.cn/plugin?id=985
     * @example <z-icon-shadow class="icon-shadow"></z-icon-shadow>
     * 
     * <style>
        .icon-shadow{
            --icon-shadow-bg-img  要改变颜色的图标
            --icon-shadow-color  图标颜色。默认主题色
            --icon-shadow-size  图标大小默认36upx
        } 
        
     </style>
     */
    export default {
        name: "icon-shadow",

        data() {
            return {};
        },
        mounted() {},
        methods: {},
        watch: {},
        computed: {}
    };
</script>
<style scoped>
    .icon-shadow {
        position: relative;
        overflow: hidden;
        display: inline-block;
        --size: 36upx;
    }

    .iconshadowbg {
        width: 100%;
        height: 100%;
        /* position: absolute; */
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;

        box-sizing: content-box;
        background-image: var(--icon-shadow-bg-img);
        -webkit-filter: drop-shadow(var(--icon-shadow-color,var(--theme) var(--icon-shadow-size,var(--size) 0);
        filter: drop-shadow(var(--icon-shadow-color,var(--theme)) var(--icon-shadow-size,var(--size) 0);
        border-right: var(--icon-shadow-size,var(--size) solid transparent;
        display: inline-block;
        margin-left: calc(var(--icon-shadow-size,var(--size)) / -1);
    }
</style>
