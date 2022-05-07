<template>
  <view class="popup-dialog">
    <view class="dialog-title">
      <text class="dialog-title-text" :class="['popup-'+dialogType]">{{title}}</text>
    </view>
    <view class="dialog-content">
      <text class="dialog-content-text" v-if="mode === 'base'">{{content}}</text>
      <input v-else class="dialog-input" v-model="val" type="text" :placeholder="placeholder" :focus="focus">
    </view>
    <view class="dialog-button-group">
      <view class="dialog-button" @click="close">
        <text class="dialog-button-text">取消</text>
      </view>
      <view class="dialog-button border-left" @click="onOk">
        <text class="dialog-button-text button-color">确定</text>
      </view>
    </view>

  </view>
</template>

<script>
  /**
   * popupDialog 弹出层-对话框样式
   * @description 弹出层-对话框样式
   * @tutorial https://ext.dcloud.net.cn/plugin?id=329
   * @property {String} value input 模式下的默认值
   * @property {String} placeholder input 模式下输入提示
   * @property {String} type = [success|warning|info|error] 主题样式
   *     @value success 成功
   *     @value warning 提示
   *     @value info 消息
   *     @value error 错误
   * @property {String} mode = [base|input] 模式、
   *     @value base 基础对话框
   *     @value input 可输入对话框
   * @property {String} content 对话框内容
   * @property {Boolean} beforeClose 是否拦截取消事件
   * @event {Function} confirm 点击确认按钮触发
   * @event {Function} close 点击取消按钮触发
   */
  import {
    ref,
    inject,
    computed
  } from 'vue';
  export default {
    name: "popupDialog",
    emits: ['confirm', 'close'],
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: [String, Number],
        default: '请输入内容'
      },
      /**
       * 对话框主题 success/warning/info/error	  默认 success
       */
      type: {
        type: String,
        default: 'error'
      },
      /**
       * 对话框模式 base/input
       */
      mode: {
        type: String,
        default: 'base'
      },
      /**
       * 对话框标题
       */
      title: {
        type: String,
        default: '提示'
      },
      /**
       * 对话框内容
       */
      content: {
        type: String,
        default: ''
      },
      /**
       * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
       */
      beforeClose: {
        type: Boolean,
        default: false
      }
    },
    setup(props, {
      emit
    }) {
      const popup = inject('popup');
      dialogType: 'error',
        focus: false,
        val: ""

      let focus = ref(true);
      popup.mkclick = false;
      const val = computed({
        set(val) {
          emit('update:modelValue', val)
        },
        get() {
          return props.modelValue;
        }

      })
      if (props.mode === 'input') {
        dialogType.value = 'info'
        val.value = props.value
      } else {
        dialogType.value = props.type
      }
      watch(() => props.type, (newval, oldval) => {
        dialogType.value = val;
      })
      watch(() => props.mode, (newval, oldval) => {
        if (newval === 'input') {
          dialogType.value = 'info'
        }
      })
      /**
       * 点击确认按钮
       */
      function onOk() {
        emit('confirm', () => {
          popup.close()
          if (this.mode === 'input') this.val = this.value
        }, this.mode === 'input' ? this.val : '')
      },
      /**
       * 点击取消按钮
       */
      function close() {
        if (props.beforeCl) {
          emit('close', () => {
            popup.close()
          })
          return
        }
        popup.close()
      }
      return {
        dialogType,
        focus,
        close,
        onOk,
      }
    },


  }
</script>

<style lang="scss" scoped>
  .popup-dialog {
    width: 300px;
    border-radius: 15px;
    background-color: #fff;
  }

  .dialog-title {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 5px;
  }

  .dialog-title-text {
    font-size: 16px;
    font-weight: 500;
  }

  .dialog-content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 15px 15px 15px;
  }

  .dialog-content-text {
    font-size: 14px;
    color: #6e6e6e;
  }

  .dialog-button-group {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    border-top-color: #f5f5f5;
    border-top-style: solid;
    border-top-width: 1px;
  }

  .dialog-button {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */

    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 45px;
  }

  .border-left {
    border-left-color: #f0f0f0;
    border-left-style: solid;
    border-left-width: 1px;
  }

  .dialog-button-text {
    font-size: 14px;
  }

  .button-color {
    color: #007aff;
  }

  .dialog-input {
    flex: 1;
    font-size: 14px;
  }

  .popup-success {
    color: #4cd964;
  }

  .popup-warn {
    color: #f0ad4e;
  }

  .popup-error {
    color: #dd524d;
  }

  .popup-info {
    color: #909399;
  }
</style>
