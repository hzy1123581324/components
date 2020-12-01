<template>
    <view :class="['button-box',plain&&'plain',shape,disable&&'disable']" style="buttonStyle" @click="buttonClick">
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
     * @property {Boolean} animation = [ture|false] 是否开启动画
     * @event {Function} change 打开关闭弹窗触发，e={show: false}
     */
    export default  {
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
            },
            type: {
                type: String,
                default: 'default',
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
        methods:{
            buttonClick(){
                switch (this.type) {
                    // 链接成功，可以放送订阅
                    case 'navigation':
                        this.jump();
                        break;
                    default:
                        break;
                }
            },
            jump(){
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
