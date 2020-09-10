<template>
    <view class="text-gradient-main">
        {{txt}}
        <view class="text-gradient">
            {{txt}}
        </view>
    </view> 
</template>

<script>
    /**
     * textGradient 文字渐变
     * @description 通过css 实现文字渐变 ，支持ios 
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String} txt  显示的文本
     * @example  <textGradient :txt="txt" ></textGradient>
     */
    export default {
        name: 'textGradient',
        props:{
            
            txt:{
                type: String,
                default: '',
            },
        },
        watch:{},
        data() {
            return {};
        },
        methods:{}
    }
</script>

<style>
     /* 文字渐变 */
    .text-gradient-main {  
        --font-size: 20upx;
        --color: red;
        --gradient: -webkit-gradient(linear, 0 0, 0 bottom, from(#FBEE00), to(rgba(251,246,147,.6)));
        display: inline-block;
        font-family: '微软雅黑';
        font-size: var(--font-size);
        position: relative; 
        color: var(--color);
    }  
      
    .text-gradient {  
        /* content: attr(data-text);  */
        color: var(--color);  
        position: absolute;  
        left: 0; 
        top: 0;
        z-index: 2;
        mask-image: var(--gradient);
        -webkit-mask-image: var(--gradient);
    }
</style>
