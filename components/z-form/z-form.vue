<template>
  <view class="z-form-box">
    <slot></slot>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    provide,
    watch,
    computed,
    nextTick
  } from "vue";
  import Schema from "../../utils/validator.js";
  // 去除警告信息
  Schema.warning = function() {};
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default: {}
    },

    rules: {
      type: [Object, Array],
      default: {}
    }
  })
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
    console.log('props.modelValue+++改变了');
    Object.assign(formValue, newval);
  }, {
    deep: true
  });


  let validator = new Schema(props.rules);

  // 验证结果
  // const verification = computed(()=>{
  //   return {}
  // });


  // 验证
  function validateField(name, event) {
    console.log(props.rules[name]);
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
  // 验证全部
  async function validate() {
    const validator = new Schema({
      [name]: props.rules[name]
    });
    // console.log(validator,'验证子类');
    await nextTick(async () => {
      await validator.validate(formValue).then(() => {
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

    // 等于零全部通过
    return Object.keys(verificationResults).length == 0;
  }

  provide("formValue", formValue);
  provide("rules", props.rules);
  provide("validateField", validateField);
  provide("verificationResults", verificationResults);
</script>

<style scoped>
</style>
