<template>
  <view :class="[' flex-reverse',layout]">
    <slot :msg='errMsg'></slot>
    <!-- 报错提示 -->
    <view class="input-error" v-if="errMsg">
      <slot name='error' :msg='errMsg'>
        {{errMsg}}
      </slot>
    </view>
  </view>
</template>

<script setup>
  /**
     * form-item 表单item
     * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
     * @tutorial https://www.uviewui.com/components/topTips.html
     * @example <z-form-item class="form-item"></z-form-item>
        <style>
            .form-item{
                --form-item-box-pad: 组件最外层的内边距 。默认 32rpx
                --form-item-label-font-size label 的字体大小  默认24rpx
                --form-item-label-lh  label 的行高 默认 1
                --form-item-label-color  label 的字体颜色 默认--color-main
                --form-item-label-mar-rg   label 的右外边距 默认 2em 
                --form-item-input-height  组件输入框 高度 默认 98rpx
                --form-item-input-mar-top 组件输入框的margin-top 默认 0 
                --form-item-input-color  组件输入框有值时的颜色  默认--color-main
                --form-item-input-place-color  组件输入框占位符的颜色
                --form-item-input-font-size: 组件输入框的字体大小  默认28rpx
                --form-item-text-area-height: 
            }
        </style>
     */
  import {
    ref,
    computed,
    inject,
    provide,
    watch,
    onBeforeMount
  } from 'vue';
  // 从z-form 传递下来
  const verificationResults = inject('verificationResults', null);

  const formName = ref('');
  // watch(()=>verificationResults,(newval,oldval)=>{
  //   console.log(newval);
  //   console.log('444444444');
  // },{deep:true});

  // watch(formName,(newval,oldval)=>{
  //   console.log(newval);
  //   console.log('4444411111111');
  // });
  onBeforeMount(() => {
    formName.value = props.name || '';
  })
  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    layout: {
      type: String,
      default: 'block',
      validator: (value) => {
        // 这个值必须匹配下列字符串中的一个
        let typeTxt = "line,block"; //line 在同一行，block另起一行
        // let typeList = typeTxt.split(',');
        return typeTxt.indexOf(value) !== -1
      }
    },

  });

  // 目前只考虑form 验证，不考虑z-input rules 验证
  const errMsg = computed(() => {
    // verification
    // console.log(formName, verificationResults, '88888888*************');
    if (formName.value && verificationResults && verificationResults[formName.value]) {
      return verificationResults[formName.value][0].message || ''
    } else {
      return ''
    }
  });
  provide('formName', formName);
</script>

<style scoped>
  /* 错误信息 */
  .input-error {
    width: 100%;
    color: var(--input-err-color, red);
    font-size: var(--input-err-fs, inherit);
    padding: var(--form-item-error-pad, unset);
    margin: var(--form-item-error-mar, unset);
    transform: var(--form-item-error-transform,unset);
    position: var(--input-error-position, relative);
    top: var(--input-error-top, 0);
    left: var(--input-error-lf, 0);
    right: var(--input-error-rg, 0);
    z-index: 10;
  }
</style>
