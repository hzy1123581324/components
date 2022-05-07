<template>
    <view class="font-bg" :style="commontstyle " >
        <slot></slot>
    </view>
</template>

<script>
    /**
     * font-bg 字体背景同色
     * @description 字体背景同色，只是背景色的透明度不一样
     * @tutorial https://ext.dcloud.net.cn/plugin?id=329
     * @property {Number} opacity 透明度
     * @example <z-font-bg ref="popup"></z-font-bg>
     * <style>
        .popup{
            --popup-index: 定义popup组件的层级
        }
     *</style>
     */
    import {computed} from 'vue';
    export default {
      props: {
        opacity: {
            type: [Number,String],
            default: 0,
        }
      },
      setup(props,){
        const commontstyle = computed(()=>{
          if(props.opacity){
            return `--font-bg-opacity:${props.opacity};`
          }else{
            return '';
          }
        })
        return {
          commontstyle
        }
      }
    }

     
</script>

<style scoped>
    .font-bg{
        position: relative;
    }
    .font-bg::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: currentColor;
        /* z-index:-1; */
        opacity: var(--font-bg-opacity,0);
        border-radius: inherit;
    }
    
</style>
