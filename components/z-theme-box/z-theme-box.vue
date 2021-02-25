<template>
    <view :class="['root',theme||getTheme]">
        <slot></slot>
    </view>
</template>

<script>
    // getTheme是全局属性
    
    /**
     * theme-box 风格组件 存在root 节点不需要使用该组件
     * @description 该组件用于切换风格
     * @tutorial https://www.uviewui.com/components/noticeBar.html
     * @property {String} theme 强制指定风格
     * @example <z-theme-box class="tabs" :index.sync="index" :list="list"></z-theme-box>
     * <style>
         .theme-box{
         }
     </style>
     */
    export default {
        name: 'z-theme-box',
        props: {
            // 指定风格
            theme: {
                type: String,
                default: ''
            }
        },
    }
</script>
