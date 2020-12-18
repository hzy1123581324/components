<template>
    <view :class="['button-box',plain&&'plain',shape,disable&&'disable']" :style="buttonStyle" @click="buttonClick">
        <slot></slot>
    </view>
</template>

<script>
    // import postpone from '../postpone/postpone.vue';
    /**
     * PopUp 按钮组件
     * @description 适用各种场景的按钮
     * @tutorial https://ext.dcloud.net.cn/plugin?id=329
     * @property {String} type = [default|navigation] 按钮类型
     *     @value default 默认按钮，没有其他功能
     *     @value navigation 路由按钮功能跟 navigation 一样
     * @property {String} shape = [square|circle] 按钮类型
     *      @value square 默认圆角
     *      @value circle 两边为半圆
     * @property {Boolean} plain 是否镂空 默认不镂空 
     * @property {Boolean} disable 是否禁用，默认不禁用 
     * @property {Function } postpone 仿重复点击事件，传入一个方法 
     * @property {Boolean} animation = [ture|false] 是否开启动画
     * @property {String,Nubmer} stayTime  接口调用后必须等待多少时间才可点击
     * @property {String,Nubmer} outTime 超出时间，后可以点击
     * @event {Function} change 打开关闭弹窗触发，e={show: false}
     * @example <z-button class="button"></z-button>
       <style>
           .button{
              --btn-height: 按钮高度 默认 84upx
              --btn-bor-width: 边框宽度 默认2upx
              --btn-color  按钮字体颜色
              --btn-bg: 按钮背景色
              --btn-disable-bg 按钮禁用背景色
              --btn-disable-color 按钮禁用字体颜色
              --btn-disable-opacity 按钮禁用透明度
              --btn-disable-bor-color
              --btn-font-size: 字体大小 默认32upx
              --btn-font-weight: 字重 
              --btn-radius: 圆角，8upx
           }
           
       </style>
     
     */
    export default {
        name: 'z-button',
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
            // 是否禁用
            disable: {
                type: Boolean,
                default: false,
            },
            // 点击类型
            type: {
                type: String,
                default: 'default',
            },
            // 传入一个仿重复点击事件
            postpone: {
                type: Function,
                
            },
            // 接口调用后必须等待多少时间才可点击
            stayTime: {
                type: [Number, String],
                // default: 0,
            },
            // 超出时间，后可以点击
            outTime: {
                type: [Number, String],
                // default: 3000,
            },

        },
        components: {
            // postpone  
        },
        computed: {
            buttonStyle() {

                return ``
            },
        },
        data: () => {
            return {
                canclick: true,
            }
        },
        methods: {
            buttonClick() {
                if(!this.canclick){
                    return ;
                }
                if (this.postpone) {
                    return this.unrepeat(); 
                }

                switch (this.type) {
                    // 链接成功，可以放送订阅
                    case 'navigation':
                        this.jump();
                        break;
                    default:
                        // this.$emit('click',)
                        break;
                }
            },

            // 仿重复点击
            async unrepeat() {
                this.canclick = false;
                if(this.outTime){
                    setTimeout(()=>{
                        this.canclick = true;
                    },this.outTime)
                }
                await this.postpone();
                if(this.stayTime){
                    setTimeout(()=>{
                        this.canclick = true;
                    },this.stayTime)
                }else{
                    this.canclick = true;
                }
            },
            jump() {
                // if(item.state==0
                // ){
                //     return uni.showToast({
                //         title: '待开放',
                //         icon: 'none',
                //     })
                // }

                // if(item.path=="#"||!item.path){
                //     return uni.showToast({
                //         title: '没有定义路由',
                //         icon: 'none',
                //     })
                // }else{
                //     let openType = (!item.openType)?'navigateTo':item.openType==1?'reLaunch':'redirectTo'

                //     uni[openType]({
                //         url: item.path
                //     })
                // }

            },
        }

    }
</script>

<style scoped>
    .button-box {
        /* 很操蛋var默认值upx转不过来 */
        --btn-height: 84upx;
        --bor-width: 2upx;
        --btn-bor: var(--btn-bor-width,var(--bor-width)) solid var(--btn-bor-color, currentColor);
        --font-size: 32upx;
        --radius: calc(var(--btn-height) / 2);
        display: var(--display, block);
        line-height: calc(var(--btn-height) - 2 * var(--btn-bor-width,var(--bor-width)));
        height: var(--btn-height);
        border: var(--btn-bor);
        text-align: center;
        font-weight: var(--btn-font-weight,500);
        font-size: var(--btn-font-size,var(--font-size));
        color: var(--btn-color, #fff);
        letter-spacing: 4upx;
        padding: 0 1em;
        border-radius: var(--btn-radius,var(--radius));
        /*默认是半圆*/
        background-color: var(--btn-bg);
        pointer-events: auto;
        box-sizing: var(--btn-box-sizing,border-box);
    }

    .square {
        --radius: 8upx;
        border-radius: var(--btn-radius,var(--radius));
    }

    .button-box.plain {
        background-color: transparent;
        color: var(--btn-color);
        /* border: var(--btn-bor-width,2upx) solid currentColor; */
        /* border: 2upx solid currentColor; */
    }

    .button-box.disable {
        background-color: var(--btn-disable-bg,var(--btn-bg));
        color: var(--btn-disable-color,var(--btn-color,#fff));
        opacity: var(--btn-disable-opacity,1);
        border-color: var(--btn-disable-bor-color);
        pointer-events: none;
    }
</style>
