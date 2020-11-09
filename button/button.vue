<template>
    <view :class="['button-box',plain&&'plain',shape,disable&&'disable']" style="buttonStyle">
        <slot></slot>
    </view>
</template>

<script>
    // import postpone from '../postpone/postpone.vue';
    module.exports = {
        name: 'hzyButton',
        props: {
            // 按钮形状，circle（两边为半圆），square（带圆角）
            shape: {
                type: String,
                default: 'square'
            },
            // 按钮是否镂空
            plain: {
                type: Boolean,
                default: false
            },
            color:{
                type: String,
                default: ''
            },
            disable: {
                type: Boolean,
                default: false,
            }

        },
        components: {
            // postpone  
        },
        computed: {
            buttonStyle(){
                
                return ``
            },
        },
        data: () => {
            return {
               
            }
        },
       
    }
</script>

<style scoped>
    .button-box {
        /* 很操蛋var默认值upx转不过来 */
        --btn-height: 84upx;
        --btn-bor-width: 2upx;
        --btn-bor: var(--btn-bor-width) solid var(--btn-bor-color,currentColor);
        --btn-font-size: 32upx;
        display: var(--display,block);
        line-height: calc( var(--btn-height) - 2 * var(--btn-bor-width) );
        height: var(--btn-height);
        border: var(--btn-bor);
        text-align: center;
        font-size: var(--btn-font-size);
        color:var(--btn-color,#fff);
        letter-spacing: 4upx;
        padding: 0 1em;
        --btn-radius: calc(var(--btn-height) / 2);
        border-radius: var(--btn-radius);/*默认是半圆*/
        background-color: var(--btn-bg);
        pointer-events: auto;
    }
    .square{
        --btn-radius: 8upx;
    }
    .button-box.plain{
        background-color: transparent;
        color: var(--btn-color);
        /* border: var(--btn-bor-width,2upx) solid currentColor; */
        /* border: 2upx solid currentColor; */
    }
    .button-box.disable{
        background-color: var(--btn-disable-bg);
        color: var(--btn-disable-color);
        opacity: var(--btn-disable-opacity);
        border-color: var(--btn-disable-bor-color);
        pointer-events: none;
    }
</style>
