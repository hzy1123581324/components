<template>
  <view class="badge-box" v-if="num!=-1" :data-num="number">
    <slot></slot>
  </view>
</template>

<script>
  /**
     * badge 数字角标
     * @description 数字角标一般和其它控件（列表、9宫格等）配合使用，用于进行数量提示，（注意父元素必须为相对定位）
     * @tutorial https://www.zviewui.com/components/badge.html
     * @property {String, Number} num 数量 -1不显示，零显示红点，其他变现数字
     * @example <z-badge :num="num"></z-badge>
     * <style>
         .badge{
            --badge-top   角标绝对定位向上
            --badge-rg   角标绝对定位向右
            --badge-lf   角标绝对定位向左
            --badge-btm  角标绝对定位向下
            --badge-size  角标大小 默认12rpx
            --badge-bg ：角标背景色 默认 #f55
            --badge-color: 字体颜色 默认白色
            --badge-font-size: 默认10rpx
            --badge-trans-x: 偏移自身x轴多少默认-50%
            --badge-trans-y:  偏移自身y轴多少默认-50%
         }
     </style>
     */
  import {
    computed
  } from 'vue';
  export default {
    name: 'z-badge',
    props: {
      num: {
        type: [String, Number],
        default: "-1"
      }
    },
    setup(props, {
      emit
    }) {
      const number = computed(() => {
        if (props.num - 99 > 0) {
          return "99+";
        } else if (parseFloat(props.num) == 0) {
          return "";
        } else {
          return props.num;
        }
      })
      return {
        number
      }
    }
  }
</script>

<style scoped>
  .badge-box {
    position: relative;
  }

  .badge-box::after {
    content: attr(data-num);
    --size: 12rpx;
    --fs: 10rpx;
    font-family: var(--badge-num-font-family, inherit);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    top: var(--badge-top, 0);
    right: var(--badge-rg, 0);
    left: var(--badge-lf, unset);
    bottom: var(--badge-btm, unset);
    min-width: var(--badge-width, var(--size));
    min-height: var(--badge-height, var(--size));
    /* line-height: var(--badge-size, var(--size)); */
    border-radius: calc(var(--badge-size, var(--size)) / 2);
    background-color: var(--badge-bg, #f55);
    color: var(--badge-color, #fff);
    font-size: var(--badge-font-size, var(--fs));
    font-weight: var(--badge-weight, 400);
    /* transform: translate(var(--badge-trans-x, -50%), var(--badge-trans-y, -50%)); */
    padding: var(--badge-pad, 0.5em);
    z-index: 3;
    border-radius: var(--badge-radius, 50%);
  }
</style>
