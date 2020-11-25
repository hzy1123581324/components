<template>
    <view class="read-more-box" :style="globalStyle">
        <view class="content-box" :style="contentStyle">
            <view class="content">
                <slot></slot>
            </view>
        </view>
        <view @tap="toggleReadMore" class="showmore-wrap" v-show="showSwitch">
            <!-- 状态：展开 -->
            <view class="" v-show="!showAll">
                <slot name='read-all'>
                    <view class="read-button">
                        <text>{{openText || i18n.fw_337}}</text>
                        <text class="drop"></text>
                    </view>
                </slot>
            </view>
            <!-- 状态：收起 -->
            <view class="" v-show="showAll&&toggle">
                <slot name='read-less'>
                    <view class="read-button">
                        <text>{{closeText || i18n.fw_336}}</text>
                        <text class="drop active"></text>
                    </view>
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * readMore 阅读更多
     * @description 该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。
     * @tutorial https://www.uviewui.com/components/readMore.html
     * @property {String Number} show-height 内容超出此高度才会显示展开全文按钮，单位rpx（默认400）
     * @property {Boolean} toggle 展开后是否显示收起按钮（默认false）
     * @property {String} close-text 关闭时的提示文字
     * @property {String} open-text 展开时的提示文字
     * @property {Boolean} load 异步加载状态
     * @property {String} color 提示文字的颜色（默认#2979ff）
     * @example <read-more></read-more>
     */
    export default {
        name: "read-more",
        props: {
            // 默认的显示占位高度，单位为upx
            showHeight: {
                type: [Number, String],
                default: 400
            },
            // 展开后是否显示"收起"按钮
            toggle: {
                type: Boolean,
                default: true
            },
            // 关闭时的提示文字
            closeText: {
                type: String,
                default: ''
            },
            // 展开时的提示文字
            openText: {
                type: String,
                default: ''
            },
            // 提示的文字颜色
            color: {
                type: String,
                default: ''
            },
            // 异步加载完时为true
            load: {
                type: Boolean,
                default: false,
            },
            //  是否展开全部
            showall: {
                type: Boolean,
                default: false,
            }

        },
        watch: {
            load(newval) {
                // console.log(newval);
                this.init();
            },
            showall(newval) {
                this.showAll = newval;
            }
        },
        computed: {

            // 展开后无需阴影，收起时才需要阴影样式
            innerShadowStyle() {
                if (this.showMore) return {};
                else return this.shadowStyle
            },
            contentStyle() {
                let {
                    ActualHeight
                } = this;
                return `height: ${ActualHeight}px;`
            },
            globalStyle() {
                let {
                    color,
                } = this;
                let colorStyle = color || '';
                return `${colorStyle}`
            }
        },
        data() {
            return {
                ActualHeight: 0,
                showSwitch: false,
                showAll: false,
                eventHeight: 0,
            };
        },
        mounted() {
            this.init();
            this.showAll = this.showall;
        },
        methods: {
            init() {

                let view = uni.createSelectorQuery().in(this).select('.content');
                view.boundingClientRect(data => {
                    // console.log("得到布局位置信息" + JSON.stringify(data));
                    let limitHeight = uni.upx2px(this.showHeight);
                    this.eventHeight = data.height;
                    // 如果全部文本高度小于限制高度，拿文本高度
                    if (data.height - limitHeight <= 0) {
                        this.ActualHeight = data.height;
                        this.showSwitch = false;
                        // 文本高度大于限制高度，拿限制高度
                    } else {
                        this.ActualHeight = limitHeight;
                        this.showSwitch = true;
                    }

                }).exec();
            },
            // 展开或者收起
            toggleReadMore() {
                this.showAll = !this.showAll;
                if (this.showAll) {
                    this.ActualHeight = this.eventHeight;
                } else {
                    this.ActualHeight = uni.upx2px(this.showHeight);
                }
            }
        }
    };
</script>

<style scoped>
    .read-more-box {
        --color: #2979ff;
    }

    .content-box {
        height: 0;
        overflow: hidden;
        transition: height ease-in-out 0.3s 0s;
    }

    /* 点击展开，点击收起 */
    .read-button {
        /* width: 120rpx; */
        margin: 0 auto;
        color: var(--color);
        text-align: var(--algin,center);
        font-size: 24upx;
        line-height: 33upx;
        margin-top: 20upx;
    }

    .drop {
        display: inline-block;
        width: 16upx;
        height: 18upx;
        border-bottom: 9upx solid transparent;
        border-top: 9upx solid transparent;
        border-left: 8upx solid transparent;
        border-right: 8upx solid transparent;
        border-top-color: var(--color);
        border-bottom-color: transparent;
        margin-top: 8upx;
        margin-left: 10upx;
        vertical-align: middle;

    }

    .drop.active {
        border-bottom-color: var(--color);
        border-top-color: transparent;
        margin-top: -12upx;
    }
</style>
