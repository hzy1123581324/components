<template>
  <view class="collapse-group-box">
    <slot></slot>
  </view>
</template>

<script>
  import {
    ref,
    reactive,
    provide,
    getCurrentInstance,
    watch
  } from "vue";
  export default {
    props: {
      // 数组[fase,true,true,false]
      modelValue: {
        type: Array,
        default: () => {
          return [];
        }
      },
      // 是否只展示一个
      showOne: {
        type: Boolean,
        default: true
      }
    },
    setup(props, {
      emit
    }) {
      let value = reactive([]);

      // 上下文
      // const { proxy } = getCurrentInstance();

      watch(() => props.modelValue, (newval, oldval) => {
        value = newval;
        value.length = 0;
        value.push(...newval);
      })
      watch(() => [...value], (newval, oldval) => {
        // console.log('group++++++++++++');
        // console.log(oldval);
        // console.log(newval);
      })
      provide("valueMuster", value);
      provide("showOne", props.showOne);
      
    }
  }
</script>

<style scoped>
</style>
