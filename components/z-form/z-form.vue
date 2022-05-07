<template>
  <view class="z-form-box">
    <slot></slot>
  </view>
</template>

<script >
  
  import Schema from "../../utils/validator.js";
  // 去除警告信息
  Schema.warning = function() {};
  import {
    ref,
    reactive,
    provide,
    watch,
    computed,
    nextTick,
    onBeforeMount,
  } from "vue";
  
  export default {
    props: {
      modelValue: {
        type: Object,
        default: {}
      },
    
      rules: {
        type: [Object, Array],
        default: {}
      }
    },
    setup(props, {expose,emit}){
      const formValue = reactive({});
      const verificationResults = reactive({})
      // 内部input 修改
      watch(() => formValue, (newval, oldval) => {
        Object.assign(props.modelValue, newval);
        // 返回处理
        // console.log('formValue发生改变', newval);
        emit('update:modelValue', props.modelValue);
      }, {
        deep: true
      });
      
      // 外部动态修改
      watch(() => props.modelValue, (newval, oldval) => {
        Object.assign(formValue, newval);
        // console.log('props.modelValue+++改变了');
        Object.assign(formValue, newval);
      }, {
        deep: true
      });
      
      
      let validator = new Schema(props.rules);
      
      // 验证结果
      // const verification = computed(()=>{
      //   return {}
      // });
      onBeforeMount(()=>{
        Object.assign(formValue,props.modelValue);
      })
      
      // 验证
      function validateField(name, event) {
        // console.log(props.rules[name]);
        const validator = new Schema({
          [name]: props.rules[name]
        });
        // console.log(validator,'验证子类');
        nextTick(() => {
          validator.validate(formValue).then(() => {
            // console.log('32323');
            // validation passed or without error message
            delete verificationResults[name];
          }).catch(({
            errors,
            fields
          }) => {
            verificationResults[name] = fields[name];
          })
        });
      
      }
      
      // 清理验证信息 
      function clearVerificationResults(){
        for(let key in verificationResults){
          delete verificationResults[key];
        }
      }
      // 清理验证信息
      function clearVerificationResultsOne(key){
      
        delete verificationResults[key];
        
      }
      
      // 验证全部
      async function validate() {
        // console.log(props.rules,formValue);
        const validator = new Schema(props.rules);
        // console.log(validator,'验证子类');
        await nextTick(async () => {
          // console.log('77777777777');
          await validator.validate(formValue).then(() => {
            // console.log('32323');
            // validation passed or without error message
            delete verificationResults[name];
          }).catch(({
            errors,
            fields
          }) => {
            // console.log( errors,fields);
            Object.assign(verificationResults,fields)
      
          })
        });
        // console.log(verificationResults);
        // 等于零全部通过
        return Object.keys(verificationResults).length == 0;
      }
      
      provide("formValue", formValue);
      provide("rules", props.rules);
      provide("validateField", validateField);
      provide("verificationResults", verificationResults);
      expose({
        validateField,
        validate,
        clearVerificationResults,
        clearVerificationResultsOne
      })
      
      return {
        
      }
      
    }
  }
  
  // const emit = defineEmits(['update:modelValue'])

</script>

<style scoped>
</style>
