<template>
    <div class="tabs-box">

        <div class="tabs-items" ref="tabsItems">
            <div :ref="'tabs_'+index" :class="['tabs-item',activeIndex==index&&'active']" v-for="(item,index) in list"
                :key="item.id" @click="tabtap(index)">
                <slot :item="item" :isactive="activeIndex == index">
                    {{item[keyname]}}
                </slot>
            </div>
            <div class="tabs-progress" :style="progressStyle"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'z-tabs',
        props: {
            list: {
                required: true,
                type: Array,
                default: () => {
                    return []
                }
            },
            keyname: {
                type: String,
                default: 'name',
            },
            // 滑动条的宽度， 单位rpx
            progressWidth: {
                type: [String, Number],
            },
            index: {
                required: true,
                type: [String, Number],
                default: 0,
            },

        },
        watch: {
            index(newval) {
                this.activeIndex = newval;
            },
            activeIndex(newval) {
                this.transitionProgress = true;
                this.$nextTick(() => {
                    this.check();
                })
            },
            list() {
                this.$nextTick(() => {
                    this.check();
                })
            }
        },
        computed: {
            progressStyle() {
                let {
                    progressWidth,
                    progressLeft,
                    itemWidth,
                    transitionProgress
                } = this;
                let styleTxt = '';

                styleTxt += `--tabs-progress-width:${progressWidth?progressWidth:itemWidth}px;`;

                if (progressLeft || progressLeft == 0) {
                    styleTxt += '--scoll-left:' + progressLeft + 'px;'
                }
                // if (transitionProgress) {
                    styleTxt += '--transition-progress: all ease-in-out 0.3s 0s;'

                // }
                return styleTxt;
            },
        },
        data() {
            return {
                activeIndex: 0,
                progressLeft: 0,
                itemWidth: 0,
                transitionProgress: false,
                scrollLeft: 0,
                // scrollLeft_2: 0,
                timer: '',
                tabsScrollWidth: 0,
            }
        },
        mounted() {
            this.activeIndex = this.index;
            this.$nextTick(()=>{
                this.check();
            })
        },
        methods: {
            tabtap(index) {
                if (this.activeIndex != index) {
                    this.activeIndex = index;
                }
            },
            check() {
                console.log(this.$refs)
                // console.log(this.$refs.tabsItems.offsetHeight,'这个是tabsitems元素');
                // console.log(this.$refs.tabsItems.offsetLeft, '这个是tabsitems元素');
                // console.log(this.$refs.tabsItems.offsetWidth, '这个是tabsitems元素');
                // console.log(this.$refs.tabsItems.offsetHeight,'这个是tabsitems元素');
                // console.log(this.$refs.tabsItems.offsetHeight,'这个是tabsitems元素');
                // console.log('tabs_' + this.activeIndex);
                // console.log(this.$refs['tabs_'+this.activeIndex][0].offsetHeight,'这个是tabsitems元素');
                // console.log(this.$refs['tabs_' + this.activeIndex][0].offsetLeft, '这个是tabsitems元素');
                // console.log(this.$refs['tabs_' + this.activeIndex][0].offsetWidth, '这个是tabsitems元素');
                let tabs = this.$refs.tabsItems;
                let tabsItem = this.$refs['tabs_' + this.activeIndex][0];
                let progressWidth = this.progressWidth|| tabsItem.offsetWidth;
                this.itemWidth = progressWidth;
                console.log(tabsItem.offsetLeft, tabs.offsetLeft,tabsItem.offsetWidth,progressWidth)
                this.progressLeft = tabsItem.offsetLeft +  (tabsItem.offsetWidth- progressWidth)/2;
            }
        }
    }
</script>

<style scoped>
    .z-tabs-box {
        overflow-y: hidden;
        overflow-x: scroll;
    }

    .tabs-items {
        min-width: 100%;
        height: 100%;
        display: flex;
        position: relative;

    }

    .tabs-item {
        cursor: pointer;
        flex-shrink: 0;
        max-width: var(--tab-max-width, unset);
        width: auto;
        min-width: var(--tab-min-width, 37px);
        font-weight: normal;
        font-size: var(--tab-item-font, 14px);
        color: var(--tab-item-color, #86909B);
        text-align: center;
        font-weight: var(--tab-item-weight, 400);
        padding: var(--tabs-pad-top, 0) var(--tab-space, 0.5em) var(--tabs-pad-btm, 0);
        transition: color ease-in-out 0.3s 0s;
        box-sizing: border-box;
        /* line-height: calc( var(--tab-height, var(--tab-h)) - var(--tabs-pad-btm,0) - var(--tabs-pad-top,0)); */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tabs-item.active {
        font-weight: var(--tab-item-active-weight, var(--tab-item-weight, 400));
        font-size: var(--tab-item-active-font, var(--tab-item-font, 14px));
        color: var(--tab-item-active-color, #111);

    }

    .tabs-item.full {
        flex-grow: 1;
    }

    .tabs-item+.tabs-item {
        margin-left: var(--tab-mar-space, 0em);
    }

    .tabs-progress {
        position: absolute;
        top: var(--tabs-progress-top, unset);
        /* top与bottom两个只可设置一个 */
        bottom: var(--tabs-progress-btm, 0);
        left: var(--scoll-left, -100%);
        /*-100% 初始隐藏*/
        width: var(--tabs-progress-width);
        height: var(--tabs-progress-height, 2px);
        background-color: var(--tabs-progress-color,var(--tab-item-active-color,var(--color-theme, currentcolor)) );
        background-image: var(--tabs-progress-img, unset);
        transition: var(--transition-progress, none);
        box-shadow: var(--tabs-progress-shadow, none);
        border-radius: var(--tabs-progress-radius, 0);
        z-index: 10;
    }
</style>
