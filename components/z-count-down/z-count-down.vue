<template>
    <view class="countdown">
        <view class="countdown-item"  v-if="showDays">
            <view class="countdown-time">{{ d }}</view>
        </view>
        <view :class="['countdown-colon',separator == 'colon'&&'separator']"   v-if="showDays">
            {{ separator == 'colon' ? ':' : '天' }}
        </view>
        <view class="countdown-item"  v-if="showHours">
            <view class="countdown-time" >{{ h }}</view>
        </view>
        <view :class="['countdown-colon',separator == 'colon'&&'separator']"  v-if="showHours">
            {{ separator == 'colon' ? ':' : '时' }}
        </view>
        <view class="countdown-item"  v-if="showMinutes">
            <view class="countdown-time">{{ i }}</view>
        </view>
        <view :class="['countdown-colon',separator == 'colon'&&'separator']"  v-if="showMinutes">
            {{ separator == 'colon' ? ':' : '分' }}
        </view>
        <view class="countdown-item"  v-if="showSeconds">
            <view class="countdown-time" >{{ s }}</view>
        </view>
        <view :class="['countdown-colon',separator == 'colon'&&'separator']" v-if="showSeconds && separator == 'zh'">
            秒
        </view>
    </view>
</template>

<script>
    /**
     * countDown 倒计时
     * @description 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
     * @tutorial https://www.uviewui.com/components/countDown.html
     * @property {String Number} timestamp 倒计时，单位为秒
     * @property {Boolean} autoplay 是否自动开始倒计时，如果为false，需手动调用开始方法。见官网说明（默认true）
     * @property {String} separator 分隔符，colon为英文冒号，zh为中文（默认colon）
     * @property {String Number} font-size 倒计时字体大小，单位rpx（默认30）
     * @property {Boolean} show-border 是否显示倒计时数字的边框（默认false）
     * @property {String} border-color 数字边框的颜色（默认#303133）
     * @property {String} bg-color 倒计时数字的背景颜色（默认#ffffff）
     * @property {String} color 倒计时数字的颜色（默认#303133）
     * @property {String} height 数字高度值(宽度等同此值)，设置边框时看情况是否需要设置此值，单位rpx（默认auto）
     * @property {Boolean} show-days 是否显示倒计时的"天"部分（默认true）
     * @property {Boolean} show-hours 是否显示倒计时的"时"部分（默认true）
     * @property {Boolean} show-minutes 是否显示倒计时的"分"部分（默认true）
     * @property {Boolean} show-seconds 是否显示倒计时的"秒"部分（默认true）
     * @event {Function} end 倒计时结束
     * @event {Function} change 每秒触发一次，回调为当前剩余的倒计秒数
     * @example <z-count-down ref="countDown" :timestamp="86400" :autoplay="false"></z-count-down>
     * <style>
        .count-down{
            --color: 字体颜色
            --font-size: 字体大小，单位rpx（默认30）
            --size； 字体盒子尺寸 默认auto;
            --separator-font-size 分隔符的字体大小，单位rpx（默认30）
            --separator-color 分隔符的颜色（默认#303133
            --bor-radius:  数字盒子圆角 默认6rpx
            --bor-width:  边框大小
            --border-color   边框颜色 默认#303133
            --bg-color    背景颜色 默认#fff
            --bg-img      背景图片
            --shadow      阴影
         }
     </style>
     */
    export default {
        name: 'z-count-down',
        props: {
            // 倒计时的时间，秒为单位
            timestamp: {
                type: [Number, String],
                default: 0
            },
            // 是否自动开始倒计时
            autoplay: {
                type: Boolean,
                default: true
            },
            // 用英文冒号(colon)或者中文(zh)当做分隔符，false的时候为中文，如："11:22"或"11时22秒"
            separator: {
                type: String,
                default: 'colon'
            },
            // 是否显示数字框
            showBorder: {
                type: Boolean,
                default: false
            },

            // 是否显示秒
            showSeconds: {
                type: Boolean,
                default: true
            },
            // 是否显示分钟
            showMinutes: {
                type: Boolean,
                default: true
            },
            // 是否显示小时
            showHours: {
                type: Boolean,
                default: true
            },
            // 是否显示“天”
            showDays: {
                type: Boolean,
                default: true
            },
        },
        watch: {
            // 监听时间戳的变化
            timestamp(newVal, oldVal) {
                // 如果倒计时间发生变化，清除定时器，重新开始倒计时
                clearInterval(this.timer);
                // console.log(newVal,'调用了')
                this.start();
            }
        },
        data() {
            return {
                d: '00', // 天的默认值
                h: '00', // 小时的默认值
                i: '00', // 分钟的默认值
                s: '00', // 秒的默认值
                timer: null, // 定时器
                seconds: 0, // 记录不停倒计过程中变化的秒数
            };
        },
        mounted() {
            // 如果自动倒计时
            // console.log(this.timestamp,'mountesd++++++++++++');
            clearInterval(this.timer);
            this.autoplay &&parseFloat(this.timestamp||0)>0 && this.start();
            // this.autoplay &&this.timestamp && this.start();
        },
        methods: {
            // 倒计时
            start() {
                // console.log(this.timestamp,'这个是要倒计时的值')
                if (parseFloat(this.timestamp) <= 0) return;
                this.seconds = Number(this.timestamp);
                this.formatTime(this.seconds);
                this.timer = setInterval(() => {
                    this.seconds--;
                    // 发出change事件
                    this.$emit('change', this.seconds);
                    if (this.seconds < 0) {
                        return this.end();
                    }
                    this.formatTime(this.seconds);
                }, 1000);
               
            },
            // 格式化时间
            formatTime(seconds) {
                // 小于等于0的话，结束倒计时
                seconds <= 0 && this.end();
                let [day, hour, minute, second] = [0, 0, 0, 0];
                day = Math.floor(seconds / (60 * 60 * 24));
                // 判断是否显示“天”参数，如果不显示，将天部分的值，加入到小时中
                // hour为给后面计算秒和分等用的(基于显示天的前提下计算)
                hour = Math.floor(seconds / (60 * 60)) - day * 24;
                // showHour为需要显示的小时
                let showHour = null;
                if (this.showDays) {
                    showHour = hour;
                } else {
                    showHour = Math.floor(seconds / (60 * 60));
                }
                minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
                second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                // 如果小于10，在前面补上一个"0"
                day = day < 10 ? '0' + day : day;
                showHour = showHour < 10 ? '0' + showHour : showHour;
                minute = minute < 10 ? '0' + minute : minute;
                second = second < 10 ? '0' + second : second;
                this.d = day;
                this.h = showHour;
                this.i = minute;
                this.s = second;
            },
            // 停止倒计时
            end() {
                // 清除定时器
                clearInterval(this.timer);
                this.timer = null;
                this.$emit('end', {});
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
</script>

<style scoped lang="scss">
    .countdown {
        display: inline-flex;
        align-items: center;
    }

    .countdown-item {
        --bor-ra: 6rpx;
        --bor-w: 1rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rpx;
        white-space: nowrap;
        transform: translateZ(0);
        width: var(--size,auto);
        height: var(--size,auto);
        border: var(--bor-width,var(--bor-w)) solid var(--border-color,#303133);
        border-radius: var(--bor-radius,var(--bor-ra));
        background-color: var(--bg-color,#fff);
        background-image: var(--bg-img);
        box-shadow: var(--shadow);
    }

    .countdown-time {
        --f-s: 30rpx;
        margin: 0;
        padding: 0;
        line-height: 1;
        font-size: var(--font-size,var(--f-s));
        color: var(--color,#303133)
    }

    .countdown-colon {
        --font-size: 30rpx;
        display: flex;
        justify-content: center;
        padding: 0 5rpx;
        line-height: 1;
        align-items: center;
        padding-bottom: 4rpx;
        font-size:var(--separator-font-size,var(--font-size)); 
        color: var(--separator-color,#303133);
    }
    .countdown-colon.separator{
        padding-bottom: 4rpx;
        // paddingBottom: separator == 'colon' ? '4rpx' : 0
    }
    .countdown-scale {
        transform: scale(0.9);
        transform-origin: center center;
    }
</style>
