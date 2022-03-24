<template>
  <!-- 添加这层是因为在组件直接加class失效 -->
  <view class="w_100">
    <view class="picker-inset" @click="_handlBefore">
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
    nextTick,
    isReactive,
    watch
  } from "vue";
  import {
    isObject,
  } from "../../utils/test.js";
  import {defer,debounce} from "../../utils/optimize.js";
  
  let show = ref(false);
  
  const props = defineProps({
    /// 展开组件前钩子函数
    onShowbefore: {
      type: Function,
      default: defer
    },
    /// 关闭组件前钩子函数
    onClosebefore: {
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
      default: ()=>[]
    },
    /// 要显示的关键字
    rangeKey: {
      type: String,
      default:'name'
    },
    /// 二级数组关键字
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
    // 注意需要使用v-model:manualIndex才会改变
    manualIndex: {
      type: Number,
      default: 0
    }
    
  });
  
  let currentIndex = reactive([]);
  /// 当前要操作的列
  let currentColumn = ref(0);
  
  let  emit = defineEmits(['change','update:manualShow','update:current','update:modelValue','update:manualIndex','confirm','cancel']);
  
  // 监听
  watch(()=>[...props.current],(newval,oldval)=>{
    console.log(newval,'77777777777777777777777777');
    currentIndex.length= 0 ;
    console.log(isReactive(currentIndex));
    console.log(currentIndex);
    currentIndex.push(...newval);
    console.log(currentIndex);
  })
  // watch(()=>[...currentIndex],(newval,oldval)=>{
    
  //   console.log(currentIndex);
  //   console.log('见阿斯顿发科技阿楼上的咖啡机阿楼上的咖啡机阿拉士大夫');
  //   console.log(currentIndex);
  //   // emit('update:current',currentIndex.value)
  // })
  
  watch(show,(newval,oldval)=>{
   emit("update:manualShow",newval)
    // emit('update:current',currentIndex.value)
  })
  /// 手动控制显示隐藏
  watch(()=>props.manualShow,(newval,oldval)=>{
    show.value = newval;
  });
  
  // watch(()=>[...currentIndex],(newval,oldval)=>{
  //   // console.log('$$$$$$$$$$1111111111111111');
  //   // console.log(newval);
  //   // console.log(oldval);
  // })
  
  /// 手动控制显示的列
  watch(()=>props.manualIndex,(newval,oldval)=>{
    // console.log('manualIndex',newval);
    currentColumn.value = newval;
  });
  
  
  watch(currentColumn,(newval,oldval)=>{
    // console.log('currentColumn',newval);
    emit('update:manualIndex',newval)
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
      currentIndex[currentColumn.value] = 0;
    }
  });
  
  // true 显示上一步，false 显示取消
  let isPrevious = computed(()=>{
    return currentColumn.value!=0&&rangeData.value.length>props.column;
  });
  // true 显示下一步，false 显示确认
  let isNext = computed(()=>{
    return currentColumn.value<rangeData.value.length-1&&rangeData.value.length>props.column
  });
  
  function exportData(){
    let arrt = [];
    for(let i=0;i<rangeData.value.length;i++){
      // console.log(i);
      arrt.push(
      {
        index: currentIndex[i]||0,
        data:{...rangeData.value[i][currentIndex[i]||0]} 
      })
    }
    return arrt;
  }
  // 获取item需要显示的文字，判别为对象还是文本
  function getItemText(item) {
    if (isObject(item)) {
      return item[props.rangeKey]
    } else {
      return item
    }
  }
  
  /// 展示前钩子函数，常用于异步接口调用数据
  function _handlBefore(){
    if(show.value){
      return props.onClosebefore().then(res=>{
        show.value = false;
      })
    }else{
      return props.onShowbefore().then(res=>{
        show.value = true;
      })
    }
  }
  
  function bindChange(e){
    // console.log(e);
    // console.log('###################');
    currentIndex.length=0;
    // console.log(currentIndex);
    // console.log(e.detail.value);
    // e.detail.value[currentColumn.value+1] = 0;
    // console.log(JSON.stringify(e.detail.value));
    currentIndex.push(...e.detail.value);
    // console.log(currentIndex);
    // debounce(()=>{
    setTimeout(()=>{
      currentIndex[1] = 6;
    },2000)
    console.log(currentIndex.value);
    // emit('update:current',currentIndex);
    // },500)
    emit('change', [])
    // console.log("$$$$$$$$");
  }
  
  /// 点击了取消按钮
  function closeHandler(){
    emit('cancel', '')
   
    _handlBefore()
  }
  /// 点击了确认按钮
  function confirmHandler(){
    emit('confirm', exportData())
    _handlBefore()
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