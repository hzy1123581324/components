<template>
    <view class="link-list-box clear">
        <view class="link-items" v-for="item in list" :key="item.id">
            <!-- button特殊功能例如小程序打开客服聊天框 -->
            <!-- <button type="default"></button> -->
            <view class="link-items-lf">
                <slot name="link-lf" :item="item">
                    <image class="left-icon" :src="item[linkImg]" mode=""></image>
                    <text class="left-txt">{{item[linkName]}}</text>
                </slot>
            </view>
            <view class="link-items-rg">
                <slot name="link-rg" :item="item">
                    <text class="right-txt">{{item[linkRgTxt]}}</text>
                    <z-icon-shadow class="toright"></z-icon-shadow>
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * z-link-list 链接列表
     * @description 该组件一般用于个人中心功能列表跳转。
     * @tutorial https://www.uviewui.com/components/countDown.html
     * @property {Boolean} show-seconds 是否显示倒计时的"秒"部分（默认true）
     * @event {Function} end 倒计时结束
     * @event {Function} change 每秒触发一次，回调为当前剩余的倒计秒数
     * @example <z-link-list :list="list" ></z-link-list>
     * <style>
        .link-list{
            --link-height: 每一列的高度    默认98rpx
            --link-bg-color: 每一列的背景色
            --link-bor-btm:  每一列都有的边框
            --link-lf-width: 组件左边宽度 默认60%
            --link-rg-width: 组件右边宽度 默认40%
            --link-mar-btm:   每一列之间的间距  默认是0px
            --link-pad-lf:  组件的左内边距     默认30rpx
            --link-lf-icon-size:  左边图标大小
            --link-lf-font-size:  左边文本字体大小 默认 inherit继承父元素
            --link-lf-color:  左边文本字体颜色 默认 inherit继承父元素
            --link-lf-weight:  左边文本字体字重 默认 500
            --link-lf-icon-space: 左边图标与文本的距离  
            --link-rg-font-size:  右边文本字体大小 默认 inherit继承父元素
            --link-rg-color:  右边文本字体颜色 默认 inherit继承父元素
            --link-rg-weight:  右边文本字体字重 默认 400
            --link-pad-rg:  组件的右内边距    默认30rpx
            --link-rg-icon-space: 右边图标与文本的距离
            --link-rg-icon : 右边图标
            --link-rg-icon-color: 右边图标颜色 ，默认#333
            --link-rg-icon-size: 右边图标大小 ，默认32rpx
         }
         //使用>>>穿透设置边框
         .link-list>>> .link-items{
             box-shadow: unset; 
         }
         .link-list>>> .link-items+.link-items{
             box-shadow: 0 -1rpx 0 0 red ;
         }
     </style>
     */
    export default {
        name: "z-link-list",
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            },
            linkImg: {
                type: String,
                default: 'icon'
            },
            linkName: {
                type: String,
                default: 'name',
            },
            linkPath: {
                type: String,
                default: 'path',
            },
            linkRgImg: {
                type: String,
                default: ""
            },
            linkRgTxt: {
                type: String,
                default: 'rgTxt'
            }

        },
        data() {
            return {}
        },
        methods: {

        }
    }
</script>

<style scoped>
    .link-list-box {}

    .link-items {
        --height: 98rpx;
        display: flex;
        background-color: var(--link-bg-color);
        justify-content: space-between;
        height: var(--link-height, var(--height));
        box-sizing: border-box;
        box-shadow: var(--link-bor-btm);
        margin-bottom: var(--link-mar-btm, 0);
    }

    .link-items+.link-items {
        /* box-shadow: var(--link-bor-btm,unset); */
    }

    .link-items-lf {
        --pad-lf: 30rpx;
        width: var(--link-lf-width,60%);
        height: 100%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        align-content: center;
        padding-left: var(--link-pad-lf, var(--pad-lf));
        padding-right: 1em;
    }

    .left-icon {
        --size: 48rpx;
        width: var(--link-lf-icon-size, var(--size));
        height: var(--link-lf-icon-size, var(--size));
        margin-right: var(--link-lf-icon-space,1em);
    }
    .left-txt{
        color: var(--link-lf-color,inherit);
        font-size: var(--link-lf-font-size,inherit);
        font-weight: var(--link-lf-weight,500);
    }
    .link-items-rg {
        --pad-rg: 30rpx;
        width: var(--link-rg-width,40%);
        height: 100%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: flex-end;
        padding-right: var(--link-pad-rg, var(--pad-rg));
    }
    .right-txt{
        flex-grow: 1;
        text-align: right;
        width: 50%;
        
        overflow: hidden;
        text-overflow:ellipsis;/*文本溢出显示省略号*/
        white-space:nowrap;/*文本不会换行（单行文本溢出）*/
        color: var(--link-rg-color,inherit);
        font-size: var(--link-rg-font-size,inherit);
        font-weight: var(--link-rg-weight,400);
        margin-right: var(--link-rg-icon-space,1em);
    }
    .toright {
        flex-shrink: 0;
        --size: 32rpx;
        --right: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC7klEQVR4Xt3aPYvUQBjA8efJFtuIhTZWVwjqFxA9318QUbzjOFG/wGYnIZAvYKWF2Apb7cBhYeehHCqKiO/v2NmpvVYKYhXIziODc+UdmUky84xbT3bv/9t5ciFZhJYvIcQVAFggojlE/AIAt6SUsuXbejscXT+pKIotdV3/2eD4VSnlJdf39nmcM4AQ4hoAXN7kj40CwQlgNBptGwwGPxt8U+wRnACEEPsB4EMDAL2ENYITQJZlu4joa0MA1ghOAGVZDquq0gBzsSM4AejoNE2PJ0ny3AKA5U5wBtA1WZYdJaKXMSO0AtDhQojDAPA6VoTWAGYnHCCidzEidAKgw/M836eU+hgbQmcAZifsJaJPMSF0ChAjQucAsY1DLwDmOmE+SZL33MehNwAdPh6PDyLiW84IvQKYcTiklHrDFaF3ADMOR5IkecURwQuAGYdjiPiCG4I3AHPZfAIAnnFC8ApgzgknlVJPuSB4BzDjcAoRn3BACAJgxuE0ADwOjRAMwFw2nyGiRyERggKYcTiLiA9DIQQHMONwDgAehEBgAWDGYZGI7vlGYANgEJaIaM0nAisAc05YRsS7lghXpZT6Ia31ix2A2QnnieiOTc1sNtu+srLyy+YYvZYlgEG4QESrFkHzUkrbe5J8AYQQFwHgdlMARNw9nU6/NV2/vo7lDrCNB4Dvw+Fw52QyqaIHcIjXzf/HSdAxvtXjdzYjECKezX+BUPEsAELGBwcIHR8UgEN8MAAu8UEAOMV7B+AW7xWAY7w3AK7xXgA4x/cOwD2+V4AY4nsDiCW+F4CY4jsHiC2+U4AY4zsDiDW+E4CY41sDxB7fCiDP8wWl1H3L29CtbmBaflaj5c43RYUQ+knuYqNP+beIXbzzDiiKYkdd1z9ij3cGSNPU5nfALL/59S/PaQTKstxaVdXvBjuAdbzzDtAHZlm2RkRLmyCwj28FoA8WQtAGAFHEtwYwCNcBYBkA9hDRZ0S8KaW80WA8WCz5C3IYiFAvYhCTAAAAAElFTkSuQmCC');
        --icon-shadow-bg-img: var(--link-rg-icon, var(--right));
        --icon-shadow-color: var(--link-rg-icon-color, #333);

        --icon-shadow-size: var(--link-rg-icon-size, var(--size));
    }
</style>
