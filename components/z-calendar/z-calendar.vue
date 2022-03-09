<template>
    <view class="calendar" @touchmove.stop.prevent="clean">
        <view v-if="!insert&&show" class="calendar__mask" :class="{'calendar--mask-show':aniMaskShow}" @click="clean"></view>
        <view v-if="insert || show" class="calendar__content" :class="{'calendar--fixed':!insert,'calendar--ani-show':aniMaskShow}">
            <view v-if="!insert" class="calendar__header calendar--fixed-top">
                <view class="calendar__header-btn-box" @click="close">
                    <text class="calendar__header-text calendar--fixed-width">取消</text>
                </view>
                <view class="calendar__header-btn-box" @click="confirm">
                    <text class="calendar__header-text calendar--fixed-width">确定</text>
                </view>
            </view>
            <view class="calendar__header">
                <view class="calendar__header-btn-box" @click="pre">
                    <view class="calendar__header-btn calendar--left"></view>
                </view>
                <view class="calendar__header-text">{{ (nowDate.year||'') +'年'+( nowDate.month||'') +'月'}}</view>
                <view class="calendar__header-btn-box" @click="next">
                    <view class="calendar__header-btn calendar--right"></view>
                </view>
                <view class="calendar__backtoday" @click="backtoday">回到今天</view>
            </view>
            <view class="calendar__box">
                <view v-if="showMonth" class="calendar__box-bg">
                    <view class="calendar__box-bg-text">{{nowDate.month}}</view>
                </view>
                <view class="calendar__weeks">
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">日</text>
                    </view>
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">一</text>
                    </view>
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">二</text>
                    </view>
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">三</text>
                    </view>
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">四</text>
                    </view>
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">五</text>
                    </view>
                    <view class="calendar__weeks-day">
                        <text class="calendar__weeks-day-text">六</text>
                    </view>
                </view>
                <view class="calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
                    <view class="calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
                        <calendar-item :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import Calendar from './util.js';
    import CalendarItem from './calendar-item.vue'
    /**
     * Calendar 日历
     * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
     * @tutorial https://ext.dcloud.net.cn/plugin?id=56
     * @property {String} date 自定义当前时间，默认为今天
     * @property {Boolean} lunar 显示农历
     * @property {String} startDate 日期选择范围-开始日期
     * @property {String} endDate 日期选择范围-结束日期
     * @property {Boolean} range 范围选择
     * @property {Boolean} insert = [true|false] 插入模式,默认为false
     *     @value true 弹窗模式
     *     @value false 插入模式
     * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
     * @property {Boolean} showMonth 是否选择月份为背景
     * @event {Function} change 日期改变，`insert :ture` 时生效
     * @event {Function} confirm 确认选择`insert :false` 时生效
     * @event {Function} monthSwitch 切换月份时触发
     * @example <calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
     */
    export default {
        components: {
            CalendarItem
        },
        props: {
            date: {
                type: String,
                default: ''
            },
            selected: {
                type: Array,
                default () {
                    return []
                }
            },
            lunar: {
                type: Boolean,
                default: false
            },
            startDate: {
                type: String,
                default: ''
            },
            endDate: {
                type: String,
                default: ''
            },
            range: {
                type: Boolean,
                default: false
            },
            insert: {
                type: Boolean,
                default: true
            },
            showMonth: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                show: false,
                weeks: [],
                calendar: {},
                nowDate: '',
                aniMaskShow: false
            }
        },
        watch: {
            selected(newVal) {
                this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
                this.weeks = this.cale.weeks
            }
        },
        created() {
            // 获取日历方法实例
            this.cale = new Calendar({
                date: this.date,
                selected: this.selected,
                startDate: this.startDate,
                endDate: this.endDate,
                range: this.range,
            })
            this.init(this.cale.date.fullDate)
        },
        methods: {
            // 取消穿透
            clean() {},
            init(date) {
                this.weeks = this.cale.weeks
                this.nowDate = this.calendar = this.cale.getInfo(date)
            },
            open() {
                this.show = true
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.aniMaskShow = true
                    }, 50)
                })
            },
            close() {
                this.aniMaskShow = false
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.show = false
                    }, 300)
                })
            },
            confirm() {
                this.setEmit('confirm')
                this.close()
            },
            change() {
                if (!this.insert) return
                this.setEmit('change')
            },
            monthSwitch() {
                let {
                    year,
                    month
                } = this.nowDate
                this.$emit('monthSwitch', {
                    year,
                    month: Number(month)
                })
            },
            setEmit(name) {
                let {
                    year,
                    month,
                    date,
                    fullDate,
                    lunar,
                    extraInfo
                } = this.calendar
                this.$emit(name, {
                    range: this.cale.multipleStatus,
                    year,
                    month,
                    date,
                    fulldate: fullDate,
                    lunar,
                    extraInfo: extraInfo || {}
                })
            },
            choiceDate(weeks) {
                if (weeks.disable) return
                this.calendar = weeks
                // 设置多选
                this.cale.setMultiple(this.calendar.fullDate)
                this.weeks = this.cale.weeks
                this.change()
            },
            backtoday() {
                this.cale.setDate(this.date)
                this.weeks = this.cale.weeks
                this.nowDate = this.calendar = this.cale.getInfo(this.date)
                this.change()
            },
            pre() {
                const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
                this.setDate(preDate)
                this.monthSwitch()

            },
            next() {
                const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
                this.setDate(nextDate)
                this.monthSwitch()
            },
            setDate(date) {
                this.cale.setDate(date)
                this.weeks = this.cale.weeks
                this.nowDate = this.cale.getInfo(date)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .calendar {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: column;
    }

    .calendar__mask {
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        background-color: $uni-bg-color-mask;
        transition-property: opacity;
        transition-duration: 0.3s;
        opacity: 0;
        /* #ifndef APP-NVUE */
        z-index: 99;
        /* #endif */
    }

    .calendar--mask-show {
        opacity: 1
    }

    .calendar--fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        transition-property: transform;
        transition-duration: 0.3s;
        transform: translateY(460px);
        /* #ifndef APP-NVUE */
        z-index: 99;
        /* #endif */
    }

    .calendar--ani-show {
        transform: translateY(0);
    }

    .calendar__content {
        background-color: #fff;
    }

    .calendar__header {
        position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        border-bottom-color: $uni-border-color;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }

    .calendar--fixed-top {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: space-between;
        border-top-color: $uni-border-color;
        border-top-style: solid;
        border-top-width: 1px;
    }

    .calendar--fixed-width {
        width: 50px;
        // padding: 0 15px;
    }

    .calendar__backtoday {
        position: absolute;
        right: 0;
        top: 25rpx;
        padding: 0 5px;
        padding-left: 10px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        color: $uni-text-color;
        background-color: $uni-bg-color-hover;
    }

    .calendar__header-text {
        text-align: center;
        width: 100px;
        font-size: $uni-font-size-base;
        color: $uni-text-color;
    }

    .calendar__header-btn-box {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
    }

    .calendar__header-btn {
        width: 10px;
        height: 10px;
        border-left-color: $uni-text-color-placeholder;
        border-left-style: solid;
        border-left-width: 2px;
        border-top-color: $uni-color-subtitle;
        border-top-style: solid;
        border-top-width: 2px;
    }

    .calendar--left {
        transform: rotate(-45deg);
    }

    .calendar--right {
        transform: rotate(135deg);
    }


    .calendar__weeks {
        position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
    }

    .calendar__weeks-item {
        flex: 1;
    }

    .calendar__weeks-day {
        flex: 1;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 45px;
        border-bottom-color: #F5F5F5;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }

    .calendar__weeks-day-text {
        font-size: 14px;
    }

    .calendar__box {
        position: relative;
    }

    .calendar__box-bg {

        display: flex;

        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .calendar__box-bg-text {
        display: flex;
        width: auto;
        height: auto;
        font-size: 200px;
        font-weight: bold;
        color: $uni-text-color-grey;
        opacity: 0.1;
        text-align: center;
        line-height: 1;

    }
</style>
