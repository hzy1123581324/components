<template>
  <view class="w_100">
    <view class="picker-inset" @click="_showBefore">
      <slot :isopen="show"></slot>
    </view>
    <z-popup v-model="show" type="bottom" @close="closeHandler">
      <view class="picker-box" :style="`--current-column:${currentColumn}`">
        <view class="picker-head flex_between_x flex_center_y">
          <!-- 这这个是标题 -->
          <slot name='head'>
              <view class="cancel" @click="currentColumn--" v-if="isPrevious" ><slot name="previous">{{'上一步'}}</slot></view>
              <view class="cancel" @click="closeHandler" v-else><slot name="cancel">{{'取消'}}</slot></view>
              <view class="picker-title"><slot name="title">{{'标题'}}</slot></view>
              <view class="confirm" v-if="!isNext" @click="confirmHandler"><slot name="confirm">{{'确定'}}</slot></view>
              <view class="confirm" v-else @click="currentColumn++;"><slot name="next">{{'下一步'}}</slot></view>
          </slot>
        </view>
        <picker-view class="picker-view" indicator-class="picker-indicator" v-model:value="currentIndex" :style='`--picker-col:${col};--picker-column:${column}`' @change="bindChange" >
          <picker-view-column :class="['picker-column',parentIndex==0&&(rangeData.length>column)&&'picker-column-move']"  v-for="(itemParents,parentIndex) in rangeData" :key="parentIndex" :style="`min-width:${100/column}%;`" @click="currentColumn=parentIndex">
            <view class="picker-item flex flex_center" v-for="(item,index) in itemParents" :key="index" >
              {{getItemText(item)}}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </z-popup>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed,
    watch
  } from "vue";
  import {
    object as teseObject,
  } from "../../utils/test.js";
  import {defer} from "../../utils/optimize.js";
  
  let show = ref(false);

  const props = defineProps({
    onShowbefore: {
      type: Function,
      default: defer
    },
    /// 返回数据
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /// 当前下标
    current: {
      type: Array,
      default: ()=>[0,0]
    },
    /// 要显示的关键字
    rangeKey: {
      type: String,
      default:'name'
    },
    rangeChildrenKey: {
      type: String,
      default:'children'
    },
    /// 传入的数据
    range: {
      type: Array,
      default:()=>{
        return [];
      }
    },
    /// 一屏显示多少个,默认3个
    column:{
      type: Number,
      default: 3
    },
    /// 显示多少行
    col: {
      type: Number,
      default: 5
    },
    /// 外部手动控制显示隐藏
    manualShow: {
      type: Boolean,
      default: false,
    },
    /// 不是一屏展示的，需要手动展示第几列
    manualIndex: {
      type: Number,
      default: 0
    }
    
  });
  
  let currentIndex = reactive([0,0]);
  /// 当前要操作的列
  let currentColumn = ref(0);
  
  let  emit = defineEmits(['change','update:current','update:modelValue','confirm']);
  
  // 监听
  watch(()=>props.current,(newval,oldval)=>{
    currentIndex.length= 0 ;
    currentIndex.push(...newval);
  })
  /// 手动控制显示隐藏
  watch(()=>props.manualShow,(newval,oldval)=>{
    show.value = newval;
  });
  watch(()=>[...currentIndex],(newval,oldval)=>{
    console.log('$$$$$$$$$$1111111111111111');
    console.log(newval);
    console.log(oldval);
  })
  
  /// 手动控制显示的列
  watch(()=>props.manualIndex,(newval,oldval)=>{
    currentColumn.value = newval;
  });
  
  let rangeData= computed(()=>{
    // console.log('@@@@@@@@@@@');
    const arrt = [];
    let  pointer = 0;
    let  pointerList = props.range;
    if(props.range.length==0){
      return []
    }
    while(true){
      arrt[pointer] = pointerList;
      /// 
      pointerList = pointerList[currentIndex[pointer]||0][props.rangeChildrenKey]||[];
      pointer++;
      if(pointerList.length==0){
        break;
      }
    }
    // console.log(arrt);
    // console.log('&&&&&&&&&&&&&&&&&&&');
    // 当数组发生改变时currentColumn有可能超出当前数组的长度
    
    return arrt;
  });
  
  watch(rangeData,(newval,oldval)=>{
    // console.log('!!!!!!!!!!!!!!!!!!');
    if(newval.length-1<currentColumn.vlaue){
      currentColumn.value = newval.length-1;
    }
    if(currentColumn.value+1<= newval.length-1){
      currentColumn.value++;
    }
  });
  
  // true 显示上一步，false 显示取消
  let isPrevious = computed(()=>{
    // console.log(currentColumn.value)
    // console.log(rangeData.value.length,props.column)
    return currentColumn.value!=0&&rangeData.value.length>props.column;
  });
  // true 显示下一步，false 显示确认
  let isNext = computed(()=>{
    return currentColumn.value<rangeData.value.length-1&&rangeData.value.length>props.column
  });
  // 获取item需要显示的文字，判别为对象还是文本
  function getItemText(item) {
    if (teseObject(item)) {
      return item[props.rangeKey]
    } else {
      return item
    }
  }
  
  /// 展示前钩子函数，常用于异步接口调用数据
  function _showBefore(){
    props.onShowbefore().then(res=>{
      show.value = !show.value;
    })
  }
  
  function bindChange(e){
    // console.log(e);
    
    currentIndex.length=0;
    // console.log(e.detail.value);
    e.detail.value[currentColumn.value+1] = 0;
    // console.log(JSON.stringify(e.detail.value));
    currentIndex.push(...e.detail.value);
    // console.log(currentIndex);
    // emit('change', [])
    // console.log("$$$$$$$$");
  }
  
  /// 点击了取消按钮
  function closeHandler(){
    emit('confirm', '')
   
    show.value = false;
  }
  /// 点击了确认按钮
  function confirmHandler(){
    show.value = false;
    emit('confirm', '')
  }
  
</script>

<style lang="scss" scoped>
  // 嵌入式
  .picker-inset{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
  }
  // picker 最外层
  .picker-box{
    background-color: var(--picker-bg, #fff);
    border-radius: var(--picker-radius, 0);
    overflow: var(--picker-overflow, hidden);
    --height: 98rpx;
  }
  .picker-view{
    
    height: calc( var(--picker-col) * var(--picker-item-height,var(--height)) ) ;
  }
  .picker-head{
    --pad: 0 30rpx;
    --border: 1rpx solid var(--border-color,currentColor);
    height: var(--picker-head-height,var(--height));
    min-height: var(--picker-head-min-height,unset);
    padding: var(--picker-head-pad,var(--pad));
    border-bottom: var(--picker-border,var(--border));
    border-top: var(--picker-border);
    box-sizing: content-box;
  }
  .cancel{
    min-width: 5em;
  }
  .confirm{
    text-align: right;
    min-width: 5em;
  }
  .picker-indicator{
    height: var(--picker-indicator-height,var(--height));
  }
  .picker-column{
    transition: all ease-in-out 0.5s 0s;
  }
  .picker-column-move{
    margin-left: calc( -100% * var(--current-column) / var(--picker-column));
  }
  
</style>
<style>
</style>