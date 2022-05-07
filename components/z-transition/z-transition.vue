<template>
  <view v-if="isShow" ref="Ani" class="transition" :class="[ani?.in]" :style="'transform:' +transform+';'+stylesObject"
    @click="change">
    <slot></slot>
  </view>
</template>

<script>
  // #ifdef APP-NVUE
  const animation = uni.requireNativePlugin('animation');
  // #endif
  /**
   * Transition 过渡动画
   * @description 简单过渡动画组件
   * @tutorial https://ext.dcloud.net.cn/plugin?id=985
   * @property {Boolean} show = [false|true] 控制组件显示或隐藏
   * @property {Array} modeClass = [fade|slide-top|slide-right|slide-bottom|slide-left|zoom-in|zoom-out] 过渡动画类型
   *      @value fade 渐隐渐出过渡
   *      @value slide-top 由上至下过渡
   *      @value slide-right 由右至左过渡
   *      @value slide-bottom 由下至上过渡
   *      @value slide-left 由左至右过渡
   *      @value zoom-in 由小到大过渡
   *      @value zoom-out 由大到小过渡
   * @property {Number} duration 过渡动画持续时间
   * @property {Object} styles 组件样式，同 css 样式，注意带’-‘连接符的属性需要使用小驼峰写法如：`backgroundColor:red`
   */
  import {
    watch,
    ref,
    reactive,
    nextTick,
    computed
  } from 'vue';
  export default {
    name: 'transition',
    emits: ['click', 'change'],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: Array,
        default () {
          return []
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    setup(props, {
      emit
    }) {
      let timer = null;
      let isShow = ref(false);
      let Ani = ref(null);
      let transform = ref('');
      let ani = reactive({
        in: '',
        active: ''
      });

      watch(() => props.show, (newval, oldval) => {
        if (newval) {
          open()
        } else {
          close()
        }
      })

      function change() {
        emit('click', {
          detail: isShow.value
        })
      }

      function open() {
        clearTimeout(timer)
        isShow.value = true;
        transform.value = '';
        ani.in = '';
        for (let i in getTranfrom(false)) {
          if (i === 'opacity') {
            ani.in = 'fade-in'
          } else {
            transform.value += `${getTranfrom(false)[i]} `
          }
        }
        nextTick(() => {
          setTimeout(() => {
            animation2(true)
          }, 50)
        })

      }

      function close(type) {
        clearTimeout(timer)
        animation2(false)
      }

      function animation2(type) {
        let styles = getTranfrom(type)
        // #ifdef APP-NVUE
        if (!Ani.value) return
        animation.transition(Ani.value.ref, {
          styles,
          duration: props.duration, //ms
          timingFunction: 'ease',
          needLayout: false,
          delay: 0 //ms
        }, () => {
          if (!type) {
            isShow.value = false
          }
          emit('change', {
            detail: isShow.value
          })
        })
        // #endif
        // #ifndef APP-NVUE
        transform.value = ''
        for (let i in styles) {
          if (i === 'opacity') {
            ani.in = `fade-${type?'out':'in'}`
          } else {
            transform.value += `${styles[i]} `
          }
        }
        timer = setTimeout(() => {
          if (!type) {
            isShow.value = false
          }
          emit('change', {
            detail: isShow.value
          })

        }, props.duration)
        // #endif

      }

      function getTranfrom(type) {
        let styles = {
          transform: ''
        }
        // console.log(props.modeClass,'(((((((((((((())))))))))))))')
        props.modeClass.forEach((mode) => {
          switch (mode) {
            case 'fade':
              styles.opacity = type ? 1 : 0
              break;
            case 'slide-top':
              styles.transform += `translateY(${type?'0':'-100%'}) `
              break;
            case 'slide-right':
              styles.transform += `translateX(${type?'0':'100%'}) `
              break;
            case 'slide-bottom':
              styles.transform += `translateY(${type?'0':'100%'}) `
              break;
            case 'slide-left':
              styles.transform += `translateX(${type?'0':'-100%'}) `
              break;
            case 'zoom-in':
              styles.transform += `scale(${type?1:0.8}) `
              break;
            case 'zoom-out':
              styles.transform += `scale(${type?1:1.2}) `
              break;
          }
        })
        return styles
      }

      function modeClassArr2(type) {
        let mode = props.modeClass
        if (typeof(mode) !== "string") {
          let modestr = ''
          mode.forEach((item) => {
            modestr += (item + '-' + type + ',')
          })
          return modestr.substr(0, modestr.length - 1)
        } else {
          return mode + '-' + type
        }
      }
      // getEl(el) {
      //     console.log(el || el.ref || null);
      //     return el || el.ref || null
      // },
      function toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
      const stylesObject = computed(() => {
          let styles = {
            ...props.styles,
            'transition-duration': props.duration / 1000 + 's'
          }
          let transfrom = ''
          for (let i in styles) {
            let line = toLine(i)
            transfrom += line + ':' + styles[i] + ';'
          }
          return transfrom
        })

        return {
          change,
          open,
          isShow,
          close,
          ani,
          animation2,
          getTranfrom,
          modeClassArr2,
          toLine,
          transform,
          stylesObject
        }
      }

  }
</script>

<style scoped>
  .transition {
    transition-timing-function: ease;
    transition-duration: 0.3s;
    transition-property: transform, opacity;
    display: flex;
    flex-direction: var(--transition-direction, inherit);
  }

  .fade-in {
    opacity: 0;
  }

  .fade-active {
    opacity: 1;
  }

  .slide-top-in {
    /* transition-property: transform, opacity; */
    transform: translateY(-100%);
  }

  .slide-top-active {
    transform: translateY(0);
    /* opacity: 1; */
  }

  .slide-right-in {
    transform: translateX(100%);
  }

  .slide-right-active {
    transform: translateX(0);
  }

  .slide-bottom-in {
    transform: translateY(100%);
  }

  .slide-bottom-active {
    transform: translateY(0);
  }

  .slide-left-in {
    transform: translateX(-100%);
  }

  .slide-left-active {
    transform: translateX(0);
    opacity: 1;
  }

  .zoom-in-in {
    transform: scale(0.8);
  }

  .zoom-out-active {
    transform: scale(1);
  }

  .zoom-out-in {
    transform: scale(1.2);
  }
</style>
