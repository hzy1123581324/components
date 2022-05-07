<template>
  <!-- 加v-bind="$attrs" 是因为父组件加了样式列会警告，同时可以继承样式类 -->
  <teleport to="body" v-bind="$attrs">
    <view v-if="modelValue" v-bind="$attrs" :class="['popup', popupstyle]" @touchmove.stop>
      <z-transition class="mask" v-if="maskShow" :mode-class="['fade']" :duration="duration" :show="showTrans"
        @click="onTap" />
      <z-transition class="transition-block" :mode-class="ani" :styles="transClass" :duration="duration"
        :show="showTrans" @click="onTap">
        <view class="popup-wrapper-box" @click.stop>
          <slot></slot>
        </view>
      </z-transition>
    </view>
  </teleport>

</template>

<script>
  /**
   * PopUp 弹出层
   * @description 弹出层组件，为了解决遮罩弹层的问题
   * @tutorial https://ext.dcloud.net.cn/plugin?id=329
   * @property {String} type = [top|center|bottom|left|right] 弹出方式
   *     @value top 顶部弹出
   *     @value center 中间弹出
   *     @value bottom 底部弹出
   *     @value left 左边弹出
   *     @value right 右边弹出
   *     @value message 消息提示
   *     @value dialog 对话框
   *     @value share 底部分享示例
   * @property {Boolean} animation = [ture|false] 是否开启动画
   * @property {Boolean} maskClick = [ture|false] 蒙版点击是否关闭弹窗
   * @event {Function} change 打开关闭弹窗触发，e={show: false}
   * @example <z-popup ref="popup"></z-popup>
   * <style>
      .popup{
          --popup-index: 定义popup组件的层级
      }
   *</style>
   */
  import {
    provide,
    nextTick,
    watch,
    ref,
    computed,
    reactive,
    onMounted,
    getCurrentInstance,
  } from 'vue';
  import {clearObject} from '../../composition/public.js'
  export default {
    name: 'popup',
    emits: ['update:modelValue', 'change'],
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；left: 左弹出框；right：右弹出框；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: 'center',
        validator: function(value) {
          // 这个值必须匹配下列字符串中的一个
          return ['top', 'bottom', 'right', 'left', 'center', 'message', 'dialog', ].indexOf(value) !== -1
        }
      },
      // maskClick
      maskClick: {
        type: Boolean,
        default: true
      }
    },
    setup(props, {
      emit
    }) {
      const {
        proxy
      } = getCurrentInstance();
      provide('popup', proxy);
      let timer = null;
      let ani = reactive([]);
      let duration = ref(300);
      // showPopup: false,
      let showTrans = ref(false);
      let transClass = reactive({
        'position': 'fixed',
        'left': 0,
        'right': 0,
      });
      let maskShow = ref(true);
      let mkclick = ref(true);
      let popupstyle = ref('top');
      const funMap = {
        open,
        top,
        bottom,
        right,
        left,
        center,
        message,
        dialog,
      }

      function open() {
        // this.showPopup = true
        emit('update:modelValue', true);
        nextTick(() => {
          new Promise(resolve => {
            clearTimeout(timer)
            timer = setTimeout(() => {
              showTrans.value = true
              // fixed by mehaotian 兼容 app 端
              nextTick(() => {
                resolve();
              })
            }, 50);
          }).then(res => {
            // 自定义打开事件
            // clearTimeout(this.msgtimer)
            // this.msgtimer = setTimeout(() => {
            //     this.customOpen && this.customOpen()
            // }, 100)
            if (props.type == 'left' || props.type == 'right') {
              uni.hideTabBar()
            }
            emit('change', {
              show: true,
              type: props.type
            })
          })
        })
      }

      function close(type) {
        showTrans.value = false
        nextTick(() => {
          emit('change', {
            show: false,
            type: props.type
          })

          if (props.type == 'left' || props.type == 'right') {
            uni.showTabBar()
          }
          clearTimeout(timer)
          // 自定义关闭事件
          // this.customOpen && this.customClose()
          timer = setTimeout(() => {
            // this.showPopup = false

            emit('update:modelValue', false);
          }, 300)
        })
      }

      function onTap() {
        mkclick.value && close()
      }
      /**
       * 顶部弹出样式处理
       */
      function message() {
        //        popupstyle.value = ''
        //        ani.value = ['']
        //        transClass.value = {

        //        }
      }

      function dialog() {
        //        popupstyle.value = ''
        //        ani.value = ['']
        //        transClass.value = {

        //        }
      }
      /**
       * 顶部弹出样式处理
       */
      function top() {
        popupstyle.value = 'top'
        ani.length = 0;
        ani.push('slide-top');
        clearObject(transClass);
        Object.assign(transClass,{
          'position': 'fixed',
          'left': 0,
          'right': 0,
        })

      }
      /**
       * 底部弹出样式处理
       */
      function bottom() {
        popupstyle.value = 'bottom'
        ani.length = 0;
        ani.push('slide-bottom');
        clearObject(transClass);
        Object.assign(transClass,{
          'position': 'fixed',
          'left': 0,
          'right': 0,
          'bottom': 0
        })
      }
      /**
       * 中间弹出样式处理
       */
      function center() {
        popupstyle.value = 'center'
        ani.length = 0;
        ani.push(...['zoom-out', 'fade']);
        clearObject(transClass);
        
        Object.assign(transClass,{
          'position': 'fixed',
          /* #ifndef APP-NVUE */
          'display': 'flex',
          'flexDirection': 'column',
          /* #endif */
          'bottom': 0,
          'left': 0,
          'right': 0,
          'top': 0,
          'justifyContent': 'center',
          'alignItems': 'center'
        })
         
      }
      /**
       * 左边弹出样式处理
       */
      function left() {
        popupstyle.value = 'left'
        ani.length = 0;
        ani.push('slide-left');
        clearObject(transClass);
        Object.assign(transClass,{
          'position': 'fixed',
          'bottom': 0,
          'left': 0,
          'top': 0,
        })
      }
      /**
       * 左边弹出样式处理
       */
      function right() {
        popupstyle.value = 'right'
        ani.length = 0;
        ani.push('slide-right');
        clearObject(transClass);
        Object.assign(transClass,{
          'position': 'fixed',
          'bottom': 0,
          'right': 0,
          'top': 0,
        })

      }
      watch(() => props.type, (newval, oldval) => {
        funMap[newval]();
      })
      watch(() => props.modelValue, (newval, oldval) => {
        if (newval) {
          open();
        } else {
          close();
        }
      })
      watch(() => props.maskClick, (newval, oldval) => {
        mkclick.value = val
      })
      onMounted(() => {

        mkclick.value = props.maskClick
        if (ani.value) {
          duration.value = 300
        } else {
          duration.value = 0
        }
        if (props.modelValue) {
          open()
        } else {
          close();
        }
        // console.log(funMap[props.type],props.type,'%%%%%%')
        funMap[props.type]();
      })
      return {
        open,
        close,
        onTap,
        ani,
        duration,
        maskShow,
        popupstyle,
        transClass,
        showTrans,
        ...funMap
      }
    }


  }
</script>
<style lang="scss" scoped>
  .popup {
    position: fixed;
    /* #ifndef APP-NVUE */
    z-index: var(--popup-index, 999);
    /* #endif */
    // height: 100vh;

  }

  .popup-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--popup-mask-bg-color, rgba(0, 0, 0, 0.4));
    opacity: 0;
  }

  .mask {
    margin-top: var(--mask-top, 0);
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .transition-block {
    margin-top: var(--mask-top, 0);
  }

  .mask-ani {
    transition-property: opacity;
    transition-duration: 0.2s;
  }

  .top-mask {
    opacity: 1;
  }

  .bottom-mask {
    opacity: 1;
  }

  .center-mask {
    opacity: 1;
  }

  .popup-wrapper {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: absolute;
  }

  .top {
    /* #ifdef H5 */
    top: var(--window-top);
    /* #endif */
    /* #ifndef H5 */
    top: 0;
    /* #endif */
  }

  .bottom {
    bottom: 0;
  }

  .popup-wrapper-box {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: relative;
    /* iphonex 等安全区设置，底部安全区适配 */
    /* #ifndef APP-NVUE */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    /* #endif */
    flex-shrink: 0;
    max-height: 100%;
  }

  .content-ani {
    // transition: transform 0.3s;
    transition-property: transform, opacity;
    transition-duration: 0.2s;
  }


  .top-content {
    transform: translateY(0);
  }

  .bottom-content {
    transform: translateY(0);
  }

  .center-content {
    transform: scale(1);
    opacity: 1;
  }
</style>
