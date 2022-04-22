<template>
  <view class="input-box">
    <!-- 前缀 -->
    <view :class="['input-prefix',layout=='overlap'&&!isOverlap?'noOverlap':layout]">
      <slot name='prefix' :isOverlap="isOverlap">
        <!-- type==search,显示搜索图标 -->
        <view class="search-icon iconfont iconicon-sousuo" v-if="showPrefixIcon&&type=='search'"></view>
      </slot>
    </view>

    <!-- 输入框 -->
    <input class="input-into" :type="inputType" :value="defaultValue" :password="type == 'password' && !showPassword"
      :placeholder="placeholder" :placeholder-style="placeholderStyle" placeholderClass="input-placeholder"
      :disabled="disabled" :maxlength="maxlength" :focus="focus" @focus="handleFocus" @blur="handleBlur"
      @input="handleInput" @confirm="onConfirm" />
    <!-- 后缀 -->
    <view class="input-suffix">
      <slot name='suffix'>
        <!-- 默认清除按钮 -->
        <view class="close-icon iconfont iconicon-shanchu" @click="clear"
          v-if="showSuffixIcon&&defaultValue&&(type=='text'||type=='search')"></view>
        <!-- type == password,密码不可见 -->
        <view class="iconfont iconicon-yanjing-biyan" @click="showPassword=true"
          v-if="showSuffixIcon&&defaultValue&&type=='password'&&showPassword==false"></view>
        <!-- type == password,密码可见 -->
        <view class=" iconfont iconicon-yanjing-zhengyan" @click="showPassword=false"
          v-if="showSuffixIcon&&defaultValue&&type=='password'&&showPassword==true"></view>
      </slot>
      <!-- 在需要用到上面默认suffix时还要添加后缀图标,可以用下面补救 -->
      <slot name="suffixAfter"></slot>

    </view>

  </view>

</template>

<script setup>
  // import onClickBefore from '../onClickBefore/onClickBefore.vue';
  /**
   * PopUp 按钮组件
   * @description 适用各种场景的按钮
   * @tutorial https://ext.dcloud.net.cn/plugin?id=329
   * @property {String} type = [default|navigation] 按钮类型
   *     @value default 默认按钮，没有其他功能
   *     @value navigation 路由按钮功能跟 navigation 一样
   * @property {String} shape = [square|circle] 按钮类型
   *      @value square 默认圆角
   *      @value circle 两边为半圆
   * @property {Boolean} ripple 是否开启点击水波纹效果 默认开启
   * @property {Boolean} plain 是否镂空 默认不镂空 
   * @property {Boolean} disable 是否禁用，默认不禁用 
   * @property {Function } onClickBefore 仿重复点击事件，传入一个方法 
   * @property {Boolean} animation = [ture|false] 是否开启动画
   * @property {String,Nubmer} stayTime  接口调用后必须等待多少时间才可点击
   * @property {String,Nubmer} outTime 超出时间，后可以点击
   * @example <z-button class="button"></z-button>
     <style>
         .button{
            --btn-height: 按钮高度 默认 84rpx
            --btn-bor-width: 边框宽度 默认2rpx
            --btn-bor-color: 边框颜色 默认 当前字体颜色
            --btn-color  按钮字体颜色 默认#333
            --btn-bg: 按钮背景色  默认red
            --btn-img:  一般用于设置渐变色
            --btn-disable-bg 按钮禁用背景色  默认颜色不变
            --btn-disable-color 按钮禁用字体颜色 默认#fff
            --btn-disable-opacity 按钮禁用透明度 默认1
            --btn-disable-bor-color
            --btn-font-size: 字体大小 默认32rpx
            --btn-font-weight: 字重   默认600
            --btn-radius: 圆角，8rpx
         }
         
     </style>
   
   */
  import {
    throttle,
    debounce
  } from "../../utils/optimize.js";
  import {
    ref,
    computed,
    onBeforeMount,
    watch,
    inject,

  } from "vue";
  // 不用计算器属性是因为有可能不用v-model
  let defaultValue = ref("");
  // 密码是否可见
  let showPassword = ref(false);
  const emit = defineEmits(['update:modelValue', 'focus', 'confirm', "change"]);


  // 从z-form 传递下来的数据
  const formValue = inject('formValue', null);

  // 检查某一个规则
  const validateField = inject('validateField', null);
  // 从form-item 传递过来
  let formName = inject("formName", '');

  const props = defineProps({
    // 用于form 表单提交
    name: {
      type: String,
      default: "",
    },
    // 布局 horizontal，一行排列
    // 布局 vertical，多行排列
    layout: {
      type: String,
      default: "horizontal",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        // overlap 重叠，输入值后错开
        return ['horizontal', 'vertical', 'overlap'].indexOf(value) !== -1
      }
    },
    modelValue: {
      type: String,
      default: "",

    },
    // v-model 修饰符
    modelModifiers: {
      default: () => ({}),
    },
    /// 输入类型默认文本框
    type: {
      type: String,
      default: "text",
      validator(value) {
        // 这个值必须与下列字符串中的其中一个相匹配
        return ['text', 'search', 'password', 'number'].includes(value)
      }
    },
    /// 是否自动获取焦点
    focus: {
      type: Boolean,
      default: false
    },
    rule: {
      type: [Object, Array],
      default: {}
    },
    /// 占位符
    placeholder: {
      type: String,
      default: "",
    },
    // 占位符style样式
    placeholderStyle: {
      type: [String, Object],
      default: ''
    },
    /// 是否禁用
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    /// 输入的最大长度
    maxlength: {
      type: Number,
      default: -1
    },
    /// 是否显示Suffix 默认图标
    showSuffixIcon: {
      type: Boolean,
      default: true,
    },
    /// 是否显示Suffix 默认图标
    showPrefixIcon: {
      type: Boolean,
      default: true,
    }
  });

  let isOverlap = ref(true);
  // 处理type显示问题
  const inputType = computed(() => {
    switch (props.type) {
      case 'password':
      case 'search':
        return 'text';
      default:
        return props.type;
    }
  });


  onBeforeMount(() => {

    if (formName && formName.value == '' && props.name != '') {
      formName.value = props.name;
    }
     // console.log('this is  onrelay1')
    if (props.modelValue) {
      // console.log(props.modelValue);
       // console.log('this is  onrelay2')
      defaultValue.value = props.modelValue;
    } else if (formValue && formValue[formName.value]) {
      // console.log('this is  onrelay3')
      defaultValue.value = formValue[formName.value];
      isOverlap.value = false;
    }
  });
  
  
  watch(() => formValue && formValue[formName.value], (newval, oldval) => {
    if (newval != '' && !defaultValue.value) {
      defaultValue.value = formValue[formName.value];
      isOverlap.value = false;
    }
    // console.log('333333')
  });

  watch(() => props.modelValue, (newval, oldval) => {
    // if (watchThrottle) {
    // 	clearTimeout(watchThrottle);
    // }
    // watchThrottle = setTimeout(() => {
    defaultValue.value = newval;
    // }, 100);
  })
  // 节流，每间隔500毫秒执行一次
  const inputThrottle =
    throttle((newval) => {
      // console.log('&&&&&&&&&&&&&777777777');
      emit("change", newval);
    }, 500);
  // 防抖，防止上面没有取到最新值
  const inputDebounce = debounce((newval) => {
    // console.log('&&&&&&&&&&&&&444444444');
    emit("change", newval);
  }, 800);

  // 用于 v-mode.defer=""
  // 节流，每间隔500毫秒执行一次
  let cacheval = '';
  const inputThrottle2 =
    throttle(() => {
      console.log(props,'******************8')
      // console.log('&&&&&&&&&&&&&777777777');
      emit("update:modelValue", cacheval);

    }, 500);
  // 防抖，防止上面没有取到最新值
  const inputDebounce2 = debounce(() => {
    // console.log('&&&&&&&&&&&&&444444444');
    console.log(props.modelValue,'***********111*******8')
    emit("update:modelValue", cacheval);
  }, 600);
  watch(defaultValue, (newval, oldval) => {
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

  // 监听获得焦点事件
  function handleFocus() {
    // focused = true;
    emit("focus");
    isOverlap.value = false;
  }
  // 监听失去焦点事件
  function handleBlur() {

    isOverlap.value = defaultValue.value == '';
    if (formValue) {
      formValue[formName.value] = defaultValue.value || '';
    }
    // 检验规则
    if (validateField) {
      validateField(formName.value, 'blur');
    }
  }
  //监听输入框输入
  function handleInput(e) {
    let {
      value = ""
    } = e.detail || {};
    defaultValue.value = value;
    // 节流，每间隔500毫秒执行一次
    inputThrottle(e);
    // 防抖，防止上面没有取到最新值
    inputDebounce(e);

  }
  // 点击键盘确认键
  function onConfirm() {
    emit("confirm", defaultValue);
  }
  /// 清空输入框
  function clear() {
    defaultValue.value = '';
    isOverlap.value = true;
    emit('change', defaultValue)
  }
</script>

<style scoped>
  .input-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    box-sizing: border-box;
    flex-wrap: wrap;
    position: relative;
  }

  .input-into {
    --height: 98rpx;
    height: var(--input-height, var(--height));
    flex-grow: 1;
    width: 30%;
    flex-shrink: 0;
    color: inherit;
    font-size: inherit;
    --all-raduis: var(--input-into-radius, inherit);
    --top-radius: var(--input-into-raduis-top);
    --btm-radius: var(--input-into-raduis-btm);
    --lf-radius: var(--input-into-raduis-lf);
    --rg-radius: var(--input-into-raduis-rg);
    --top-right-raduis: var(--top-radius, var(--rg-radius, var(--all-raduis)));
    --top-left-raduis: var(--top-radius, var(--lf-radius, var(--all-raduis)));
    --btm-right-raduis: var(--btm-radius, var(--rg-radius, var(--all-raduis)));
    --btm-left-raduis: var(--btm-radius, var(--lf-radius, var(--all-raduis)));
    border-top-right-radius: var(--input-into-radius-top-rg, var(--top-right-raduis));
    border-top-left-radius: var(--input-into-radius-top-lf, var(--top-left-raduis));
    border-bottom-right-radius: var(--input-into-radius-btm-rg, var(--btm-right-raduis));
    border-bottom-left-radius: var(--input-into-radius-btm-lf, var(--btm-left-raduis));
    border-top: var(--input-into-border-top, var(--input-into-border));
    border-right: var(--input-into-border-rg, var(--input-into-border));
    border-bottom: var(--input-into-border-btm, var(--input-into-border));
    border-left: var(--input-into-border-lf, var(--input-into-border));
    padding-left: var(--input-into-pd-lf, 0);
    padding-right: var(--input-into-pd-rg, 0.5em);
    transition: all ease-in-out 0.3s 0s;
  }

  .input-placeholder {
    font-size: var(--input-place-font-size, inherit);
    color: var(--input-place-color, inherit);
    padding-left: var(--input-place-pd-lf, inherit);
    padding-right: var(--input-place-pd-rg, inherit);
  }




  /* 当使用背景图标是需要通过设置透明度隐藏字体图标 */
  .search-icon::before {
    opacity: var(--input-search-icon-opacity, 1);
  }

  .close-icon::before {
    opacity: var(--input-close-icon-opacity, 1);
  }

  .password-icon::before {
    opacity: var(--input-password-icon-opacity, unset);
  }

  .unpassword-icon::before {
    opacity: var(--input-unpassword-icon-opacity, unset);
  }

  .search-icon {
    background-image: var(--input-search-icon);
  }

  .iconicon-shanchu {
    background-image: var(--input-close-icon);
  }

  .iconicon-yanjing-biyan {
    background-image: var(--input-password-icon);
  }

  .iconicon-yanjing-zhengyan {
    background-image: var(--input-unpassword-icon);
  }

  .search-icon,
  .iconicon-shanchu,
  .iconicon-yanjing-biyan,
  .iconicon-yanjing-zhengyan {
    --font-size: 36rpx;
    width: 1em;
    height: 1em;
    font-size: var(--input-icon-right-fs, var(--font-size));
    color: var(--input-icon-right-color, #A6A6AC);
    box-sizing: content-box;
    border: 10rpx solid transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: 10rpx solid transparent;
    margin-right: var(--input-icon-mar-rg, unset);
  }

  /* 前缀 */
  .input-prefix {
    width: auto;
    transition: all ease-in-out .3s 0s;
  }

  .input-prefix.vertical {
    width: 100%;
  }

  /* 重叠 */
  .input-prefix.overlap {
    width: 100%;

    font-size: var(--input-overlap-font-size);
    color: var(--input-overlap-color);
    pointer-events: none;
    padding-top: var(--input-overlap-top, 0);
    padding-bottom: var(--input-overlap-btm, 0);
    padding-left: var(--input-overlap-lf, 0);
    padding-right: var(--input-overlap-rg, 0);
    transform: translateY(var(--input-overlap-move, 100%));
    pointer-events: none;
  }

  .input-prefix.noOverlap {
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

  .overlap+.input-into {
    transform: translateY(calc(var(--input-overlap-input-move, 0) / -2));
    height: var(--input-overlap-input-height, unset);
  }
</style>
