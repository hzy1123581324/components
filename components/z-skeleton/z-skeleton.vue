<template>
    <view class='skeleton-box' v-if="loading" :style="skeletonStyle"
        @touchmove.stop.prevent>
        <!-- 矩形 -->
        <view v-for="(item, index) in RectNodes" :key="guid()" :class="['skeleton-item',animation ? 'skeleton-fade' : '']" :style="skeletonItemStyle(item,1)"></view>
        <!-- 圆 -->
        <view v-for="(item, index) in circleNodes" :key="guid()" :class="['skeleton-item',animation ? 'skeleton-fade' : '']" :style="skeletonItemStyle(item,2)"></view>
        <!-- 圆角矩形 -->
        <view v-for="item in filletNodes" :key="guid()" :class="['skeleton-item',animation ? 'skeleton-fade' : '']" :style="skeletonItemStyle(item,3)"></view>
    </view>
</template>

<script>
    /**
     * skeleton 骨架屏
     * @description 骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。
     * @tutorial https://www.uviewui.com/components/skeleton.html
     * @property {String} el-color 骨架块状元素的背景颜色（默认#e5e5e5）
     * @property {String} bg-color 骨架组件背景颜色（默认#ffffff）
     * @property {Boolean} animation 骨架块是否显示动画效果（默认false）
     * @property {String Number} border-radius u-skeleton-fillet类名元素，对应的骨架块的圆角大小，单位rpx（默认10）
     * @property {Boolean} loading 是否显示骨架组件，请求完成后，将此值设置为false（默认true）
     * @example <u-skeleton :loading="true" :animation="true"></u-skeleton>
     */
    import guid from '../utils/guid.js';
    export default {
        name: "skeleton",
        props: {
            // 需要渲染的元素背景颜色，十六进制或者rgb等都可以
            elColor: {
                type: String,
                default: ''
            },
            // 整个骨架屏页面的背景颜色
            bgColor: {
                type: String,
                default: ''
            },
            // 是否显示加载动画
            animation: {
                type: Boolean,
                default: false
            },
            // 圆角值，只对类名为u-skeleton-fillet的元素生效，为数值，不带单位
            borderRadius: {
                type: [String, Number],
                default: ''
            },
            // 是否显示骨架，true-显示，false-隐藏
            loading: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                windowWinth: 750, // 骨架屏宽度
                windowHeight: 1500, // 骨架屏高度
                filletNodes: [], // 圆角元素
                circleNodes: [], // 圆形元素
                RectNodes: [], // 矩形元素
                top: 0,
                left: 0,
                guid: guid,
            }
        },
        methods: {
            // 查询各节点的信息
            selecterQueryInfo() {
                // 获取整个父组件容器的高度，当做骨架屏的高度
                uni.createSelectorQuery().selectAll('.skeleton').boundingClientRect().exec((res) => {
                    this.windowHeight = res[0][0].height;
                    this.windowWinth = res[0][0].width;
                    this.top = res[0][0].bottom - res[0][0].height;
                    this.left = res[0][0].left;
                });
                // 矩形骨架元素
                this.getRectEls();
                // 圆形骨架元素
                this.getCircleEls();
                // 圆角骨架元素
                this.getFilletEls();
            },
            // 矩形元素列表
            getRectEls() {
                uni.createSelectorQuery().selectAll('.skeleton-rect').boundingClientRect().exec((res) => {
                    this.RectNodes = res[0];
                });
            },
            // 圆角元素列表
            getFilletEls() {
                uni.createSelectorQuery().selectAll('.skeleton-fillet').boundingClientRect().exec((res) => {
                    this.filletNodes = res[0];
                });
            },
            // 圆形元素列表
            getCircleEls() {
                uni.createSelectorQuery().selectAll('.skeleton-circle').boundingClientRect().exec((res) => {
                    this.circleNodes = res[0];
                });
            }
        },
        // 组件被挂载
        mounted() {
            // 获取系统信息
            let systemInfo = uni.getSystemInfoSync();
            this.windowHeight = systemInfo.windowHeight;
            this.windowWinth = systemInfo.windowWidth;
            this.selecterQueryInfo();
        },
        computed: {
            skeletonStyle() {
                let {
                    windowWinth,
                    windowHeight,
                    bgColor,
                    left,
                    top,
                } = this;
                return `
                    --width: ${windowWinth}px;
                    --height: ${windowHeight}px;
                    --bgColor: ${bgColor};
                    --left: ${left}px;
                    --top: ${top}px;
                    
                `;
            },
            skeletonItemStyle(){
                return (item,type)=>{
                    let {width,height} = item;
                    let {top,left,borderRadius,elColor} = this;
                    // type 2 圆 1 矩形 3 圆角矩形
                    let radius = type==2?width/2:type==3?uni.upx2px(borderRadius||10):type==1?0:'';
                    
                    return `
                        --item-width: ${width}px;
                        --item-height: ${height}px;
                        --item-bg: ${elColor};
                        --radius: ${radius}px;
                        --item-left: ${item.left - left}px;
                        --item-top: ${item.top - top}px;
                    `;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .skeleton-fade {
        width: 100%;
        height: 100%;
        background: rgb(194, 207, 214);
        animation-duration: 1.5s;
        animation-name: blink;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0.4;
        }

        100% {
            opacity: 1;
        }
    }

    .skeleton-box {
        width: var(--width, auto);
        height: var(--height, auto);
        background-color: var(--bgColor, #fff);
        position: absolute;
        left: var(--left, 0);
        top: var(--top, 0);
        z-index: 9998;
        overflow: hidden;
    }
    .skeleton-item{
        width: var(--item-width,0);
        height: var(--item-height,0); 
        background-color: var(--item-bg, #e5e5e5); 
        border-radius: var(--radius,0); 
        position: absolute;
        // left: (item.left - left) + 'px',
        // top: (item.top - top) + 'px'
        left: var(--item-left,0);
        top: var(--item-top,0)
    }
</style>
