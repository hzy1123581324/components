<template>
  <view class="outer-container">
    <view class="inner-container">
      <view class="content">
        <slot></slot>
      </view>
    </view>
  </view>
</template>
<script>
  import {
    reactive,
    ref,
    onMounted,
    onBeforeUnmount
  } from 'vue';
  export default {
    props: {

    },
    setup() {
      onMounted(() => {
        window.addEventListener("scroll", this.handleScroll, true);
      })
      onBeforeUnmount(() => {
        window.removeEventListener("scroll", this.windowScroll, true);
      })

      function handleScroll(e) {
        const top = e.target.scrollTop;
        if (top > 100) {
          this.flag = false;
        } else {
          this.flag = true;
        }
      }
      return {
        handleScroll
      }
    }
  };
</script>
<style scoped>
  .outer-container {
    width: 200px;
    height: 200px;
  }

  .outer-container {
    border: 5px solid purple;
    position: relative;
    overflow: hidden;
  }

  .inner-container {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .inner-container::-webkit-scrollbar {
    display: none;
  }
</style>
