<template>
    <scroll-view id="scroll-box" ref="scrollBox" class="scroll-box" scroll-x="true" :scroll-left="scrollLeft"
        scroll-with-animation="true" :style="scrollStyle">
        <view class="scroll-list-box">
            <view :class="['tabs-items',type]" ref="tabsItems">
                <view :id="'tabs_'+index" :class="['tabs-item',activeIndex==index&&'active']" v-for="(item,index) in list"
                    :key="item.id" @click="activeIndex = index">
                    {{item[keyname]}}
                </view>
            </view>
            <view class="tabs-progress"></view>
        </view>
    </scroll-view>
</template>

<script>
    /**
     * noticeBar 滚动标签
     * @description 该组件用于横向滚动标签(该组件还未实现超出宽度自动居中等效果)
     * @tutorial https://www.uviewui.com/components/noticeBar.html
     * @property {Array} list 滚动内容，数组形式，见上方说明
     * @property {String} keyname = ['name']  对象数组要显示的键名
     * @property {String NUmber} index 初始激活下标index，父元素通过watch index来处理需求progressWidth
     * @property {String} type = ['left']  标签的排列方式
     * @property {String NUmber} progressWidth 下划线宽度，默认不传是选中标签的宽度
     * @event {Function} selItem 点击标签，将下标赋值给activeIndex
     * @example <tabs :more-icon="true" :list="list"></tabs>
     * @example <tabs :index.sync="index" :list="list"></tabs>
     * @example <tabs class="tabs" :index.sync="index" :list="list"></tabs>
     * <style>
         .tabs{
            --tab-height： 组件高度
            --tab-min-width: 标签最小宽度
            --tab-max-width: 标签最大宽度
            --tab-item-weight 标签未激活后字体粗细  默认400
            --tabs-progress-color: 下划线样式  默认 #EA4D5E
            --tabs-progress-width: 下划线宽度  不设等于激活标签宽度
            --tabs-progress-height: 下划线高度
            --tab-item-font  标签未激活字体大小  默认28upx
            --tab-item-color 标签未激活颜色  默认#86909B
            --tab-space  标签左右内边距  默认0.5em
            --tab-mar-space 标签之间的间隔
            --tab-item-active-weight 标签激活后字体粗细
            --tab-item-active-font 标签激活后的字体大小  默认28upx
            --tab-item-active-color： 标签激活后的颜色  #111
         }
     </style>
     */
    export default {
        name: 'tabs',
        props: {
            list: {
                required: true,
                type: Array,
                default: () => {
                    return [];
                }
            },
            keyname: {

                type: String,
                default: 'name'
            },
            type: {
                type: String,
                default: 'left'
            },
            index: {
                required: true,
                type: [String, Number],
                default: 0,
            },
            progressWidth: {
                type: [String, Number],
            }

        },
        data: () => {
            return {
                activeIndex: 0,
                progressLeft: 0,
                itemWidth: 0,
                transitionProgress: false,
                scrollLeft: 0,
            }
        },

        mounted() {

            if (this.list.length > 0) {
                this.check();
            }
        },
        watch: {
            index(newval) {

                this.transitionProgress = true;
                if (this.list.length > 0) {
                    // console.log(newval,'------------------------------------------------------------------------------');
                    this.check();
                }
            },
            activeIndex(newval) {
                this.$emit('update:index', newval);

            },
            list(newval) {
                // console.log('重新复制', newval)
                if (newval.length > 0) {
                    // console.log(newval,'++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    setTimeout(this.check, 100)
                }
            }

        },
        computed: {
            scrollStyle() {
                let {
                    progressWidth,
                    progressLeft,
                    itemWidth,
                    transitionProgress
                } = this;
                let styleTxt = '';

                styleTxt += `--tabs-progress-width:${progressWidth?uni.upx2px(progressWidth):itemWidth}px;`;

                if (progressLeft || progressLeft == 0) {
                    styleTxt += '--scoll-left:' + progressLeft + 'px;'
                }
                if (transitionProgress) {
                    styleTxt += '--transition-progress: all ease-in-out 0.3s 0s;'

                }
                return styleTxt;
            }
        },
        methods: {
            check() {
                this.activeIndex = this.index;

                uni.createSelectorQuery().in(this).select("#scroll-box").fields({
                    size: true,
                    rect: true,
                    scrollOffset: true
                }, data => {
                    let scrollRectLeft = data.left;
                    let scrollWidth = data.width;
                    let scrollLeft = data.scrollLeft
                    // console.log("得到节点信息scorll:" + JSON.stringify(data));
                    // console.log("节点的宽为scorll:" + data.width);


                    uni.createSelectorQuery().in(this).select('#tabs_' + this.activeIndex).fields({
                        size: true,
                        rect: true,
                        // scrollOffset: true,
                    }, data => {
                        // console.log(this.activeIndex, "得到布局位置信息" + JSON.stringify(data));
                        // console.log("节点离页面顶部的距离为" + data.top);
                        if (data) {
                            // console.log(scrollWidth,data.width,'9999')
                            let halfWidth = (scrollWidth - (this.progressWidth || data.width)) / 2;
                            // console.log(halfWidth, data.left, '半个')
                            this.itemWidth = data.width;

                            if (this.progressWidth) {
                                this.progressLeft = data.left + (data.width - uni.upx2px(this.progressWidth ||
                                    0)) / 2 - scrollRectLeft + scrollLeft;
                                this.scrollLeft = this.progressLeft - halfWidth - (data.width - uni.upx2px(
                                    this.progressWidth || 0)) / 2;
                            } else {
                                this.progressLeft = data.left - scrollRectLeft + scrollLeft;
                                this.scrollLeft = this.progressLeft - halfWidth;

                            }

                        }
                    }).exec();

                }).exec();



            }
        }
    }
</script>

<style scoped>
    .scroll-box {
        --tab-h: 80upx;
        height: var(--tab-height, var(--tab-h));
        position: relative;
    }
    .scroll-list-box,
    .tabs-items {
        height: 100%;
        min-height: 100%;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
    }

    .tabs-items.center {
        justify-content: center;
        justify-items: center;
    }

    .tabs-items {
        flex-shrink: 0;
        min-width: 100%;
        line-height: var(--tab-height, var(--tab-h));
    }

    .tabs-item {
        --tab-font: 28upx;
        --min-w: 74upx;
        flex-shrink: 0;
        max-width: calc(--tab-max-width, unset);
        width: auto;
        min-width: var(--tab-min-width, var(--min-w));
        font-weight: normal;
        font-size: var(--tab-item-font, var(--tab-font));
        color: var(--tab-item-color, #86909B);
        text-align: center;
        font-weight: var(--tab-item-weight, 400);
        padding: 0 var(--tab-space, 0.5em);
        transition: color ease-in-out 0.3s 0s;

    }

    .tabs-item.active {
        font-weight: var(--tab-item-active-weight, 400);
        font-size: var(--tab-item-active-font, var(--tab-item-font, var(--tab-font)));
        color: var(--tab-item-active-color, #111);
    }

    .tabs-item+.tabs-item {
        margin-left: var(--tab-mar-space, 1em);
    }


    .tabs-progress {
        --height: 4upx;

        position: absolute;
        bottom: 0;
        left: var(--scoll-left, -100%);
        /*-100% 初始隐藏*/
        width: var(--tabs-progress-width);
        height: var(--tabs-progress-height, var(--height));
        background-color: var(--tabs-progress-color, #EA4D5E);
        transition: var(--transition-progress, none);
    }
</style>
