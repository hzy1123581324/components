<template>
  <view class="counter-box">
    <view @click="delFun">
      <slot name="del" :candel="candel">
        <view :class="['del', currentValue - min <= 0 && 'undel']"></view>
      </slot>
    </view>
    <view class="intobox">
      <!-- <input type="text" v-model="Num" @blur.prevent="intoBlur($event)" /> -->
      <!-- <view :class="[!Num&&'place']" @click="test()">{{Num||
			
			}}</view> -->
      <!-- verify-number还不确定是否成功 -->
      <!-- <input  type="number" :verify-number="/\d+\.{0,1}\d?/"  v-model="value" @blur.prevent="intoBlur($event)" :placeholder="HolderTxt" placeholder-class="place"/> -->
      <input type="number" v-model="currentValue" :disabled="!enable" @blur.prevent="intoBlur($event)"
        :placeholder="holderTxt" placeholder-class="place" />
    </view>
    <view @click="addFun">
      <slot name="add" :canadd="canadd">
        <!-- 默认 -->
        <view :class="['add', max != 0 && currentValue - max >= 0 && 'unadd']"></view>
      </slot>
    </view>
  </view>
</template>

<script setup>
  import {
    Mul,
    Add,
    Sub,
    Div
  } from '../../utils/operation.js';
  import {
    defer
  } from "../../utils/optimize.js";
  import {
    onMounted,
    computed,
    watch,
    ref,
  } from "vue";

  /**
     * increase 自增自减计数器
     * @description 商品自增自减
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String,Number} min 最小值
     * @property {String,Number} max 最大值
     * @property {String,Number} number 初始化的值
     * @property {String,Number} step 递增步长
     * @property {String }  holderTxt  占位符
     * @example <increase :number.sync="number"></increase>
     * @example <increase class="couter" :number.sync="number"></increase>
     * <style>
     *  .couter{
        --increase-height: 组件的高度 默认38rpx 
        --increase-rate  递增递减按钮尺寸跟加减号的比例 默认 0.35
        --increase-icon-color 加减号颜色
        --increase-icon-disable-color 禁用加减号颜色
        --increase-icon-thick 加减号厚度
        --increase-input-font  输入框字体大小  默认 28rpx
        --increase-input-color  输入框字体颜色 默认 #333；
     * }
     * </style>
    */
  const props = defineProps({
    min: {
      type: [String, Number],
      default: 1,
      //等于-1没有最小值
    },
    max: {
      type: [String, Number],
      default: 0 //等于零就是没有最大值
    },
    number: {
      type: [String, Number],
      default: '',
    },
    /// 步长,每次点击增减
    step: {
      type: [String, Number],
      default: 1
    },
    ///占位符
    holderTxt: {
      type: String,
    },
    /// 是否禁用
    enable: {
      type: Boolean,
      default: false
    },
    modelVlaue: {
      type: [String, Number],
    },
    /// 切换前钩子
    onChangeBefore: {
      type: Function,
      default: defer
    }
  })
  // console.log(props,'这个是珊珊');
  const currentValue = ref(1);
  /// 监听v-model
  watch(() => props.modelValue, (newval, oldval) => {
    currentValue.value = newval;
  });

  watch(currentValue, (newval, oldval) => {
    if (newval == '' || newval - props.min < 0 && props.min != -1) {
      currentValue.value = props.min.value;
    }
  });
  const candel = computed(()=>{
    return  currentValue.value - props.min > 0 || props.min == -1;
  })
  const  canadd = computed(()=>{
    return  currentValue.value - (props.max || 0) < 0 || props.max == 0;
  })
  const emit = defineEmits(['update:modelVlaue']);

  // 输入框失去焦点
  function intoBlur(e) {
    let val = e.target.value;
    let {
      min,
      max
    } = props;
    if (!val) {
      val = min;
    }
    if (val - max > 0) {
      val = max;
    }
    currentValue.value = val;
  }


  // 点击加号
  async function addFun() {
    // console.log(props);
    props.onChangeBefore().then(res => {
      if (currentValue.value - (props.max || 0) < 0 || props.max == 0) {
        currentValue.value = Add(currentValue.value, props.step);
      }
    });
  }
  // 点击减号
  async function delFun() {
    props.onChangeBefore().then(res => {
      // (Num - min > 0 && (Num = Sub(Num, step)))
      if (currentValue.value - props.min > 0 || props.min == -1) {
        currentValue.value = Sub(currentValue.value, props.step);
      }
    }).catch(err => {
      // console.log(err);
    });
  }
</script>

<style scoped>
  .counter-box {
    --height: 88rpx;
    --icon-size: calc(var(--increase-height, var(--height)) - var(--increase-bor-width, 1px) * 2);
    /* 递增递减按钮尺寸 */
    /* height: var(--increase-height, var(--icon-size, auto)); */
    max-width: 100%;
    border-radius: var(--radius, 4px);
    display: flex;
    flex-direction: row;

  }

  .add,
  .del {
    width: var(--icon-size);
    height: var(--icon-size);
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
    background-color: var(--increase-icon-bg, transparent);
  }

  .add::before,
  .add::after,
  .del::before {
    content: '';
    --icon-height: var(--increase-icon-thick, 2rpx);
    --icon-width: calc(var(--icon-size) * var(--increase-rate, 0.35));
    width: var(--icon-width);
    height: var(--icon-height);
    background-color: var(--increase-icon-color, #333);
    position: absolute;
    left: calc((var(--icon-size) - var(--icon-width)) / 2);
    top: calc((var(--icon-size) - var(--icon-height)) / 2);
  }

  .add::after {
    transform-origin: center center;
    transform: rotate(90deg);
  }

  .undel,
  .unadd {
    --increase-icon-color: var(--increase-icon-disable-color, #888);
    pointer-events: none;
    cursor: not-allowed;
  }

  .intobox {
    --input-color: #333;
    --input-font: 28rpx;
    border: var(--increase-input-border);
    border-top: 0;
    border-bottom: 0;
    flex-grow: 1;
    width: 30%;
    flex-shrink: 0;
    font-size: var(--increase-input-font, var(--input-font));
    /*默认28rpx*/
    color: var(--increase-input-color, var(--input-color));
    /*默认#333*/
    box-sizing: border-box;
    position: relative;

  }

  .intobox .place {
    font-size: var(--placeholder-font-size, inherit);
    color: var(--placeholder-color, inherit);
  }

  .intobox view {
    padding: 0 0.5em;
    font-size: inherit;
    inline-size: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .intobox input {
    background-color: var(--increase-input-bg);
    padding: 0 0.5em;
    height: 100%;
    max-width: 100%;
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-weight: var(--increase-input-weight, 400);
    /*   opacity: 0;
        pointer-events: none; */
    /* font-size: inherit; */
    /* color: inherit; */
    z-index: 10;
  }

  /* .intobox input:focus{
        opacity: 1;
        pointer-events: auto;
        color: red;
    } */
</style>
