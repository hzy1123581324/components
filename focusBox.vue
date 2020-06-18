<template>
  <div
    tabindex="1"
    :class="['focusBox',focusNUm>0&&className]"
    @focusin="focusNUm = 1"
    @focusout="focusNUm = -1"
  >
    <slot></slot>
  </div>
</template>
<script>
/**
 * focusBox 焦点盒子
 * @description 监听子元素焦点的组件
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} className 传入的样式类
 * @example <focus-box></focus-box>
 */
export default {
  name: "focusBox",
  props: {
    className: {
      type: String,
      default: "default_focus"
    }
  },
  data() {
    return {
      focusNUm: -1
    };
  },
  watch: {
    focusNUm() {}
  },
  methods: {},
  computed: {}
};
</script>
<style scoped>
.focusBox {
  transition: border 0.2s ease 0s, color 0.2s ease 0s;
}
.default_focus {
  border-color: var(--color-black);
}
</style>