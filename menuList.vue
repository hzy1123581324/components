<template>
  <div class="menu-box">
    <focus-box class="menu-content" class-name="active">
      <slot name="content"></slot>
    </focus-box>
    <ul class="menu-list">
      <li class="menu-item" v-for="item in list" :key="item">
        <slot>{{item.text}}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * menu-list 下拉框
 * @description 下拉框列表
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} direction 下拉框弹出方向
 * @event {Function} OptionsChange 点击选择那一项，并且向外抛出$emit OptionsChange方法
 * @example <menu-list :list="list"><img src=""/></menu-list>
 * @example <menu-list :list="list" @optionsChange="change"></menu-list>
 */

import focusBox from "@components/components_hzy/focusBox";

export default {
  name: "menuList",
  props: {
    list: {
      type: Array
    },
    direction: {
      type: String,
      default: "bottom/right"
    }
  },
  components: {
    focusBox
  },
  computed: {},
  data() {
    return {
      menuShow: false
    };
  },
  mounted() {},
  watch: {
    menuShow(newval) {
      if (newval) {
        //   document.addEventListener("click", e => {
        //     // console.log(e,"**************************");
        //     if (e.target.className != "menu-content-default") {
        //       this.menuShow = false;
        //     } else {
        //       this.menuShow = true;
        //     }
        //   },false);
        // } else {
        //   document.removeEventListener("click",()=>{// console.log('&&&&&&&&&&&&&&')},false);
      }
    }
  },
  destroyed() {},
  methods: {
    OptionsChange(index) {
      const item = this.list[index];
      this.menuShow = !this.menuShow;
      this.$emit("optionsChange", item);
    }
  }
};
</script>

<style scoped>
.menu-box {
  position: relative;
}
.menu-content {
  display: inline-block;
  height: 100%;
  width: 100%;
}
.menu-list {
  pointer-events: none;
  opacity: 0;
  transition: var(--transition-all);
}
.menu-content.active + .menu-list {
  pointer-events: auto;
  opacity: 1;
}

.menu-list {
  box-shadow: var(--shadow-medium);
  cursor: default;
  opacity: 0;
  border-radius: 5px;
  list-style: none;
  overflow: hidden;
  transition: all 0.2s ease 0s;
  min-width: 150px;
  background-color: #fff;
}
.menu-content:focus + .menu-list-box,
.menu-content:active + .menu-list-box {
  opacity: 1;
  pointer-events: auto;
}
.menu-list.active,
.menu-list:focus {
  opacity: 1;
}
.menu-item {
  color: #444;
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 40px;
  white-space: nowrap;
  width: 100%;
  user-select: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: flex-start;
  margin: 0px;
  outline: 0px;
  border-bottom: 1px solid var(--border-color);
  padding: 0 12px;
}
.menu-item:not(.disable):hover,
.menu-item:not(.disable).hover {
  cursor: pointer;
  background-color: var(--hover-bg);
}
.menu-item.disable {
  cursor: not-allowed;
  color: #eaeaea;
  pointer-events: none;
}
</style>
