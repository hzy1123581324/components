<template>
  <div class="waterfall-box flex">
    <div class="items-box" v-for="items in columnList" :key="items">
      <div class="item-box" v-for="item in items" :key="item.id" @click="jump(item.id)">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * waterfall 瀑布流组件
 * @description 瀑布流组件
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String,Number} column 例数
 * @property {Array} list 要展示数据
 * @example
 * <waterfall :list='list' :column="column">
 *
 * </waterfall>
 */

export default {
  name: "waterfall",
  props: {
    column: {
      type: [String, Number],
      default: 2
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {},
  computed: {
    columnList() {
      let _list = [];
      let column = this.column;
      let list = this.list || [];
      for (let i = 0; i < list.length; i++) {
        _list[i % column] || (_list[i % column] = []);
        _list[i % column].push(list[i]);
      }

      return _list;
    }
  },
  data() {
    return {};
  },

  mounted() {},
  watch: {},
  destroyed() {},
  methods: {}
};
</script>

<style scoped>
</style>
