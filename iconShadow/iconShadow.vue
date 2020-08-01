<!-- 
这是利用 filter实现改变图标颜色的组件，不支持渐变
 -->
<template>
  <view class="icon-shadow">
    <view class="iconshadowbg"></view>
  </view>
</template>

<script>
export default {
  name: "icon-shadow",

  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
<!-- <style src="./index.css"></style> -->
<style scoped >
.icon-shadow {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.iconshadowbg {
  width: 100%;
  height: 100%;
  /* position: absolute; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  box-sizing: content-box;
  background-image: var(--bg-img);
  -webkit-filter: drop-shadow(var(--shadow-color) var(--width) 0);
  filter: drop-shadow(var(--shadow-color) var(--width) 0);
  border-right: var(--width) solid transparent;
  display: inline-block;
  margin-left: calc(var(--width) / -1);
}
</style>
