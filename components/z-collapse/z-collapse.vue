<template>
  <view class="collapse-box">
    <view class="collapse-head" @click="change()">
      <slot name="head" :isopen="currentValue"></slot>
    </view>
    <view :class="['collapse-body',currentValue&&'show']" :style="collapseHeight">
      <view ref="Collapse" class="collapse-content clear">
        <slot name="body"></slot>
      </view>
    </view>
  </view>
</template>

<script>
  // 手风琴
  import {
    ref,
    reactive,
    computed,
    watch,
    nextTick,
    inject,
    // onUpdated,
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
    onUnmounted,
    watchEffect,
    // activated,
  } from "vue";
  import {
    defer
  } from "../../utils/optimize.js";
  export default {
    name:'collapse',
    props:  {
      // 当内容发生改变是，需要重新
      reload: {
        type: Boolean,
        default: false,
      },
      // 多个collapse需要设置，用于管理，单个不用传值
      index: {
        type: Number,
        default: 0
      },
      modelValue: {
        type: Boolean,
        default: false,
      }
    },
    emits:['update:reload', 'update:modelValue', 'change'],
    setup(props,{emit}){
      let valueMuster = inject('valueMuster', null);
      let showOne = inject('showOne', null);
      
      /// 记录  ref collapse 元素
      let Collapse = ref(null);
      let clientHeight = ref(0);
      let currentValue = ref(false);
      const collapseHeight = computed(() => {
        return `--collapse-height:${clientHeight.value}px;`
      });
      // 初始化初始化初始化初始化初始化
      onBeforeMount(() => {
        currentValue.value = props.modelValue;
        if (valueMuster) {
          valueMuster[props.index] = !!currentValue.value;
        } 
        
      })
      onMounted(()=>{
        defer(400).then(init);
      })
      // onUpdated((data)=>{
      //   //console.log(data,'22222222&&&&&&&&&&&&&&&&');
      // })
      
      // watch(currentValue,(newval,oldval){
      //   if(valueMuster){
      
      //   }
      // })
      
      const stop = watchEffect(() => {
        if (valueMuster) {
          currentValue.value = valueMuster[props.index];
        }
      })
      onBeforeUnmount(() => {
        //console.log('22222222商城删除上都是发斯蒂芬斯蒂芬的手动阿斯顿发斯蒂芬阿萨德阿斯蒂芬手动')
        stop();
      })
      onUnmounted(()=>{
        //console.log('3333333水泥厂了3333333333333333');
      })
      watch(() => props.modelVal, (newval, oldval) => {
        currentValue.value = newval;
      })
      
      watch([() => props.reload,currentValue],(newval,oldval)=>{
        if (newval[0]||(newval[1]&&clientHeight.value==0)) {
          let isnow = newval[1]&&clientHeight.value==0;
          defer(isnow==100?0:600).then(() => {
            init();
          });
          defer(800).then(() => {
            emit('update:reload', false);
          });
        }
      })
      
      /// 初始化
      function init() {
        let num = 0
        if (Collapse.value?.$el) {
          // console.log('init1111111');
          clientHeight.value = Collapse.value?.$el.clientHeight;
        } else {
          
          const timer = setInterval(() => {
            // console.log(Collapse,'**********');
            if (Collapse.value?.$el) {
              // console.log('init+++++++++++');
              clientHeight.value = Collapse.value?.$el.clientHeight;
              clearInterval(timer);
            }
            if(num>30){
              clearInterval(timer);
            }
            num++;
          }, 800);
      
        }
      
      
      }
      
      // / 监听
      function change() {
        // 需要判断是否使用了collapse-group
        // //console.log('@@@@@@@@@@@@@@@')
        if (valueMuster) {
          // 只展开一个
          if (showOne) {
            // //console.log(valueMuster.length,'33333333333333')
            // 不能使用<= 是因为valueMuster的长度会发生改变，导致死循环
            //console.log(valueMuster, '333222223333311111111');
            for (let i = 0; i < valueMuster.length; i++) {
              //console.log(valueMuster, '31111111111111111111111111333333311111111');
              // //console.log(i);
              // //console.log(valueMuster.length);
              if (props.index == i) {
                valueMuster[props.index] = !valueMuster[props.index];
              } else {
                valueMuster[i] = false;
              }
            }
            //console.log(valueMuster, '3333333311111111');
          } else {
            valueMuster[props.index] = !valueMuster[props.index];
          }
        } else{
          currentValue.value = !currentValue.value;
        }
        // 使用了v-model 才会起作用
        emit('update:modelValue', !props.modelValue);
        /// 
        emit('change', {
          clientHeight,
          show: !props.modelValue
        });
        
      }
        return {
          currentValue,
          collapseHeight,
          Collapse,
          change
        }
    }
  }
  


</script>

<style scoped>
  .collapse-box {}

  .collapse-head {
    display: flex;
    flex-direction: row;
    height: var(--collapse-head-height, auto);
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding: var(--collapse-head-pad, 0);
    border: var(--collapse-head-border, unset);
  }

  .collapse-body {
    height: 0;
    transition: all linear 0.3s;
    overflow: hidden;
    box-sizing: border-box;
  }

  .collapse-body.show {
    height: var(--collapse-height);

  }

  .collapse-content {
    padding-bottom: var(--collapse-body-pad-btm);
  }
</style>
