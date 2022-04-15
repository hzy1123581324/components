<template>
    <view class="join-txt-item" v-for="(item,index) in txtlist" :key="item+index">
      <template class="" v-if="item==target">
        <slot name="match" :text="item"></slot>
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
        const reg = new RegExp('/'+props.target+'/','gi')
        return props.modelValue.replace(reg,','+props.target+',').replace(/^,+|,+$/g,'').replace(/,+/g,',');
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
