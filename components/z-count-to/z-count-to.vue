<template>
  <view class="count-num"><slot :num="displayValue">{{ displayValue }}</slot></view>
</template>
<script>
  /**
 * countTo 数字滚动
 * @description 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。
 * @tutorial https://www.uviewui.com/components/countTo.html
 * @property {String Number} start-val 开始值
 * @property {String Number} end-val 结束值
 * @property {String Number} duration 滚动过程所需的时间，单位ms（默认2000）
 * @property {Boolean} autoplay 是否自动开始滚动（默认true）
 * @property {String Number} decimals 要显示的小数位数，见官网说明（默认0）
 * @property {Boolean} use-easing 滚动结束时，是否缓动结尾，见官网说明（默认true）
 * @property {String} separator 千位分隔符，见官网说明
 * @event {Function} end 数值滚动到目标值时触发
 * @example <z-count-to ref="countTo" v-model:end-val="endVal" v-model:autoplay="autoplay"></z-count-to>
 * <style>
    .count-to{
        --count-to-color:  数字滚动颜色 默认继承父元素
        --count-to-font-size:  数字滚动字体大小 默认继承父元素
        --count-to-weight： 数字滚动字重  默认 normal
    }
 </style>
 */
  import {
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
    watch,
    computed,
    ref
  } from 'vue';
  import {
    isNum
  } from '../../utils/test.js';
  // #ifdef H5
   import '../../utils/requestAnimationFrame.js';
  // #endif
  // #ifndef H5
   import {requestAnimationFrame,cancelAnimationFrame} from '../../utils/requestAnimationFrame.js'
  // #endif
  export default {
    name: 'z-count-to',
    props: {
      // 开始的数值，默认从0增长到某一个数
      startVal: {
        type: [Number, String],
        default: 0
      },
      // 要滚动的目标数值，必须
      endVal: {
        type: [Number, String],
        default: 0,
        required: true
      },
      // 滚动到目标数值的动画持续时间，单位为毫秒（ms）
      duration: {
        type: [Number, String],
        default: 2000
      },
      // 设置数值后是否自动开始滚动
      autoplay: {
        type: Boolean,
        default: true
      },
      // 要显示的小数位数
      decimals: {
        type: [Number, String],
        default: 0
      },
      // 是否在即将到达目标数值的时候，使用缓慢滚动的效果
      useEasing: {
        type: Boolean,
        default: true
      },
      // 十进制分割
      decimal: {
        type: [Number, String],
        default: '.'
      },
      // 千位分隔符，类似金额的分割(￥23,321.05中的",")
      separator: {
        type: String,
        default: ''
      }
    },
    setup(props, {
      emit
    }) {
      let localStartVal = props.startVal;
      let displayValue = ref(0);
      let printVal =  null;
      let paused =  false; // 是否暂停
      let localDuration =  Number(props.duration);
      let startTime = null; // 开始的时间
      let timestamp =  null; // 时间戳
      let remaining =  null; // 停留的时间
      let  rAF =  null;
      let lastTime =  0 // 上一次的时间

      onBeforeMount(()=>{
        displayValue.value = formatNumber(props.startVal);
      })
      onMounted(() => {
        props.autoplay && start();
      });
      onBeforeUnmount(()=>{
        cancelAnimationFrame(rAF);
      })
      
      // 监听传入开始/结束值的变化
      watch([() => props.startVal, () => props.endVal], (newval, oldval) => {
        props.autoplay && start();
      })
      // 是否可以滚动
      const countDown = computed(() => {
        return props.startVal > props.endVal;
      });

      function easingFn(t, b, c, d) {
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
      }

      
      // 开始滚动数字
    function start() {
        localStartVal = props.startVal;
        startTime = null;
        localDuration = props.duration;
        paused = false;
        rAF = requestAnimationFrame(count);
      }
      
      // 暂定状态，重新再开始滚动；或者滚动状态下，暂停
     function reStart() {
        if (paused) {
          resume();
          paused = false;
        } else {
          stop();
          paused = true;
        }
      }
      // 暂停
      function stop() {
        cancelAnimationFrame(rAF);
      }
      // 重新开始(暂停的情况下)
     function resume() {
        startTime = null;
        localDuration = remaining;
        localStartVal = printVal;
        requestAnimationFrame(count);
      }
      // 重置
      function reset() {
        startTime = null;
        cancelAnimationFrame(rAF);
        displayValue.value = formatNumber(props.startVal);
      }
      function count(oldTimestamp) {
        if (!startTime) startTime = oldTimestamp;
        timestamp = oldTimestamp;
        const progress = oldTimestamp - startTime;
        remaining = localDuration - progress;
        if (props.useEasing) {
          if (countDown.value) {
            printVal = localStartVal - easingFn(progress, 0, localStartVal - props.endVal,
              localDuration);
          } else {
            printVal = easingFn(progress, localStartVal, props.endVal - localStartVal,
              localDuration);
          }
        } else {
          if (countDown.value) {
            printVal = localStartVal - (localStartVal - props.endVal) * (progress / localDuration);
          } else {
            printVal = localStartVal + (props.endVal - localStartVal) * (progress / localDuration);
          }
        }
        if (countDown.value) {
          printVal = printVal < props.endVal ? props.endVal : printVal;
        } else {
          printVal = printVal > props.endVal ? props.endVal : printVal;
        }
        // console.log(printVal);
        displayValue.value = formatNumber(printVal);
        if (progress < localDuration) {
          rAF = requestAnimationFrame(count);
        } else {
          emit('end');
        }
      }
      function formatNumber(num) {
        // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
        num = Number(num);
        num = num.toFixed(Number(props.decimals));
        num += '';
        const x = num.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? props.decimal + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        if (props.separator && !isNum(props.separator)) {
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + props.separator + '$2');
          }
        }
        return x1 + x2;
      }
      
      
      return {
        displayValue
      }
    }
  };
</script>

<style scoped>
  .count-num {
    display: inline-block;
    text-align: center;
    color: var(--count-to-color, inherit);
    font-weight: var(--count-to-weight, normal);
    font-size: var(--count-to-font-size, inherit);
  }
</style>
