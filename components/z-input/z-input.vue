<template>
  <view class="input-box">
    <!-- 前缀 -->
    <view :class="['input-prefix',layout=='horizontal'?'horizontal': 'vertical']">
      <slot name='prefix'>
      </slot>
    </view>

    <!-- 输入框 -->
    <input class="input-into" :type="type == 'password' ? 'text' : type" :value="defaultValue"
      :password="type == 'password' && !showPassword" :placeholder="placeholder" :placeholder-style="placeholderStyle"
      placeholderClass="input-placeholder" :disabled="disabled" :maxlength="maxlength" :focus="focus"
      @focus="handleFocus" @blur="handleBlur" @input="handleInput" @confirm="onConfirm" />
    <!-- 后缀 -->
    <view class="input-suffix">
      <slot name='suffix'>
        <!-- 默认清除按钮 -->
        <view class="iconfont iconicon-shanchu" @click="clear" v-if="showSuffixIcon&&defaultValue&&type=='text'"></view>
        <view class="iconfont iconicon-yanjing-biyan" @click="showPassword=true"
          v-if="showSuffixIcon&&defaultValue&&type=='password'&&showPassword==false"></view>
        <view class=" iconfont iconicon-yanjing-zhengyan" @click="showPassword=false"
          v-if="showSuffixIcon&&defaultValue&&type=='password'&&showPassword==true"></view>
      </slot>
      <!-- 在需要用到上面默认suffix时,可以用下面补救 -->
      <slot name="suffixAfter"></slot>

    </view>

    <!-- 报错提示 -->
    <view class="input-error" v-if="errMsg">
      {{errMsg}}
    </view>
  </view>

</template>

<script setup>
  /*
   * @dev z-input 组件实现了前置跟后置，加 错误提示
   *
   */
  import {
    throttle,
    debounce
  } from "../../utils/optimize.js";
  import {
    ref,
    computed,
    onBeforeMount,
    watch
  } from "vue";
  let errMsg = ref('');
  let defaultValue = ref("");
  // 密码是否可见
  let showPassword = ref(false);
  const emit = defineEmits(['update:modelValue', 'focus', 'confirm', "change"]);
  const props = defineProps({
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
    /// 输入类型默认文本框
    type: {
      type: String,
      default: "text",
    },
    /// 是否自动获取焦点
    focus: {
      type: Boolean,
      default: false
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
      type: [Boolean,String],
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
    }
  });

  // let focused = computed({
  // 	get() {
  // 		return props.focus;
  // 	},
  // 	set(val) {
  // 		props.focus
  // 	}
  // });

  onBeforeMount(() => {
    defaultValue.value = props.modelValue;
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
  const inputDebounce =debounce((newval) => {
    // console.log('&&&&&&&&&&&&&444444444');
    emit("change", newval);
  }, 1000);
  watch(defaultValue, (newval, oldval) => {
    emit("update:modelValue", newval);
    // console.log('监听++++++');
   
  });

  // 监听获得焦点事件
  function handleFocus() {
    // focused = true;
    emit("focus");
  }
  // 监听失去焦点事件
  function handleBlur() {

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
  }

  .input-placeholder {
    font-size: var(--input-place-font-size, inherit);
    color: var(--input-place-color, inherit);
    padding-left: var(--input-place-pd-lf, inherit);
    padding-right: var(--input-place-pd-rg, inherit);
  }

  /* 错误信息 */
  .input-error {
    color: var(--input-err-color, red);
    font-size: var(--input-err-fs, inherit);
    padding: var(--input-pad, 1em);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .iconicon-shanchu,
  .iconicon-yanjing-biyan,
  .iconicon-yanjing-zhengyan {
    --font-size: 36rpx;
    font-size: var(--input-close-fs, var(--font-size));
    color: var(--input-close-color, #A6A6AC);
    box-sizing: content-box;

    border: 10rpx solid transparent;
    margin-right: 10rpx;
  }

  /* 前缀 */
  .input-prefix {
    width: auto;
  }

  .input-prefix.vertical {
    width: 100%;
  }
</style>
