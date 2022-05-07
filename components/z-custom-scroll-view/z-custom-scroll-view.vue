<template>

  <view class="scroll-head">
    <slot name="head"></slot>
  </view>
  <scroll-view class="scroll-big-box grow—full shrink" :scroll-with-animation="false" scroll-y="true" :scroll-top="scrollTop"
    @scroll="throttleFun" @scrolltolower="scrolltolower">
    <view class="expand-box" v-if="expanded>0">
      <slot name="expand" :percentage="percentage"></slot>
    </view>
    <view class="grow">
      <slot></slot>
    </view>
    <!-- 通常固定在右下角，用于返回 -->
    <!-- <teleport to="body"> -->
    <view
      :class="['scroll-fixed',(!fixedShow)&&'scroll-fixed-disable']"
      @click="onTapScrollFixed">
      <slot name="fixed"></slot>
    </view>
    <!-- </teleport> -->


  </scroll-view>
  <view class="scroll-footer">
    <slot name="footer"></slot>
  </view>

</template>

<script>
  import {
    ref,
    reactive,
    nextTick,
    watch,
    computed
  } from 'vue';
  import {
    debounce,
  } from "../../utils/optimize.js";
  /**
   * @description 伸缩滚动盒子
   * @property {Number}  fixed  滑动到多长距离显示， -1 永远不显示
   * @property {Boolean} scrollHide = [true,false]  是否在滑动中隐藏 默认是true
   * @property {Boolean} goTop = [true,false]  是否要返回到顶部 默认是false
   * @property {Boolean} scrollHide = [true,false]  是否在滑动中隐藏 默认是true
   * @property {Number} expanded 伸缩的距离
   * @example 
   * <z-custom-scroll-view v-model:goTop="goTop"></z-custom-scroll-view>
   * @example 
   * <z-custom-scroll-view :scrollHide="scrollHide"></z-custom-scroll-view>
   */
  export default {
    emits: ['scrolltolower', 'tapScrollFixed', 'update:goTop'],
    props: {
      /// 伸缩的距离
      expanded: {
        type: Number,
        default: 1,
      },
      // 滑动多少显示
      fixed: {
        type: Number,
        default: -1
      },
      // 是否滑动隐藏
      scrollHide:{
        type: Boolean,
        default: true,
      },
      // 是否要返回到顶部
      goTop: {
        type: Boolean,
        default: false
      }

    },
    setup(props, {
      emit
    }) {
      let scrollTop = ref(0);
      let percentage = ref(0);
      let cacheScrollTop = ref(0);
      const scrollStateMap = {
        scroll: 'scroll',
        stop: 'stop',
      }
      let scrollState = ref(scrollStateMap.stop);
      if(Object.freeze){
        Object.freeze(scrollStateMap)
      }
      // 是否显示固定定位元素
      let  fixedShow = computed(()=>{
        if(props.fixed==-1){
          return false;
        }
        if(scrollState.value == scrollStateMap.scroll && props.scrollHide){
          return false;
        }
        console.log(scrollState.value);
        if(cacheScrollTop.value >= props.fixed){
          return true;
        }
        return false;
      });
      let  scrolldebounce = debounce(()=>{
        scrollState.value = scrollStateMap.stop;
        scrollTop.value = cacheScrollTop.value;
      },500)
      
      // console.log(props,'8888888888888888888')
      function throttleFun(e) {
        // console.log(e.detail, '4444444444');
        // event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
        if (e.detail.scrollTop <= 0) {
          percentage.value = 0;
        }
        if (props.expanded <= e.detail.scrollTop || props.expanded == 0) {
          percentage.value = 1;
        } else {
          percentage.value = e.detail.scrollTop / props.expanded;
        }
        
        cacheScrollTop.value = e.detail.scrollTop;
        scrollState.value = scrollStateMap.scroll;
        scrolldebounce();
      }
      // 上拉加载更多
      function scrolltolower() {
        emit('scrolltolower');
      }

      /// 点击了滚动固定元素
      function onTapScrollFixed() {
        emit('tapScrollFixed', );
      }

      watch(() =>props.goTop,(newval, oldval) => {
        // console.log('444444444444444444');
        scrollTop.value = 0;
        emit('update:goTop', false);
        // setTimeout('update:goTop', false);
      })
      
      return {
        throttleFun,
        scrolltolower,
        percentage,
        onTapScrollFixed,
        scrollTop,
        fixedShow,
      }
    }
  }
</script>

<style scoped>
  .scroll-big-box {
    position: relative;
    flex-grow: 1;
    height: 50vh;
  }

  .scroll-fixed {
    position: fixed;
    top: var(--custom-scroll-fixed-top, unset);
    left: var(--custom-scroll-fixed-lf, unset);
    bottom: var(--custom-scroll-fixed-btm, unset);
    right: var(--custom-scroll-fixed-rg, unset);
    opacity: var(--custom-scroll-fixed-opacity, 1);
    transition: all ease-in-out 0.3s 0s;
    z-index: var(--scroll-fixed-index, 90);
  }

  .scroll-fixed-disable {
    top: var(--custom-scroll-fixed-disabel-top, var(--custom-scroll-fixed-top, unset));
    left: var(--custom-scroll-fixed-disabel-lf, var(--custom-scroll-fixed-lf, unset));
    bottom: var(--custom-scroll-fixed-disabel-btm, var(--custom-scroll-fixed-btm, unset));
    right: var(--custom-scroll-fixed-disabel-rg, var(--custom-scroll-fixed-rg, unset));
    opacity: var(--custom-scroll-fixed-disabel-opacity, 0);
    pointer-events: none;
  }
</style>
