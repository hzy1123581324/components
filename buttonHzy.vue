<template>
  <button :class="['btn-default',hoverClass,'btn-'+size]">
    <slot></slot>
  </button>
</template>
<script>
/**
 * buttonHzy 按钮
 * @description 这是一个按钮
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} hoverClass 鼠标移入的样式类
 * @example <button-hzy></button-hzy>
 */
export default {
  name: "buttonHzy",
  props: {
    hoverClass: {
      type: String,
      default: "default-hover"
    },
    size: {
      type: String,
      default: "middle",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["large", "middle", "small"].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: "",
      validator: function(value) {
        return [""].indexOf(value) !== 1;
      }
    }
  },
  data() {
    return {};
  },
  watch: {
    focusNUm() {}
  },
  methods: {},
  computed: {}
};
</script>
<style scoped>
.btn-default {
  --pad: 10px;
  --btn-display: inline-flex;
  --btn-border: var(--btn-border-width) solid var(--btn-color);
  --btn-color: var(--color-main);
  --color: var(--btn-color);
  --bg: var(--btn-bg);
  --bgdisplay: var(--btn-display);
  padding-left: var(--pad);
  padding-right: var(--pad);
  height: var(--btn-height);
  min-height: var(--btn-min-height);
  min-width: var(--btn-min-width);
  background-color: var(--bg);
  border-radius: var(--btn-radius);
  box-shadow: var(--btn-shadow);
  transition: var(--btn-transition);
  color: var(--color);
  border: var(--btn-border);
  line-height: calc(var(--height) - 2 * var(--btn-border-width));
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
/* 鼠标悬浮 */
.default-hover {
}
/* 尺寸 */
.btn-large {
  --btn-min-height: 0;
  --btn-min-width: 0;
}
.btn-middle {
}
.btn-small {
}
/* 类型 */
.btn-fill {
}
.btn-fill:hover {
  --bg: var(--btn-color);
  --color: var(--btn-bg);
}
</style>