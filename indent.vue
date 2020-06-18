<template>
  <div class="indent-box" :style="`--size:${indent}em`">
    <span class="float"></span>
    <span class="float float-rg"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
/**
 * indent 缩进盒子
 * @description 监听子元素焦点的组件
 * @tutorial https://www.uviewui.com/components/button.html
 * @example <indent >这是一段文本这是一段文本</indent>
 * @example <indent :indent="3">这是一段文本这是一段文本</indent>
 */
export default {
  name: "indent",
  props: {
    indent: {
      type: [String, Number],
      default: 2
    }
  },
  mounted() {}
};
</script>
<style scoped>
/* .indent-box {
  --size: 2em;
} */
.float {
  float: left;
  width: var(--size);
  height: 1em;
  /* height: 100%;
  transform: rotate(0);
  background-color: red; */
}
.float-rg {
  float: right;
}
</style>
