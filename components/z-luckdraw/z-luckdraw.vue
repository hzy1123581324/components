<template>
    <view class="luckdraw-box">
        <view class="luckdraw-btn" @click="startRoll()">
            <slot name="luckdraw-btn">
                抽奖
            </slot>
        </view>
        <view class="luckdraw-list">
            <view :class="['luckdraw-item','luckdraw-item'+i,index==i&&'luckdraw-item-active']" v-for="(item,i) in list"
                :key="item.id">
                <slot name='default' :item='item' :active="index==i">
                    {{item}}
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * z-luckdraw 九宫格抽奖
     * @description 该组件用于九宫格概率抽奖
     * @tutorial https://www.uviewui.com/components/noticeBar.html
     * @property {Array} list 奖项
     * @property {String,Number} prize 中奖项
     * @example <z-luckdraw class="luckdraw"  :list="list">
                    <view slot="luckdraw-btn">抽奖</view>
                    <template  v-slot:default="{ item,active }">
                      <view
                        :class="[active&&'item-active']"
                       
                      >
                        <view>{{ item.title}}</view>
                        <view>{{ item.subhead }}</view>
                      </view>
                    </template >
                </z-luckdraw>
     * <style>
         .luckdraw{
            --tab-bg:  组件背景色
            --tab-height： 组件高度  默认80rpx
         }
     </style>
     */
    export default {
        props: {
            list: {
                required: true,
                type: Array,
                default: () => {
                    return [];
                }
            },
            prize:{
                type: [String,Number],
                default: -1,
            }
        },
        data() {
            return {

                index: -1, //当前转动到哪个位置，起点位置
                count: 8, // 总共有多少个位置
                timer: 0, // 每次转动定时器
                speed: 200, // 初始转动速度
                times: 0, // 转动次数
                cycle: 50, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                prizeIndex: -1, // 中奖位置
            }
        },
        watch:{
            prize(newval){
                this.prizeIndex = newval;
            }
        },
        methods: {
            // 开始转动
            startRoll(prizeIndex) {
                this.times += 1; // 转动次数
                this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
                // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
                if (this.times > this.cycle + 10 && this.prizeIndex === this.index) {
                    clearTimeout(this.timer); // 清除转动定时器，停止转动
                    this.timer = '';
                    this.prizeIndex = -1;
                    this.times = 0;
                    this.speed = 200;
                    this.click = true;
                    // var that = this;
                    setTimeout(res => {
                        // that.showToast = true;
                        this.index = -1;
                    }, 500);
                } else {
                    // console.log('eeeeeeeee')
                    if (this.times < this.cycle) {
                        this.speed -= 10; // 加快转动速度
                    } else if (this.times === this.cycle) {
                        // const index = parseInt(Math.random() * 10, 0) || 0; // 随机获得一个中奖位置

                        this.prizeIndex = prizeIndex; //中奖位置,可由后台返回
                        if (this.prizeIndex > 7) {
                            this.prizeIndex = 7;
                        }
                        // this.zhongjia = this.list[this.prizeIndex];
                    } else if (this.times > this.cycle + 10 && ((this.prizeIndex === 0 && this.index === 7) || this.prize ===
                            this.index + 1)) {
                        this.speed += 110;
                    } else {
                        this.speed += 20;
                    }
                    if (this.speed < 40) {
                        this.speed = 40;
                    }
                    this.timer = setTimeout(() => {
                        this.startRoll(prizeIndex);
                    }, this.speed);
                }
            },

            // 每一次转动
            oneRoll() {
                let index = this.index; // 当前转动到哪个位置
                const count = this.count; // 总共有多少个位置
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                this.index = index;
            },
        },
    }
</script>

<style scoped>
    .luckdraw-box {
        width: 100%;
        height: 600rpx;
        background-color: #f1f1f1;
        position: relative;
    }

    /* 抽奖按钮 */
    .luckdraw-btn {
        width: var(--luckdraw-item-width, 33.333333%);
        height: var(--luckdraw-item-height, 33.333333%);
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: red;
    }

    .luckdraw-list {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }

    .luckdraw-item {
        width: var(--luckdraw-item-width, 33.333333%);
        height: var(--luckdraw-item-height, 33.333333%);
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid #fff;
    }

    .luckdraw-item-active {
        /* background-color: rgba(255,255,255,0.6); */
    }

    .luckdraw-item3 {
        position: relative;

        left: 66.666667%;
    }

    .luckdraw-item4 {
        position: relative;
        top: 33.333333%;
        left: 33.333333%;
    }

    .luckdraw-item5 {
        position: relative;
        top: 33.333333%;
        left: -33.333333%;
    }

    .luckdraw-item7 {
        position: relative;
        top: -33.333333%;
        left: -33.333333%;
    }
</style>
