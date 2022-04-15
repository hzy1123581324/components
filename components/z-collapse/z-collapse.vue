<template>
  <view class="collapse-box">
    <view class="collapse-head" @click="change()">
      <slot name="head" :isopen="currentValue"></slot>
    </view>
    <view :class="['collapse-body',currentValue&&'show']" :style="collapseHeight">
      <view ref="collapse" class="collapse-content clear">
        <slot name="body"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
  // 手风琴
  import {
    ref,
    reactive,
    onMounted,
    computed,
    watch,
    nextTick,
    inject,
    onBeforeMount
  } from "vue";
  import {
    defer
  } from "../../utils/optimize.js";

  onBeforeMount(()=>{
    currentValue.value = props.modelValue;
  })

  let valueMuster = inject('valueMuster',null);
  let showOne = inject('showOne',null);

  /// 记录  ref collapse 元素
  let collapse = ref(null);
  let emit = defineEmits(['update:reload', 'update:modelValue','change']);
  let props = defineProps({
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
  });
  let collapseHeight = computed(() => {
    return `--collapse-height:${clientHeight.value}px;`
  });
  let clientHeight = ref(0);
  let  currentValue = ref(false);
  
  if(valueMuster){
    watch(()=>[...valueMuster],(newval,oldval)=>{
        currentValue.value = newval[props.index.toString()]||false;
    })
  }
  
  watch(()=>props.modelVal,(newval,oldval)=>{
    currentValue.value = newval;
  })
  /// 监听reload 
  watch(() => props.reload, (newval, oldval) => {
    // console.log(newval,'&&&&&&&&&&&&&&');
    if (newval) {
      defer(600).then(() => {
        init();
      })
      defer(800).then(() => {
        emit('update:reload', !newval);
      });
    }
    
  });
  // 监听index 
  // watch(() => props.index, (newval, oldval) => {
  //   // console.log(newval, '99999999++++++');
  // });

  onMounted(() => {
    // console.log(props.index);
    // console.log(valueMuster,'**********');
    defer(200).then(init);

    valueMuster&&(valueMuster[props.index] = currentValue.value);


  });

  /// 初始化
  function init() {
  
    if(collapse.value?.$el){
      clientHeight.value = collapse.value?.$el.clientHeight;
    }else{
      const timer = setInterval(()=>{
        if(collapse.value?.$el){
          clientHeight.value = collapse.value?.$el.clientHeight;
          clearInterval(timer);
        }
      },800);
      
    }
    
    
  }

  /// 监听
  function change() {
    // 需要判断是否使用了collapse-group
    // console.log('@@@@@@@@@@@@@@@')
    if(valueMuster){
      if(showOne){
        // console.log(valueMuster.length,'33333333333333')
        // 不能使用<= 是因为valueMuster的长度会发生改变，导致死循环
        for(let i=0;i<valueMuster.length;i++){
          // console.log(i);
          // console.log(valueMuster.length);
          if(props.index == i){
            valueMuster[props.index] = !valueMuster[props.index];
          }else{
            valueMuster[i]= false;
          }
        }
      }else{
        valueMuster[props.index] = !valueMuster[props.index];
      }
    }else{
      // 有可能没有v-model
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
