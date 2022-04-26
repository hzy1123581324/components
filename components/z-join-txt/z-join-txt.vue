<template>
    <view  class="join-txt-item" v-for="(item,index) in txtlist" :key="item+index">
      <template v-if="item.toLowerCase()==target.toLowerCase()">
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
        // const reg = new RegExp('/'+props.target+'/','gi');
        // console.log(props.modelValue.replace(reg,','+props.target+',').replace(/^,+|,+$/g,'').replace(/,+/g,','));
        // return props.modelValue.replace(reg,'@@'+props.target+'@@').replace(/^(@@)+|(@@)+$/g,'').replace(/@@+/g,',').split('');
        let template = props.modelValue.toLowerCase();// 转换小写
        let target = props.target.toLowerCase();// 转换小写
        const list = [];
        let pointer = 0;
        console.log(props.modelValue,'*****************')
        while(true){
         
          let nextPointer = template.indexOf(target,pointer);
          // console.log(pointer,nextPointer,'777777&&&&&&&&&');
          if(nextPointer!=-1){
            list.push(props.modelValue.slice(pointer, nextPointer));
            list.push(props.modelValue.slice(nextPointer,target.length + nextPointer));
          }else if(nextPointer==-1){
            list.push(props.modelValue.slice(pointer));
            break
          }
          pointer = nextPointer+target.length;
          
        }
        return list;
      }
    });
    
    
</script>

<style scoped>
  .join-txt-item{
    display: inline-block;
    vertical-align: top;
    white-space : nowrap;
    
  }
</style>
