<template>
  <view class="top-tips" :class="[isShow ? 'top-tips-show' : '']">
    <slot>{{ title }}</slot>
  </view>
</template>

<script>
  /**
	 * topTips 顶部提示
	 * @description 该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景。
	 * @tutorial https://www.uviewui.com/components/topTips.html
	 * @example <z-top-tips class="top-tips" ref="toptips"></z-top-tips>
     * @example this.$refs.toptips.show({
              title: '这个是要展示的信息'
            })
        <style>
            .top-tips{                
                --top-tips-pad  组件内边距 默认 20rpx 30rpx;
                --top-tips-color 组件字体颜色 默认#fff
                --top-tips-top   组件top值 默认 navbar组件实际高度
                --top-tips-bg-color  组件背景色 默认 是主题色
                --top-tips-font-size 组件字体大小 默认 28rpx
            }
        </style>
	 */
  export default {
    name: "z-top-tips",
    props: {

    },
    setup() {

      let timer = null; // 定时器
      let isShow = ref(false); // 是否显示消息组件
      let title = ref(''); // 组件中显示的消息内容
      let type = 'primary'; // 消息的类型（颜色不同），primary，success，error，warning，info
      let duration = 2000; // 组件显示的时间，单位为毫秒
      function show(config = {}) {
        // 先清除定时器（可能是上一次定义的，需要清除了再开始新的）
        clearTimeout(timer);
        // 时间，内容，类型主题(type)等参数
        if (config.duration) duration = config.duration;
        if (config.type) type = config.type;
        title.value = config.title;
        isShow.value = true;
        // console.log('9999999999999999999999999999999999999999')
        // 倒计时
        timer = setTimeout(() => {
          isShow.value = false;
          clearTimeout(timer);
          timer = null;
        }, duration);
      }

      return {
        show,
        isShow,
        title,
      }
    }
  };
</script>

<style scoped>
  /* 顶部弹出类型样式 */
  .top-tips {
    --height: 88rpx;
    --top: calc(var(--status-bar-height) + var(--navbar-height, var(--height)));
    --pad: 20rpx 30rpx;
    --font: 28rpx;
    width: 100%;
    position: fixed;
    z-index: 1;
    padding: var(--top-tips-pad, var(--pad));
    color: var(--top-tips-color, #fff);
    font-size: var(--top-tips-font-size, var(--font-main, var(--font)));
    top: var(--top-tips-top, var(--top));
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    /* // 此处为最核心点，translateY(-100%)意味着将其从Y轴隐藏（隐藏到顶部(h5)或者说导航栏(app)下面） */
    transform: translateY(-100%);
    transition: all 0.35s linear;
    background-color: var(--top-tips-bg-color, var(--color-theme));
  }

  .top-tips-show {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
    z-index: 99;
  }
</style>
