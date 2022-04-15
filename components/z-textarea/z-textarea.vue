<template>
    <view :class="['text-area-box',layout=='overlap'&&!isOverlap?'noOverlap':layout]">
        <view class="prefix">
          <slot name='prefix' :isOverlap="isOverlap"></slot>
        </view>
        
        <textarea :class="['test-area-into',classStyle]" v-model="modelValue" :maxlength="maxlength" :auto-height="true" :auto-focus="true" @blur="textareaBlur"
            :placeholder="placeholder" placeholder-class="placeholder-class" @input="change" v-if="showTextarea" />
        <view :class="['test-area-view',currentValue==''&&'placeholder-class',classStyle]"  v-show="!showTextarea"  @click="showTextarea = true,isOverlap=false">{{currentValue||placeholder}}</view>
    </view>
</template>

<script setup>
    /**
     * textarea 自定义多行文本框
     * @description 此组件一般用于解决textarea层级过高的问题
     * @tutorial https://www.uviewui.com/components/navbar.html
     * @property {String} value value值
     * @property {String} placeholder 占位符
     * @property {String} classStyle 外部样式
     * @example <z-textarea v-model="value" placeholder="占位符" classStyle=''></z-textarea>
     */
    import {ref,inject,watch,onBeforeMount} from "vue";
    import {throttle,debounce} from '../../utils/optimize.js';
    const emit = defineEmits(["update:modelValue"]);
    let currentValue = ref("");
    let showTextarea = ref(false);
    // 从z-form 传递下来的数据
    const formValue = inject('formValue',null);
    const formName = inject('formName','');
    // 检查某一个规则
    const validateField = inject('validateField', null);
    
    
    const props = defineProps({
        autoFocus: {
            type: Boolean,
            default: true,
        },
        // 用于form 表单提交
        name: {
          type: String,
          default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
        // v-model 修饰符
        modelModifiers: {
          default: () => ({}),
        },
        maxlength: {
            type: Number,
            default: -1,
        },
        placeholder: {
            type: String,
            default: ''
        },
        classStyle: {
            type: String,
            default: ''
        },
        // 布局 vertical，多行排列
        layout: {
          type: String,
          default: "vertical",
          validator: function(value) {
            // 这个值必须匹配下列字符串中的一个
            // overlap 重叠，输入值后错开
            return ['vertical', 'overlap'].indexOf(value) !== -1
          }
        },

    });
    let isOverlap = ref(true);
    onBeforeMount(() => {
      if (formName && formName.value == '' && props.name != '') {
        formName.value = props.name;
      }
      console.log(formValue,formName.value,formValue[formName.value],'txtxtxtxtttttt')
      if(props.modelValue){
        currentValue.value = props.modelValue;
      }else if(formValue&&formValue[formName.value]){
        currentValue.value = formValue&&formValue[formName.value];
        isOverlap.value = false;
      }
      
      
    });
    watch(()=>formValue&&formValue[formName.value],(newval,oldval)=>{
      if(newval!=''&& !currentValue.value){
        currentValue.value = formValue[formName.value];
        isOverlap.value = false;
      }
      // console.log('333333')
    });
    function change(e){
        currentValue.value = e.detail.value;
        // 传递到form
        if(formValue){
          formValue[props.name] = e.detail.value;
        }
    }
    function clear(){
        
    }
    // 用于 v-mode.defer=""
    // 节流，每间隔500毫秒执行一次
    let cacheval = '';
    const inputThrottle2 =
      throttle(() => {
        // console.log('&&&&&&&&&&&&&777777777');
        emit("update:modelValue", cacheval);
    
      }, 500);
    // 防抖，防止上面没有取到最新值
    const inputDebounce2 = debounce(() => {
      // console.log('&&&&&&&&&&&&&444444444');
      emit("update:modelValue", cacheval);
    }, 600);
    watch(currentValue, (newval, oldval) => {
      // console.log(newval);
      // console.log('$$$$$$$$$$$');
      if (formValue) {
        formValue[formName.value] = newval;
      }
      // 检验规则
      if (validateField) {
        validateField(formName.value, 'change');
      }
      cacheval = newval;
      if (props.modelModifiers.defer) {
        // 节流，每间隔500毫秒执行一次
        inputThrottle2();
        // 防抖，防止上面没有取到最新值
        inputDebounce2();
      } else {
        emit("update:modelValue", newval)
      }
    });
    
    // 监听失去焦点事件
    function textareaBlur() {
      showTextarea.value = false;
      isOverlap.value = currentValue.value == '';
      if (formValue) {
        formValue[formName.value] = currentValue.value || '';
      }
      // 检验规则
      if (validateField) {
        validateField(formName.value, 'blur');
      }
    }
</script>

<style scoped>
    .text-area-box{
        padding: var(--textarea-padding,0);
        position: relative;
        box-sizing: border-box;
    }
    .test-area-into,
    .test-area-view {
        width: 100%;
        height: 100%;
        min-height: var(--textarea-min-height,inherit);
        max-height: var(--textarea-max-height,inherit);
        font-size: inherit;
        color: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        word-wrap: break-word;
        word-break: break-all;
        word-spacing: normal;
        box-sizing: border-box;
        transform: translateY(0);
        margin-top: var(--textarea-mar-top,0);
    }

    .placeholder-class{
        color: var(--textarea-place-color,inherit);
        font-size: var(--textarea-place-font-size,inherit);
    }
    .test-area-into {
        z-index: 10;
    }
    .iconicon-shanchu{
        transform: translateY(-50rpx);
    }
    .prefix{
      width: 100%;
      display: flex;
      transition: all ease-in-out 0.5s 0s;
    }
    /* 重叠 */
   .overlap .prefix{
      width: 100%;
      
      font-size: var(--input-overlap-font-size);
      color: var(--input-overlap-color);
      pointer-events: none;
      padding-top: var(--input-overlap-top, 0);
      padding-bottom: var(--input-overlap-btm, 0);
      padding-left: var(--input-overlap-lf, 0);
      padding-right: var(--input-overlap-rg, 0);
      transform: translateY(var(--input-overlap-move,100%));
      pointer-events: none;
    }
    .noOverlap .prefix{
      width: 100%;
      font-size: var(--input-no-overlap-font-size);
      color: var(--input-no-overlap-color);
      pointer-events: none;
      padding-top: var(--input-no-overlap-top, 0);
      padding-bottom: var(--input-no-overlap-btm, 0);
      padding-left: var(--input-no-overlap-lf, 0);
      padding-right: var(--input-no-overlap-rg, 0);
      transform: translateY(0);
    }
    .overlap .test-area-view{
      transform: translateY(calc(var(--input-overlap-input-move,0) / -2));
    
    }
</style>
