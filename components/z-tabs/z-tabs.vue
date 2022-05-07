<template>
  <view class="tabs-box">
    <scroll-view id="scroll-box" ref="scrollBox" :show-scrollbar="false" class="scroll-box" scroll-x="true"
      :scroll-left="scrollLeft" scroll-with-animation="true" :style="scrollStyle">
      <view class="scroll-list-box">
        <view :class="['tabs-items',type]" ref="tabsItems">
          <view :id="'tabs_'+index" :class="['tabs-item',activeIndex==index&&'active',isfull&&'full']"
            v-for="(item,index) in list" :key="item.id" @click="tabtap(index)">
            <slot name="tabs-item" :item="item" :active="activeIndex==index">
              {{item[keyname]}}
            </slot>
          </view>
        </view>
        <view class="tabs-progress"></view>
      </view>
    </scroll-view>
    <view class="tab-between">
      <slot name="between"></slot>
    </view>
    <!-- 滚动页面插槽 -->
    <scroll-view id="tabsScroll" :show-scrollbar="false" :scroll-with-animation="panelAnimation" scroll-x="true"
      :scroll-left="scrollLeft_2" :scroll-into-view="'tabs-panel-'+activeIndex" @scroll="tabchange">
      <view class="scroll-view-tabs">
        <slot></slot>
      </view>
    </scroll-view>
  </view>
</template>

<script>
 
  import {
    ref,
    reactive,
    onMounted,
    computed,
    watch,
    nextTick,
    getCurrentInstance
  } from 'vue';
  import {
    range
  } from "../../utils/random.js";
  import {
    getElQueryFields
  } from '../../utils/sysAPI.js';
  /**
     * tabs 滚动标签
     * @description 该组件用于横向滚动标签
     * @tutorial https://www.uviewui.com/components/noticeBar.html
     * @property {Array} list 滚动内容，数组形式，见上方说明
     * @property {String} keyname = ['name']  对象数组要显示的键名
     * @property {String NUmber} index 初始激活下标index，父元素通过watch index来处理需求progressWidth
     * @property {String} type = ['left']  标签的排列方式
     * @property {String NUmber} progressWidth 下划线宽度，默认不传是选中标签的宽度
     * @property {Boolean} panelAnimation 切换标签子组件tabs-panel是否有动画效果，默认true 有动画效果
     * @property {Boolean} isfull 标签是否平分组件宽度 
     * @property {Boolean} reload 是否重新渲染默认是false,内部会自动转换为false，
     * @event {Function} selItem 点击标签，将下标赋值给activeIndex
     * @example <tabs :more-icon="true" :list="list"></tabs>
     * @example <tabs v-model:index="index" :list="list"></tabs>
     * @example <tabs class="tabs" v-model:index="index" :list="list"></tabs>
     * @example <tabs class="tabs" v-model:index="index" v-model:reload="reload" :list="list"></tabs>
     * <style>
         .tabs{
            --tab-bg:  组件背景色
            --tabs-height： 组件高度
            --tab-min-width: 标签最小宽度
            --tab-max-width: 标签最大宽度
            --tab-item-weight 标签未激活后字体粗细  默认400
            --tab-item-font  标签未激活字体大小  默认28rpx
            --tab-item-color 标签未激活颜色  默认#86909B
            --tab-space  标签左右内边距  默认0.5em
            --tabs-bg-color  组件背景色
            --tab-mar-space 标签之间的间隔
            --tabs-pad-btm: 标签文本不垂直是使用 默认是0
            --tabs-pad-top:  标签文本不垂直是使用 默认是0
            
            --tab-item-active-weight 标签激活后字体粗细  不设置使用未激活标签的字重
            --tab-item-active-font 标签激活后的字体大小  默认28rpx
            --tab-item-active-color： 标签激活后的颜色  #111
            --tab-item-active-family: 标签激活后的使用的字体 默认是继承
            
            --tabs-progress-color: 下划线样式  默认 #EA4D5E
            --tabs-progress-width: 下划线宽度  不设等于激活标签宽度
            --tabs-progress-height: 下划线高度  默认4rpx
            --tabs-progress-top： 下划线顶部定位 默认unset
            --tabs-progress-btm   下划线底部定位 默认 0
            --tabs-progress-shadow  下划线阴影 默认没有阴影
         }
     </style>
     */
  export default {
    name: 'tabs',
    emits: ['update:index', 'tabtap', 'update:reload'],
    props: {
      list: {
        required: true,
        type: Array,
        default: () => {
          return [];
        }
      },
      keyname: {
        type: String,
        default: 'name'
      },
      type: {
        type: String,
        default: 'left'
      },
      // 
      index: {
        required: true,
        type: [String, Number],
        default: 0,
      },
      // 滑动条的宽度， 单位rpx
      progressWidth: {
        type: [String, Number],
      },
      // panel是否动画效果
      panelAnimation: {
        type: [Boolean],
        default: true,
      },
      // 是否占满剩余宽度
      isfull: {
        type: [Boolean],
        default: false,
      },
      // 是否重新获取
      reload: {
        type: Boolean,
        default: false,
      }

    },
    setup(props, {
      emit
    }) {
      const {
        proxy
      } = getCurrentInstance();
      // activeIndex: 0,
      let progressLeft = ref(0);
      let itemWidth = ref(0);
      let transitionProgress = ref(false);
      let scrollLeft = ref(0);
      let scrollLeft_2 = ref(0);
      let timer = '';
      // tabsScrollWidth: 0,
      let tabsScrollWidth = 0;
      onMounted(() => {
        if (props.list.length > 0) {
          check();
        }
        console.log(props.reload,'^^^^^^1111onshow^^^^^^^^^^^^^^^^^');
        getElQueryFields('#tabsScroll', proxy).then(data => {
          if (data) {
            tabsScrollWidth = data.width;
          }
        })
      })


      function tabtap(index) {
        activeIndex.value = index;
        emit('tabtap', index);
      }

      function check() {
        console.log('%%%%%%%%%%');
        nextTick(async () => {
          const scrollBoxData = await getElQueryFields("#scroll-box", proxy);
          if (!scrollBoxData) {
            return setTimeout(check, 300);
          }
          console.log(scrollBoxData);
          let scrollRectLeft = scrollBoxData.left;
          let scrollWidth = scrollBoxData.width; //组件的实际宽度
          let halfscroll = scrollBoxData.width / 2;
          const fields = {
            size: true,
            rect: true,
          }
          const itemData = await getElQueryFields(".tabs-items", proxy, fields);
          if (!itemData || itemData.width == 0) {
            return setTimeout(check, 300);
          }
          console.log(itemData,'.tabs-items的节点信息')
          let allwidth = itemData.width; //组件的实际宽度
          let allitemsLeft = itemData.left;
          let maxScroll = allwidth - scrollWidth; //
          let minScroll = 0;


          const data = await getElQueryFields("#tabs_" + activeIndex.value, proxy, fields);
          if (!data || data.width == 0) {
            return setTimeout(check, 300);
          }
          console.log(data);
          itemWidth.value = data.width;
          const ScrollLeft = data.left + data.width / 2 - scrollRectLeft - halfscroll -
            allitemsLeft;
          const ProgressWidth = props.progressWidth ? uni.upx2px(props.progressWidth) : data.width;
          progressLeft.value = data.left + data.width / 2 - scrollRectLeft - (ProgressWidth / 2) -
            allitemsLeft;
          console.log(progressLeft.value,data.left,data.width/2 , scrollRectLeft,(ProgressWidth/2), allitemsLeft,'7777777777777777777++++');
          console.log(minScroll, maxScroll, ScrollLeft,props.reload);
          let scrollLeftEnd = range(minScroll, maxScroll, ScrollLeft);
          // 手动滚动后复原
          if (scrollLeftEnd == scrollLeft.value && props.reload) {
            scrollLeft.value = scrollLeftEnd - 0.000001
          } else {
            scrollLeft.value = scrollLeftEnd;
          }
          console.log(scrollLeft.value,'6666666666666')
          // scrollLeft.value = range(-maxScroll, minScroll, ScrollLeft);
          // console.log(scrollLeft.value,'********1111111112222222222');
        })
      }

      function tabchange(e) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          scrollLeft_2.value = e.detail.scrollLeft;
          activeIndex.value = Math.round(e.detail.scrollLeft / tabsScrollWidth);
          nextTick(() => {
            scrollLeft_2.value = activeIndex * tabsScrollWidth;
          })
        }, 100)
      }


      const activeIndex = computed({
        get() {
          return props.index;
        },
        set(newval) {
          emit('update:index', newval);
          transitionProgress.value = true;
          if (props.list.length > 0) {
            nextTick(() => {
              check();
            })
            // setTimeout(check, 0)
          }
        }
      });
      const scrollStyle = computed(() => {
        let styleTxt = '';
        // console.log('3333333334444444444444')
        // 下划线的宽度
        styleTxt +=
          `--tabs-progress-width:${props.progressWidth?uni.upx2px(props.progressWidth):itemWidth.value}px;`;
        // 下划线偏移量
        if (progressLeft.value || progressLeft.value == 0) {
          styleTxt += '--scoll-left:' + progressLeft.value + 'px;'
        }

        if (transitionProgress.value) {
          styleTxt += '--transition-progress: all ease-in-out 0.3s 0s;'

        }
        return styleTxt;
      });
      watch(() => props.reload, (newval, oldval) => {
          console.log(newval,'reload++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (newval) {
          console.log('-----------');
          setTimeout(check, 100)
          setTimeout(()=>{
            emit('update:reload', false);
          },400)
          
     
        }

      });
      watch(() => props.list, (newval, oldval) => {
        if (newval.length > 0) {
          // console.log(newval,'list++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
          setTimeout(check, 300)
        }

      });

      return {
        activeIndex,
        scrollStyle,
        tabchange,
        scrollLeft,
        scrollLeft_2,
        tabtap,
      }
    }
  }
</script>

<style scoped>
  .tabs-box ::v-deep .uni-scroll-view{
    overflow: auto hidden !important;
  }
  .scroll-box {
    --tab-h: 80rpx;
    height: var(--tabs-height, var(--tab-h));
    position: relative;
    box-sizing: border-box;
  }

  .scroll-list-box,
  .tabs-items {
    height: 100%;
    min-height: 100%;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    box-sizing: border-box;
    background-color: var(--tabs-bg-color, rgba(0, 0, 0, 0));
  }

  .tabs-items.center {
    justify-content: center;
    justify-items: center;
  }

  .tabs-items {
    flex-shrink: 0;
    min-width: 100%;
    /* line-height: var(--tabs-height, var(--tab-h)); */
    /* background-color: var(--tab-bg); */
  }

  .tabs-item {
    --tab-font: 28rpx;
    --min-w: 74rpx;
    flex-shrink: 0;
    max-width: var(--tab-max-width, unset);
    width: auto;
    min-width: var(--tab-min-width, var(--min-w));
    font-weight: normal;
    font-size: var(--tab-item-font, var(--tab-font));
    color: var(--tab-item-color, #86909B);
    text-align: center;
    font-weight: var(--tab-item-weight, 400);
    padding: var(--tabs-pad-top, 0) var(--tab-space, 0.5em) var(--tabs-pad-btm, 0);
    transition: color ease-in-out 0.3s 0s;
    box-sizing: border-box;
    /* line-height: calc( var(--tabs-height, var(--tab-h)) - var(--tabs-pad-btm,0) - var(--tabs-pad-top,0)); */
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .tabs-item.active {
    font-weight: var(--tab-item-active-weight, var(--tab-item-weight, 400));
    font-size: var(--tab-item-active-font, var(--tab-item-font, var(--tab-font)));
    color: var(--tab-item-active-color, #111);
    font-family: var(--tab-item-active-family, inherit);
  }

  .tabs-item.full {
    flex-grow: 1;
  }

  .tabs-item+.tabs-item {
    margin-left: var(--tab-mar-space, 0em);
  }


  .tabs-progress {
    --height: 4rpx;

    position: absolute;

    top: var(--tabs-progress-top, unset);
    /* top与bottom两个只可设置一个 */
    bottom: var(--tabs-progress-btm, 0);
    left: var(--scoll-left, -100%);
    /*-100% 初始隐藏*/
    width: var(--tabs-progress-width);
    height: var(--tabs-progress-height, var(--height));
    background-color: var(--tabs-progress-color, #EA4D5E);
    background-image: var(--tabs-progress-img, unset);
    background-repeat: no-repeat;
    background-position: var(--tabs-progress-position, top center);
    background-size: var(--tabs-progress-bg-size, unset);
    transition: var(--transition-progress, none);
    box-shadow: var(--tabs-progress-shadow, none);
    border-radius: var(--tabs-progress-radius, 0);
  }

  .scroll-view-tabs {
    display: flex;
    width: 100%;
  }

  scroll-view>>>.uni-scroll-view::-webkit-scrollbar {
    display: none;
  }
</style>
