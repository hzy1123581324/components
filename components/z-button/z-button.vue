<template>
  <view :class="['button-box',plain&&'plain',shape,disable&&'disable']" @click="buttonClick($event)">
    <z-loading class="mar-rg-20" mode="flower" v-if="isLoading" ></z-loading>
    <slot></slot>
    <!-- 特殊功能，仅button能触发 -->
    <button type="default" v-if="false"></button>
    <!-- 水波效果 -->
    <view v-if="ripple" class="wave-ripple" :class="[waveActive ? 'wave-active' : '']" :style="rippleStyle"></view>
  </view>
</template>

<script setup>
  // import onClickBefore from '../onClickBefore/onClickBefore.vue';
  /**
   * PopUp 按钮组件
   * @description 适用各种场景的按钮
   * @tutorial https://ext.dcloud.net.cn/plugin?id=329
   * @property {String} type = [default|navigation] 按钮类型
   *     @value default 默认按钮，没有其他功能
   *     @value navigation 路由按钮功能跟 navigation 一样
   * @property {String} shape = [square|circle] 按钮类型
   *      @value square 默认圆角
   *      @value circle 两边为半圆
   * @property {Boolean} ripple 是否开启点击水波纹效果 默认开启
   * @property {Boolean} plain 是否镂空 默认不镂空 
   * @property {Boolean} disable 是否禁用，默认不禁用 
   * @property {Function } onClickBefore 仿重复点击事件，传入一个方法 
   * @property {Boolean} animation = [ture|false] 是否开启动画
   * @property {String,Nubmer} stayTime  接口调用后必须等待多少时间才可点击
   * @property {String,Nubmer} outTime 超出时间，后可以点击
   * @example <z-button class="button"></z-button>
     <style>
         .button{
            --btn-height: 按钮高度 默认 84rpx
            --btn-bor-width: 边框宽度 默认2rpx
            --btn-bor-color: 边框颜色 默认 当前字体颜色
            --btn-color  按钮字体颜色 默认#333
            --btn-bg: 按钮背景色  默认red
            --btn-img:  一般用于设置渐变色
            --btn-disable-bg 按钮禁用背景色  默认颜色不变
            --btn-disable-color 按钮禁用字体颜色 默认#fff
            --btn-disable-opacity 按钮禁用透明度 默认1
            --btn-disable-bor-color
            --btn-font-size: 字体大小 默认32rpx
            --btn-font-weight: 字重   默认600
            --btn-radius: 圆角，8rpx
         }
         
     </style>
   
   */
  import {
    ref,
    computed,
    nextTick,
    getCurrentInstance
  } from "vue";
  import {defer} from "../../utils/optimize.js";
  import {getElQuery} from "../../composition/public.js";
  const { proxy } = getCurrentInstance();
  const props = defineProps({
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: 'square',
      validator(value){
        // 这个值必须匹配下列字符串中的一个
        return ['square', 'circle'].indexOf(value) !== -1
      }
    },
    // 按钮是否镂空，false不镂空， true镂空
    plain: {
      type: Boolean,
      default: false
    },
    
    
    // 是否禁用
    disable: {
      type: Boolean,
      default: false,
    },
    // 是否开启水波纹效果
    ripple: {
      type: Boolean,
      default: true
    },
    // 点击类型
    type: {
      type: String,
      default: 'default',
    },
    // 点击前调用，常用于调用接口
    onClickBefore: {
      type: Function,
      default: defer
    },
    onClickBeforeModifiers: {
      default: () => ({
        once: false,
        stayTime: 400,
        // outTime: 1500,
      }),
    },
    
    // 当异步时是否显示加载中
    showloading: {
      type: Boolean,
      default: false,
    },
    // // 接口调用后必须等待多少时间才可点击
    // stayTime: {
    //   type: [Number, String],
    //   // default: 0,
    // },
    // // 超出时间，后可以点击
    // outTime: {
    //   type: [Number, String],
    //   // default: 3000,
    // },

  });
  
  const emit = defineEmits(['click','clickEnd']);


  const rippleStyle = computed(() => {
    
    return `--btn-ripple-top:${rippleTop.value}px;
            --btn-ripple-left:${rippleLeft.value}px;
            --btn-ripple-size:${targetWidth.value}px;`
  });
  let rippleTop = ref(0); // 水波纹的起点Y坐标到按钮上边界的距离
  let rippleLeft = ref(0); // 水波纹起点X坐标到按钮左边界的距离
  let targetWidth = ref(0); // 波纹按钮节点信息
  let waveActive = ref(false); // 激活水波纹
  let isLoading = ref(false);
  let isclick = false;

  const isOnce =computed(()=>{
    return props.onClickBeforeModifiers.once;
  })
  const stayTime = computed(()=>{
    const stayTimeKeyList = Object.keys(props.onClickBeforeModifiers).filter(item=> item.indexOf('stayTime')>-1)
    if(stayTimeKeyList.length>0){
      let [,stayTime=500] = stayTimeKeyList[0].split('_');
      return stayTime;
    }else{
      return 0;
    }
  });

  async function buttonClick(e) {
   
    
    // 如果是加载中或者禁用，直接退出
    if(isLoading.value||props.disabled){
      return ;
    }
    // 是否开启水波纹效果
    if (props.ripple) {
      // 每次点击时，移除上一次的类，再次添加，才能触发动画效果
      waveActive.value = false;
      nextTick(() => {
        getWaveQuery(e);
      });
    }
    if(props.showloading){
      isLoading.value = true
    }
    if(isclick){
      return ;
    }
    isclick = true;
    await props.onClickBefore();
    // v-model:onClickBefore.once // 一定要加v-model 才能拿到once
    console.warn('一定要加v-model 才能拿到once');
    console.log(props.onClickBeforeModifiers,'8888888888888888')
    if(isOnce.value){
      isclick = true;
    }
    console.log(stayTime.value)
    if(stayTime.value>0){
      setTimeout(()=>{
        isclick = false;
      },stayTime.value);
    }
  
    if(props.showloading){
      isLoading.value = false
    }
    emit('click');
  }
  // 查询按钮的节点信息
  function getWaveQuery(e) {
    // console.log('&&&&&&');
    // console.log(getElQuery('.button-box'));
    getElQuery('.button-box',proxy).then(res => {
      // 查询返回的是一个数组节点
      // console.log(res,e);
      let data = res[0];
      // 查询不到节点信息，不操作
      if (!data.width || !data.width) return;
      // 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
      // 最终的方形（变换后的圆形）才能覆盖整个按钮
      data.targetWidth = data.height > data.width ? data.height : data.width;
      if (!data.targetWidth) return;
      targetWidth.value = data.targetWidth;
      let touchesX = '',
        touchesY = '';
      // #ifdef MP-BAIDU
      touchesX = e.changedTouches[0].clientX;
      touchesY = e.changedTouches[0].clientY;
      // #endif
      // #ifdef MP-ALIPAY
      touchesX = e.detail.clientX;
      touchesY = e.detail.clientY;
      // #endif
      // #ifndef MP-BAIDU || MP-ALIPAY
      touchesX = e.touches[0].clientX;
      touchesY = e.touches[0].clientY;
      // #endif
      // 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
      // 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
      // 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
      // 使用data.left/data.top 计算，当有多少按钮时有样式错乱问题
      rippleTop.value = touchesY - data.top - data.targetWidth / 2;
      rippleLeft.value = touchesX - data.left - data.targetWidth / 2;
      // rippleLeft.value = touchesX - e.target.offsetLeft - data.targetWidth / 2;
      nextTick(() => {
        waveActive.value = true;
      });
    });
  }


</script>

<style scoped>
  /* 默认不镂空，8圆角，白色字体 */
  .button-box {
    /* 很操蛋var默认值rpx转不过来 */
    --height: 84rpx;
    --bor-width: 2rpx;
    --bor: 1rpx solid currentColor;
    --font-size: 32rpx;
    --calc-radius: calc(var(--btn-height, var(--height)) / 2);
    display: var(--display, block);
    /* line-height: calc(var(--btn-height,var(--height)) - 2 * var(--btn-bor-width,var(--bor-width))); */
    display: flex;
    align-items: center;
    height: var(--btn-height, var(--height));
    border: var(--btn-bor, var(--bor));
    text-align: center;
    justify-content: center;
    font-weight: var(--btn-font-weight, 600);
    font-size: var(--btn-font-size, var(--font-size));
    color: var(--btn-color, #fff);
    letter-spacing: var(--btn-letter-spacing,0);
    padding: 0 0.5em;
    border-radius: var(--btn-radius, var(--radius, var(--calc-radius)));
    /*默认是半圆*/
    background-image: var(--btn-img);
    background-color: var(--btn-bg, var(--theme, red));

    pointer-events: auto;
    box-sizing: var(--btn-box-sizing, border-box);
    position: relative;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    flex-shrink: 0;
  }

  .square {
    --square-radius: 8rpx;
    border-radius: var(--btn-radius, var(--radius, var(--square-radius)));
  }

  .button-box.plain {
    background-color: transparent;
    color: var(--btn-color, #333);
    /* border: var(--btn-bor-width,2rpx) solid currentColor; */
    /* border: 2rpx solid currentColor; */
  }

  .button-box.disable {
    background-color: var(--btn-disable-bg, var(--btn-bg));
    color: var(--btn-disable-color, var(--btn-color, #fff));
    opacity: var(--btn-disable-opacity, 1);
    border-color: var(--btn-disable-bor-color);
    pointer-events: none;
  }

  .wave-ripple {
    z-index: 0;
    position: absolute;
    border-radius: 100%;
    background-clip: padding-box;
    pointer-events: none;
    user-select: none;
    transform: scale(0);
    opacity: 1;
    transform-origin: center;
    top: var(--btn-ripple-top, 0);
    left: var(--btn-ripple-left, 0);
    width: var(--btn-ripple-size, 0);
    height: var(--btn-ripple-size, 0);
    background-color: var(--btn-ripple-bg-color, rgba(0, 0, 0, 0.15))
  }

  .wave-ripple.wave-active {
    opacity: 0;
    transform: scale(2);
    transition: opacity 1s linear, transform 0.4s linear;
  }
</style>
