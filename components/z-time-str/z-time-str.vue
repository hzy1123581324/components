<template>
  <text>{{timeStr}}</text>
</template>

<script setup>
  /**
   * z-time-str 时间戳处理
   * @description 时间戳处理
   * @tutorial https://www.uviewui.com/components/button.html
   * @property {String} format 输出格式
   * @property {String,Number} value精确到秒的时间戳，不传默认是当前时间 
   * @example  <z-time-str :value=""></z-time-str>
   * @example  <z-time-str :value="1111111111" :format="'HH:mm:ss'" ></z-time-str>
   */

  import {
    computed,
  } from "vue";
  const props = defineProps({
    // 输出格式
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    // 要转换的时间戳
    value: {
      type: [String, Number],
      default: '',
    }
  });

  let timeStr = computed(() => {
    const date = new Date(props.value ? props.value * 1000 : new Date().getTime());
    return __format(date);
  });

  function __format(date) {
    const year = date.getFullYear();
    const month = date.getMonth() * 1 + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    let zeroize = (val) => {
      if (val < 10) {
        return '0' + val;
      } else {
        return val;
      }
    }
    let timeStr = props.format;
    timeStr = timeStr
      .replace(/yyyy/, year)
      .replace(/MM/, zeroize(month))
      .replace(/dd/, zeroize(day))
      .replace(/HH/, zeroize(hour))
      .replace(/mm/, zeroize(minute))
      .replace(/ss/, zeroize(second));
    return timeStr

  }
</script>
