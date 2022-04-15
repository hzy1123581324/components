<template>

  <view class="scroll-head">
    <slot name="head"></slot>
  </view>
  <scroll-view class="scroll-big-box grow—full" scroll-y="true" @scroll="throttleFun" @scrolltolower="scrolltolower">

    <view class="expand-box" v-if="expanded>0">
      <slot name="expand" :percentage="percentage"></slot>
    </view>
    <view class="grow">
      <slot></slot>
    </view>
    <!-- 通常固定在右下角，用于返回 -->
    <!-- <teleport to="body"> -->
      <view
        :class="['scroll-fixed',(!showFixed)?'scroll-fixed-disable':fixed==0?'':fixedPercentage!=1?'scroll-fixed-disable':'']"
        @click="onTapScrollFixed">
        <slot name="fixed" :percentage="fixedPercentage"></slot>
      </view>
    <!-- </teleport> -->
   

  </scroll-view>
  <view class="scroll-footer">
    <slot name="footer"></slot>
  </view>

</template>

<script setup>
  // 伸缩滚动盒子
  import {
    ref,
    reactive,
    nextTick
  } from 'vue';
  import {
    throttle
  } from "../../utils/optimize.js";
  const props = defineProps({
    /// 
    expanded: {
      type: Number,
      default: 1,
    },
    // 滑动多少显示
    fixed: {
      type: Number,
      default: 0
    },
    showFixed: {
      type: Boolean,
      default: false
    },

  });
  let scrollTop = ref(0);
  const emit = defineEmits(['tapScrollFixed','scrolltolower']);

  let percentage = ref(0);
  let fixedPercentage = ref(0);

  function throttleFun(e) {
    // console.log(e.detail, '4444444444');
    // event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
    if (e.detail.scrollTop <= 0) {
      percentage.value = 0;
      fixedPercentage.value = 0;
    }
    if (props.expanded <= e.detail.scrollTop || props.expanded == 0) {
      percentage.value = 1;
    } else {
      percentage.value = e.detail.scrollTop / props.expanded;
    }
    if (props.fixed <= e.detail.scrollTop || props.fixed == 0) {
      fixedPercentage.value = 1;
    } else {
      fixedPercentage.value = e.detail.scrollTop / props.fixed;
    }

    nextTick(() => {
      scrollTop.value = e.detail.scrollTop;
    });
  }
  // 上拉加载更多
  function scrolltolower(){
    emit('scrolltolower');
  }

  /// 点击了滚动固定元素
  function onTapScrollFixed() {
    emit('tapScrollFixed', );
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
    z-index: var(--scroll-fixed-index,90);
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
