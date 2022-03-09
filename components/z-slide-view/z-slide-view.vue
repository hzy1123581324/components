<template>
    <view class="slide-view-box">
        <scroll-view id="slideViewBox" :scroll-x="true" :scroll-left='scollx' scroll-with-animation="false" class="slide-view-item"
            @scroll="scrollChange">
            <view class="menu-black">
                <view class="menu-item" v-for="(item,index) in [...list,...list]" :key="index">
                    <view class="menu-item-currency">
                        <text>{{item.tradeCurrencyName}}/{{item.currencyName}}</text>
                        <text class="rateSon" v-if="item.rise >= 0">+{{item.rise}}%</text>
                        <text class="rateSon red" v-else>{{item.rise}}%</text>
                    </view>
                    <view :class="['menu-item-currency-price',item.rise >= 0?'up':'down']">
                        {{item.currentPrice|number3(4)}}
                    </view>
                    <view class="menu-item-currency-cny">
                        ¥ {{(item.currentPrice * item.basePrice * item.usdtPirce)|number2(2)}}
                    </view>
                </view>
            </view>
        </scroll-view>
        <!-- 进度条 -->
        <movable-area class="progress-bar">
            <movable-view class="progress-item" damping="100" :x="movex" direction="horizontal" :style='countProgressStyle'
                @change="movableChange"></movable-view>
        </movable-area>
    </view>
</template>

<script>
    /**
     * slide-view 滑动导航
     * @description 这是一个可以活动的导航，带进度条
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {Array} list  传入数组
     * @example <z-slide-view class="slide-view" :lsit="list"></z-slide-view>
     */
    export default {
        name: 'slide-view',
        props: {
            list: {
                type: Array,
                required: true,
                default: () => {
                    return []
                },
            },

        },
        data() {
            return {
                movex: 0,
                scollx: 0,
                timer: null,
                move_type: null,
                bigWidth: 0,
                scrollWidth: 0,
                progressWidth: 0,
            };
        },
        created() {},
        watch: {
            list(){
                this.init();
            }
        },
        computed: {
            // 进度条样式
            countProgressStyle() {
                let column = this.bigWidth/this.scrollWidth*100
                return `width: ${column}%;`
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init(){
                this.$nextTick(()=>{
                    uni.createSelectorQuery().in(this).select("#slideViewBox").fields({
                        size: true,
                        rect: true,
                        scrollOffset: true
                    }, data => {
                        // console.log(data)
                        this.bigWidth = data.width;
                        this.scrollWidth = data.scrollWidth
                    }).exec();
                    uni.createSelectorQuery().in(this).select(".progress-bar").fields({
                        size: true,
                        rect: true,
                        // scrollOffset: true
                    }, data => {
  
                        this.progressWidth = data.width;
                        // console.log(this.progressWidth,'&&&&')
                    }).exec();
                })
            },
            itemtap(item) {
                this.$emit('itemtap', item);
            },
            // 移动进度条
            movableChange(event) {
               // console.log(event,'一点')
               // console.log('666666666666666666');
               if (this.move_type && this.move_type != 'movable') {
                   return;
               }
               this.move_type = 'movable';
               clearTimeout(this.timer);
               this.timer = setTimeout(() => {
                   this.move_type = null;
               }, 100)
               // let scollx = event.detail.scrollLeft;
               let scollx = event.detail.x;
               // console.log(scollx,'一点')
               let change_rate = this.scrollWidth/this.progressWidth ;
               
               // console.log(change_rate,this.scrollWidth,this.progressWidth,'&&&&&&&&&&&&&&&&&&&')
               this.$nextTick(() => {
                   this.scollx = scollx * change_rate;
               })
               // console.log(event,'一点')
            },

            scrollChange(event) {
                // console.log(event);
                // console.log('888888888888');
                if (this.move_type && this.move_type != 'scroll') {
                    return;
                }
                // console.log('777777777777777');
                this.move_type = 'scroll';
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.move_type = null;
                }, 500)
                let scollx = event.detail.scrollLeft;
                let change_rate = this.progressWidth / event.detail.scrollWidth;
                this.$nextTick(() => {
                    this.movex = scollx * change_rate;
                })
            }
        }
    }
</script>

<style scoped>
    .slide-view-box {
        position: relative;
        padding-top: 20rpx;
    }

    .slide-view-box::after,
    .slide-view-box::before {
        content: '';
        display: table;
        clear: both;
    }

    .slide-view-item {
        width: 100%;
        white-space: nowrap;
    }

    .menu-item {
        margin-right: 47rpx;
        display: inline-block;
        flex-wrap: wrap;
        min-width: 200rpx;
    }


    /* 进度条 */
    .progress-bar {
        width: 55rpx;
        height: 4rpx;
        border-radius: 16rpx;
        background-color: #9A9A9A;
        margin: 40rpx auto 0rpx;
    }

    .progress-item {
        height: 100%;
        display: inline-block;
        border-radius: 16rpx;
        background-color: #fff;
    }

    .menu-item-currency {
        font-size: 22rpx;
        font-family: DIN;
        font-weight: bold;
        color: #FFFFFF;
        vertical-align: text-bottom;
        line-height: 1;
    }

    .rateSon {
        margin-left: 10rpx;
        font-size: 20rpx;
        font-family: DIN;
        font-weight: 500;
        color: #66CC99;
    }

    .rateSon.red {
        color: #DA436B;
    }

    .menu-item-currency-price {
        font-size: 34rpx;
        font-family: DIN;
        font-weight: bold;
        margin-bottom: 24rpx;
        margin-top: 20rpx;
    }

    .menu-item-currency-price.up {
        color: #66CC99;
    }

    .menu-item-currency-price.down {
        color: #DA436B;
    }

    .menu-item-currency-cny {
        font-size: 22rpx;
        font-family: Myriad Pro;
        font-weight: 400;
        line-height: 22rpx;
        color: #BBBBBB;
    }
</style>
