<template>
  <view class="flex-font-box" :style="fontStyle">{{content}}</view>
</template>
<script>
  /**
     * 弹性字体
     * @description 根据宽度变化字体大小
     * @tutorial https://www.zviewui.com/components/button.html
     * @example <z-flex-font content="sdfasdsdf asd asd adsf "></z-flex-font>
       <style>

           
       </style>
     
     */
  import {
    ref,
    reactive,
    watch,
    computed,
    getCurrentInstance,
    onBeforeMount,
    nextTick
  } from "vue";
  import {range} from "../../utils/random.js";
  import {isEnOrNum} from "../../utils/test.js";
  export default {
    name: "z-flex-font",
    props: {
      content: {
        type: String,
        required: true,
        default: ''
      },
      max: {
        type: [Number, String],
        default: ''
      },
      min: {
        type: [Number, String],
        default: 24
      },
    },
    setup(props,{}) {

      const {
        proxy
      } = getCurrentInstance();
      let fontBoxWidth = ref(0);
      let timer = null;
      watch(() => props.content, (newval, oldval) => {
        setTimeout(getWidth, 300)
      });
      onBeforeMount(()=>{
       timer =  setInterval(getWidth,300);
        
      })
      let fontStyle = computed(() => {

        let {
          max,
          min,
          content
        } = props;
        if (!content || fontBoxWidth.value == 0) {
          return '';
        }
        // console.log(fontBoxWidth.value,content.length)
        
        let fontsize = fontBoxWidth.value  / content.length * (isEnOrNum(content)?1.8899: 1);
        // console.log(fontBoxWidth,content.length,fontsize,'8888888888888888888888888');
        if (!max) {
          max = fontsize
        } else {
          max = uni.upx2px(Number(max));
        }
        if (!min) {
          min = fontsize
        } else {
          min = uni.upx2px(Number(min));
        }
        // console.log(min,max,fontsize);
         return `--font-size: ${range(min,max,fontsize)}px;`
        

      });

      function getWidth() {
        /// **************************注意********************************c
        /// **************************注意********************************c
        /// **************************注意********************************c
        /// **************************注意********************************c
        /// **************************注意********************************c
        /// 原来是有this的，但是vue3 没有this了， 所以要看看效果是否有问题
        // uni.createSelectorQuery().in(this).select('.flex-font-box').fields({
        uni.createSelectorQuery().in(proxy).select('.flex-font-box').fields({
          size: true,
          rect: true,
          scrollOffset: true,
        }, data => {
          // console.log("得到布局位置信息" + JSON.stringify(data));
          // console.log("节点离页面顶部的距离为" + data.top);
          if (data) {
            // console.log(data)
            clearInterval(timer);
            timer = null;
            fontBoxWidth.value = parseFloat(data.width);

          }
        }).exec();
      }

      return {
        fontStyle,
      }

    }
  }
</script>


<style scoped>
  .flex-font-box {
    max-width: 100%;
    width: auto;
    max-height: 100%;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    /* 强制英文单词断行  */
    font-size: var(--font-size, inherit)
  }
</style>
