<template>
    <view id="rollingBox" class="rolling-box" :style="roolingStyle">
        <!-- <view class="sticky" ref="sticky">
            <slot name="sticky">33333</slot>
        </view> -->
        <view class="scroll-box" @touchstart="start" @touchend="end" @touchmove="move" id="scrollBox" ref='scrollBox'>
            <!-- <view class="lookbox"></view> -->
            <view class="scroll-contaner" :style="`--move:-${scrollTop}px`">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * rolling 滚动盒子
     * @description 支持吸顶，下拉刷新,上拉加载更多，
     * @property {String，Number} lower 距离底部多少触发上拉加载更多事件
     * @tutorial https://www.uviewui.com/components/button.html
     * @example <rolling>
                    <sticky offset="100">吸顶元素</sticky>
                    <view>元素2</view>
                </rolling>
     */
    let timer;
    let start = 0;
    let save = 0;
    export default {
        name: "rolling",
        props: {
            // 距离底部多少触发上拉加载更多事件
            lower: {
                type: [String, Number],
                default: 50,
            },
            // 上拉下拉阴影
            shadow: {
                type: String,
                default: 'rgba(0,0,0,.3)'
            }
        },
        data() {
            return {
                canclick: true,
                tset: 12341234123,
                maxScrollTop: 0,
                scrollTop: 0,
                // 顶部底部阴影高度
                showTopShadow: 0,
                showBtnShadow: 0,
                transition: '', //过渡效果
                rect: {}, //组件信息
            };
        },
        provide: function() {
            return {
                getScrollTop: this.sendScroolTop,
                getParentRect: this.sendParentRect,
            }
        },
        onLoad() {},
        created() {
            // this.getRace();
        },
        mounted() {
            // this.setmaxScroll();
            this.getRace();
        },

        onPageScroll: function(object) {
            clearTimeout(timer) // 每次滚动前 清除一次
            that.canSwip = false;
            timer = setTimeout(function() {
                // console.log('滚动结束了');
                that.canSwip = true;
            }, 500);
        },
        onReady() {
            // observer = uni.createIntersectionObserver(this);

            // observer.relativeTo('.scroll-box',{top: 10}).observe('.lookbox', (res) => {
            //   // if (res.intersectionRatio > 0 && !this.appear) {
            //   //   this.appear = true;
            //   // } else if (!res.intersectionRatio > 0 && this.appear) {
            //   //   this.appear = false;
            //   // }
            //   console.log(res,'99999999999+++++++++++');
            // })

        },
        methods: {
            // 设置最大滚动距离
            async setmaxScroll() {
                let height = 0;
                const query = uni.createSelectorQuery().in(this);
                await query.select('.scroll-box').boundingClientRect(data => {
                    height = data.height;
                }).exec();
                await query.select('.scroll-contaner').boundingClientRect(data => {
                    this.maxScrollTop = data.height - height;
                }).exec();
            },
            //向子组件发送this.scrollTop
            sendScroolTop() {
                return this.scrollTop;
            },
            sendParentRect() {
                return this.rect;
            },
            async getRace() {
                let rect;
                const query = uni.createSelectorQuery().in(this);
                await query.select('#rollingBox').boundingClientRect(data => {
                    // console.log('888888888888888888888888888888',data);
                    this.rect = data;
                }).exec();
                return rect;
            },
            // 滑动落脚点
            start(e) {
                // console.log(e, '开始滑动++++++++');
                this.setmaxScroll();
                start = e.changedTouches[0].clientY;
                save = this.scrollTop;
                this.transition = '';
                // console.log(start,'666666')
            },
            // scrollChange(event) {
            //     console.log(JSON.stringify(this.$refs), '8484848484848484');
            //     this.scrollTop = this.$refs.scrollBox.scrollTop;
            // },
            // 滑动中
            move(e) {
                // console.log(e);
                let move = e.changedTouches[0].clientY;
                let {
                    scrollTop,
                    maxScrollTop
                } = this;
                // console.log(save + start - move, save + start - move - maxScrollTop, '查看数据查看数据');
                // 下拉刷新
                if (save + start - move <= 0) {
                    // console.log('步骤111111');
                    if (Math.abs(save + start - move) < 40) {
                        this.showTopShadow = Math.abs(save + start - move);
                    } else {
                        this.showTopShadow = 40;
                    }
                    this.scrollTop = 0;
                    // 下拉刷新动作
                } else if ((save + start - move >= 0) && (save + start - move - maxScrollTop <= 0)) {
                    // 在可移动范围移动
                    // console.log(save, move, maxScrollTop, '步骤22222');
                    this.scrollTop = save + start - move;
                } else {
                    // console.log('步骤333333');
                    // 上拉加载更多
                    let showBtnShadow = 0;
                    if (Math.abs(save + start - move - maxScrollTop) < 40) {
                        showBtnShadow = Math.abs(save + start - move - maxScrollTop);
                    } else {
                        showBtnShadow = 40;
                    }
                    this.showBtnShadow = showBtnShadow;
                    this.scrollTop = maxScrollTop;
                }
            },

            end(e) {
                // console.log(e);
                save = null;
                this.transition = 'all ease-in-out 0.4s 0s';
                if (this.showTopShadow > 0) {
                    // 触发下拉刷新
                    this.$emit('scrolltoupper')
                }
                if (this.showBtnShadow > 0) {
                    // 触发下拉刷新
                    this.$emit('scrolltolower')
                }
                setTimeout(() => {
                    this.showBtnShadow = 0;
                    this.showTopShadow = 0;

                }, 100);
            }
        },
        watch: {},
        computed: {
            roolingStyle() {
                let {
                    showTopShadow,
                    showBtnShadow,
                    transition,
                    shadow
                } = this;
                let Shadow = ''
                if (shadow !== 'none') {
                    Shadow = `--shadow-color:${shadow}`
                } else {
                    Shadow = '--shadow-color:transparent'
                }
                return `--shadow-btn:${showBtnShadow||0}px;--shadow-top:${showTopShadow||0}px;--transition:${transition||'none'};${Shadow};`
            }
        },
    };
</script>

<style scoped>
    .rolling-box {
        height: 100%;
        max-height: 100vh;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;

    }

    .rolling-box::before {
        top: 0;
        background-image: radial-gradient(at top, var(--shadow-color, rgba(0, 0, 0, .3)) 70%, transparent 70%, transparent 100%);
        background-size: 100% var(--shadow-top, 0);
        height: var(--shadow-top, 0);
    }

    .rolling-box::after {
        background-image: radial-gradient(at bottom, var(--shadow-color, rgba(0, 0, 0, .3)) 70%, transparent 70%, transparent 100%);
        bottom: 0;
        height: var(--shadow-btn, 0);
        height: var(--shadow-btn, 0);
    }

    .rolling-box::after,
    .rolling-box::before {
        content: '';
        transition: var(--transition, none);
        overflow: auto;
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        padding: 0;
        background-repeat: no-repeat;
        background-attachment: scroll;
        z-index: 99;
    }

    .sticky {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .sticky.active {
        opacity: 0;
        pointer-events: none;
    }

    .scroll-box {
        flex-grow: 1;
        height: 50%;
        max-height: 100%;

        position: unset;
        overflow: hidden;
    }


    .scroll-contaner {
        margin-top: var(--move);
        -webkit-overflow-scrolling: touch;
        /*使iOS列表滑动流畅*/
    }
</style>
