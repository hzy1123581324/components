<template>
    <view class="join-txt-item" v-for="(item,index) in txtlist" :key="item">
      <template v-if='index!=0'>&nbsp;</template>
      <template class="" v-if="item==''">
        
        <slot name="match"></slot>
        &nbsp;
      </template>
      <template v-else>
        <slot  name="default" :text="item" ></slot>
      </template>
    </view>
</template>

<script setup>
    import {ref,computed} from "vue";
    const props = defineProps({
      modelValue:{
        type: String,
        default: ''
      },
      target: {
        type: String,
        default: '',
        
      }
    })
    
    let txtlist = computed(()=>{
      if(props.modelValue==''){
        return [];
      }else if(props.target==''){
        return [props.modelValue]
      }else{
       console.log(props.modelValue.split(props.target));
        return props.modelValue.split(props.target);
      }
    });
    
    
</script>

<style scoped>
  .join-txt-item{
    display: inline-block;
  }
  .join-txt-item view {
    display: inline-block;
  }
</style>
