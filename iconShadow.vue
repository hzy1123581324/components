<template>
  <div class="icon-shadow">
    <div class="iconshadowbg"></div>
  </div>
</template>

<script>
/**
 * iconShadow 焦点盒子
 * @description 监听子元素焦点的组件
 * @tutorial https://www.uviewui.com/components/button.html
 * @example <icon-shadow class="logo-img"></icon-shadow>
 * <style>
 *.logo-img {
  width: 1.58rem;
  height: 0.54rem;
  --width: 1.58rem;
  --bg-img: url("../assets/images/logo.png");
  --shadow-color: #fff;
  }
 * </style>
 */
export default {
  name: "icon-shadow"
};
</script>
<style scoped >
.icon-shadow {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.iconshadowbg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  box-sizing: content-box;
  background-image: var(--bg-img);
  -webkit-filter: drop-shadow(var(--shadow-color) var(--width) 0);
  filter: drop-shadow(var(--shadow-color) var(--width) 0);
  border-right: var(--width) solid transparent;
  display: inline-block;
  transform: translateX(-50%);
}
</style>
