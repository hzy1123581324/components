<template>
    <view class="navbar-box clear" :style="`--navbar-fixed:${!isFixed?'relative':'fixed'};--status-height:${statusheight}px;`">
        <view class="navbar-fixed-box clear" :class="{'navbar-border': border}">
            <view :class="['navbar-left',isBack&&'hasback']" @tap="goBack">
                <slot name="left">
                    <u-icon :name="backIconName" :color="backIconColor" :size="backIconSize"></u-icon>
                    <text class="backTxt">{{backTxt}}</text>
                </slot>
            </view>
            <view class="navbar-center" v-if="showTitle">
                <slot></slot>
            </view>
            <view class="navbar-right">
                <slot name="right"></slot>
            </view>
            <view class="navbar-full">
                <slot name="full"></slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * navbar 自定义导航栏
     * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。
     * @tutorial https://www.uviewui.com/components/navbar.html
     * @property {String} back-icon-color 左边返回图标的颜色（默认#606266）
     * @property {String} back-icon-name 左边返回图标的名称，只能为uView自带的图标（默认arrow-left）
     * @property {String Number} back-icon-size 左边返回图标的大小，单位rpx（默认30）
     * @property {String} back-text 返回图标右边的辅助提示文字
     * @property {String} title-color 标题的颜色（默认#606266）
     * @property {String Number} title-size 导航栏标题字体大小，单位rpx（默认32）
     * @property {Function} custom-back 自定义返回逻辑方法
     * @property {Boolean} is-back 是否显示导航栏左边返回图标和辅助文字（默认true）
     * @property {Boolean} is-fixed 导航栏是否固定在顶部（默认true）
     * @example <z-navbar class="navbar" back-text="返回" title="这是个标题"></z-navbar>
     * <style>
     * 
     * .navbar{
       --navbar-color: 导航栏默认字体颜色 #333
       --navbar-height: 导航栏高度， 默认98upx
       --navbar-fixed: 是否固定在顶部 
       --fixed-bg-color： 导航栏背景色
       --fixed-bg-img:  导航栏图片
       --navbar-title-font: 导航栏标题字体大小 默认34upx
       --navbar-title-weight： 导航栏标题之重 默认500
       --navbar-rg-font: 导航栏右边字体大小  默认32upx
       --navbar-lf-font: 导航栏左边字体大小  默认32upx
       --navbar-center-width: 导航标题宽度
       
     }
     * 
    
     </style>
     */

    export default {
        name: 'z-navbar',
        props: {
            isFixed: {
                type: Boolean,
                default: true
            },
            isBack: {
                type: Boolean,
                default: true
            },
            backTxt: {
                type: String,
                default: '返回'
            },
            // 返回箭头的颜色
            backIconColor: {
                type: String,
                default: '#606266'
            },
            // 左边返回的图标
            backIconName: {
                type: String,
                default: 'arrow-left'
            },
            // 左边返回图标的大小，rpx
            backIconSize: {
                type: [String, Number],
                default: '34'
            },
            // 自定义返回逻辑
            customBack: {
                type: Function,
                default: null
            },
            showTitle: {
                type: Boolean,
                default: true
            },
            border: {
            	type: [String, Boolean],
            	default: true
            }
        },
        data() {
            return {
                statusheight: 0
            }
        },
        computed: {
            // navbarStyle() {
            //     let style = '';
            //     let {
            //         isFixed
            //     } = this;
            //     if (!isFixed) {
            //         style += '--navbar-fixed: relative';
            //     }

            //     return style
            // }
        },
        mounted() {
            uni.getSystemInfo({
                success: (res)=> {
                    // 有些手机没有设置--status-bar-height
                    this.statusheight = res.statusBarHeight;
                }
            });
    
        },
        methods: {
            goBack() {
                // 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
                if (typeof this.customBack === 'function') {
                    this.customBack();
                } else {
                    uni.navigateBack();
                }
            }
        }
    }
</script>

<style scoped>
    .navbar-box {
        --status-height: 0;
        --height: 98upx;
        --center-width: 300upx;
        padding-top: var(--status-bar-height, var(--status-height));
        height: var(--navbar-height, var(--height));
        box-sizing: border-box;
        position: relative;
        color: var(--navbar-color, #333);
        box-sizing: content-box;
    }

    .navbar-fixed-box {
        width: 100%;
        position: var(--navbar-fixed, fixed);
        padding-top: var(--status-bar-height, var(--status-height));
        height: var(--navbar-height, var(--height));
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        /* box-shadow: 0 1upx 0 0 #f4f4f4; */
        background-color: var(--fixed-bg-color, #fff);
        background-image: var(--fixed-bg-img);

        box-sizing: content-box;

    }

    .navbar-left {

        --font: 32upx;
        width: calc((100vw - var(--navbar-center-width, var(--center-width))) / 2);
        height: 100%;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        padding-left: 0.5em;
        font-size: var(--navbar-lf-font, var(--font));
        opacity: 0;
        pointer-events: none;
        /* background-color: red; */
    }

    .navbar-left.hasback {
        opacity: 1;
        pointer-events: auto;
    }

    .backTxt {
        padding-left: 0.3em;
    }

    /* 标题中部 */
    .navbar-center {
        --font: 34upx;
        overflow: hidden;
        text-overflow: ellipsis;
        /*文本溢出显示省略号*/
        white-space: nowrap;
        /*文本不会换行（单行文本溢出）*/
        width: var(--navbar-center-width, var(--center-width));
        height: 100%;
        line-height: var(--navbar-height, var(--height));
        font-size: var(--navbar-title-font, var(--font));
        font-weight: var(--navbar-title-weight, 500);
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */

        text-align: center;
    }

    /*  */
    .navbar-right {
        --font: 28upx;
        width: calc((100vw - var(--navbar-center-width, var(--center-width))) / 2);
        height: 100%;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: flex-end;
        font-size: var(--navbar-rg-font, var(--font));
        padding-right: 1em;
    }

    .navbar-full {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .navbar-full:empty {
        opacity: 0;
        pointer-events: none;
    }
    
    .navbar-border{
      box-shadow: 0 1upx 0 0 #f4f4f4;
    }
</style>
