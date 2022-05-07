<template>
    <view class="switch" :class="[modelValue == true ? 'switch-on' : '', disabled ? 'switch-disabled' : '']"
        @click="onClick">
        <view class="switch-node node-class">
            <z-loading :show="loading" class="switch-loading"></z-loading>
        </view>
    </view>
</template>

<script>
    /**
     * switch 开关选择器
     * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
     * @tutorial https://www.uviewui.com/components/switch.html
     * @property {Boolean} loading 是否处于加载中（默认false）
     * @property {Boolean} disabled 是否禁用（默认false）
     * @property {Boolean | Number | String} active-value 打开选择器时通过change事件发出的值（默认true）
     * @property {Boolean | Number | String} inactive-value 关闭选择器时通过change事件发出的值（默认false）
     * @event {Function} change 在switch打开或关闭时触发
     * @example <z-switch class='switch'  v-model="checked"></z-switch>
     * 
     * <style>
         .switch{
             --switch-size  开关尺寸，单位rpx（默认50）
             --switch-bg-active-color 打开时的背景色（默认主题色,没有主题色用 #2979ff）
             --switch-bg-inactive-color 关闭时的背景色（默认#ffffff）
             --switch-node-bg-color   组件节点的背景色 默认 白色
             --switch-display-opacity  禁用时的透明度
         }
     </style>
     */
    import {
        defer
    } from "../../utils/optimize.js";
    // import {
    //     publicProps,
    //     publicEmit
    // } from "../../composition/public.js";
    // const {
    //     before: onChangeBefore
    // } = publicProps;
    import {
        ref
    } from "vue";
    export default {
      emits:['update:modelValue','change'],
      props: {
        // 传入异步方法
        onChangeBefore: {
            type: Function,
            default: defer,
        },
        // 是否为禁用装填
        disabled: {
            type: Boolean,
            default: false
        },
        // 通过v-model双向绑定的值
        modelValue: {
            type: [Number, String, Boolean],
            default: false
        },
        // 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
        vibrateShort: {
            type: Boolean,
            default: false
        },
        // 打开选择器时的值
        activeValue: {
            type: [Number, String, Boolean],
            default: true
        },
        // 关闭选择器时的值
        inactiveValue: {
            type: [Number, String, Boolean],
            default: false
        },
      },
      setup(props){
        let loading = ref(false);
          
        
        async function onClick() {
            if (props.disabled) {
                return;
            }
            loading.value = true;
            await props.onChangeBefore();
            loading.value = false;
            // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
            if (props.vibrateShort) {
                uni.vibrateShort();
            }
            emit('update:modelValue', !props.modelValue);
            emit('change', props.modelValue ? props.activeValue : props.inactiveValue);
        }
        return {
          loading,
          onClick
        }
      }
    }
    
</script>

<style scoped>
    .switch {
        --font-size: 50rpx;
        --switch-padding: 2rpx;
        position: relative;
        display: inline-block;
        box-sizing: initial;
        
        width: 2em;
        height: 1em;
        background-color: var(--switch-bg-inactive-color, #fff);
        padding: 2rpx;
        border-radius: 1em;
        transition: background-color 0.3s;
        font-size: var(--switch-size, var(--font-size));
        box-sizing: content-box;
    }

    .switch-node {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: calc( var(--switch-padding) / 2);
        left: calc( var(--switch-padding) / 2);
        border-radius: 100%;
        z-index: 1;
        width: 1em;
        height: 1em;
        background-color: var(--switch-node-bg-color, #fff);
        box-shadow: 0 3rpx 1rpx 0 rgba(0, 0, 0, 0.05), 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1), 0 3rpx 3rpx 0 rgba(0, 0, 0, 0.05);
        transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
        transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05), -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
        transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
        transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    }

    .switch-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        --loading-size: calc(var(--switch-size, var(--font-size)) * 0.6);
        --loading-dark: var(--switch-bg-active-color, var(--color-theme, #1989fa));
    }

    .switch-on {
        background-color: var(--switch-bg-active-color, var(--color-theme, #1989fa));
        
    }

    .switch-on .switch-node {
        transform: translateX(1em);
    }

    .switch-disabled {
        opacity: var(--switch-display-opacity, 0.4);
    }
</style>
