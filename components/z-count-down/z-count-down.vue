<template>
  <view class="countdown flex-center">
    <view class="countdown-item" v-if="showDays">
      <view class="countdown-time">{{ d }}</view>
    </view>
    <view :class="['countdown-colon',separator == 'colon'&&'separator']" v-if="showDays">
      {{ separator == 'colon' ? ':' : '天' }}
    </view>
    <view class="countdown-item" v-if="showHours">
      <view class="countdown-time">{{ h }}</view>
    </view>
    <view :class="['countdown-colon',separator == 'colon'&&'separator']" v-if="showHours">
      {{ separator == 'colon' ? ':' : '时' }}
    </view>
    <view class="countdown-item" v-if="showMinutes">
      <view class="countdown-time">{{ i }}</view>
    </view>
    <view :class="['countdown-colon',separator == 'colon'&&'separator']" v-if="showMinutes">
      {{ separator == 'colon' ? ':' : '分' }}
    </view>
    <view class="countdown-item" v-if="showSeconds">
      <view class="countdown-time">{{ s }}</view>
    </view>
    <view :class="['countdown-colon',separator == 'colon'&&'separator']" v-if="showSeconds && separator == 'zh'">
      秒
    </view>
  </view>
</template>

<script setup>
  /**
     * countDown 倒计时
     * @description 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
     * @tutorial https://www.uviewui.com/components/countDown.html
     * @property {String Number} timestamp 倒计时，单位为秒
     * @property {Boolean} autoplay 是否自动开始倒计时，如果为false，需手动调用开始方法。见官网说明（默认true）
     * @property {String} separator 分隔符，colon为英文冒号，zh为中文（默认colon）
     * @property {Boolean} show-days 是否显示倒计时的"天"部分（默认true）
     * @property {Boolean} show-hours 是否显示倒计时的"时"部分（默认true）
     * @property {Boolean} show-minutes 是否显示倒计时的"分"部分（默认true）
     * @property {Boolean} show-seconds 是否显示倒计时的"秒"部分（默认true）
     * @event {Function} end 倒计时结束
     * @event {Function} change 每秒触发一次，回调为当前剩余的倒计秒数
     * @example <z-count-down ref="countDown" :timestamp="86400" :autoplay="false"></z-count-down>
     * <style>
        .count-down{
            
         }
     </style>
     */
  import {
    ref,
    watch,
    onBeforeMount,
    onBeforeUnmount
  } from "vue";
  const emit = defineEmits(['change', 'end']);
  const props = defineProps({
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
      default: 'colon',
      validator(value) {
        return ['colon', 'zh'].indexOf(value) > -1;
      }
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
  });
  // 记录定时器id
  let timer = ref('');
  // 天的默认值
  let d = ref('00');
  // 小时的默认值
  let h = ref('00');
  // 分钟的默认值
  let i = ref('00');
  // 秒的默认值
  let s = ref('00');
  // 记录不停倒计过程中变化的秒数
  let seconds = ref(0);
  // 监听时间戳的变化
  watch(() => props.timestamp, (newval, oldval) => {
    // 如果倒计时间发生变化，清除定时器，重新开始倒计时
    clearInterval(timer.vlaue);
    // console.log(newVal,'调用了')
    start();
  });

  onBeforeMount(() => {
    clearInterval(timer.value);
    props.autoplay && parseFloat(props.timestamp || 0) > 0 && start();
  })
  onBeforeUnmount(() => {
    clearInterval(timer.value);
    timer.value = null;
  })
  // 倒计时
  function start() {
    // console.log(this.timestamp,'这个是要倒计时的值')
    if (parseFloat(props.timestamp) <= 0) return;
    seconds.value = Number(props.timestamp);
    formatTime(seconds.value);
    timer.value = setInterval(() => {
      seconds.value--;
      // 发出change事件
      emit('change', seconds);
      if (seconds.value < 0) {
        return end();
      }
      formatTime(seconds.value);
    }, 1000);

  }

  // 格式化时间
  function formatTime(seconds) {
    // 小于等于0的话，结束倒计时
    seconds <= 0 && end();
    let [day, hour, minute, second] = [0, 0, 0, 0];
    day = Math.floor(seconds / (60 * 60 * 24));
    // 判断是否显示“天”参数，如果不显示，将天部分的值，加入到小时中
    // hour为给后面计算秒和分等用的(基于显示天的前提下计算)
    hour = Math.floor(seconds / (60 * 60)) - day * 24;
    // showHour为需要显示的小时
    let showHour = null;
    if (props.showDays) {
      showHour = hour;
    } else {
      showHour = Math.floor(seconds / (60 * 60));
    }
    minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
    second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
    // 如果小于10，在前面补上一个"0"
    // day = day < 10 ? '0' + day : day;
    // showHour = showHour < 10 ? '0' + showHour : showHour;
    // minute = minute < 10 ? '0' + minute : minute;
    // second = second < 10 ? '0' + second : second;
    // padStart 前补零
    d.value = String(day).padStart(2, '0');
    h.value = String(showHour).padStart(2, '0');
    i.value = String(minute).padStart(2, '0');
    s.value = String(second).padStart(2, '0');
  }
  // 停止倒计时
  function end() {
    // 清除定时器
    clearInterval(timer.value);
    timer.value = null;
    emit('end', {});
  }
</script>

<style scoped lang="scss">
  .countdown {
    display: inline-flex;
    align-items: center;
  }

  .countdown-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding:var(--countdown-item-pad,unset);
    white-space: nowrap;
    transform: translateZ(0);
    width: var(--countdown-item-size, 1em);
    height: var(--countdown-item-size, 1em);
    border: var(--countdown-border,unset);
    border-radius: var(--countdown-radius, var(--radius));
    background-color: var(--countdown-bg-color,unset);
    background-image: var(--countdown-bg-img);
    box-shadow: var(--countdown-shadow);
  }

  .countdown-time {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-size: var(--countdown-font-size, inherit);
    color: var(--countdown-color, inherit)
  }

  .countdown-colon {
    display: flex;
    justify-content: center;
    padding: var(---countdown-separator-pad,unset);
    line-height: 1;
    font-weight: var(---countdown-separator-font-weight,inherit);
    align-items: center;
    padding-bottom: 4rpx;
    font-size: var(---countdown-separator-font-size, inherit);
    color: var(---countdown-separator-color, inherit);
  }

  .countdown-colon.separator {
    // padding-bottom: 4rpx;
    // paddingBottom: separator == 'colon' ? '4rpx' : 0
  }

  .countdown-scale {
    transform: scale(0.9);
    transform-origin: center center;
  }
</style>
