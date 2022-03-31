<template>
    <view class="z-form-box">
        <slot></slot>
    </view>
</template>

<script setup>
    import {ref,reactive,provide,watch,computed} from "vue";
    import {isObject,isArray} from '../../utils/test.js';
    const emit = defineEmits(['update:modelValue'])
    const props = defineProps({
      modelValue: {
        type: Object,
        default: {}
      },
      rules: {
        type: [Object,Array],
        default: {}
      }
    })
    const formValue = reactive({});
    watch(()=>formValue,(newval,oldval)=>{
      Object.assign(props.modelValue,newval);
      // 返回处理
      console.log('formValue发生改变');
      emit('update:modelValue',props.modelValue);
    },{ deep: true });
    watch(()=>props.modelValue,(newval,oldval)=>{
      Object.assign(formValue,newval);
      console.log('props.modelValue+++改变了');
    },{ deep: true });
    
    
    // 验证结果
    const verification = computed(()=>{
      return {}
    });
    provide("formValue",formValue);
    provide("rules",props.rules);
    provide("verification",verification);
    
    
</script>

<style scoped>
</style>
