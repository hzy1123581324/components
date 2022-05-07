<template>

  <view class="navbar-box clear" :style="`--status-height:${statusheight}px;--navbar-fixed:${
      isFixed ? 'fixed' : 'relative'
    }`">
    <view :class="['navbar-fixed-box clear', border && 'navbar-border']">
      <view :class="['navbar-left', showBack && 'hasback']">
        <slot name="left">
          <view class="navbar-left-icon" @click="goBack" v-if="showBack">
            <z-icon :type="backIconName" class="back-icon" ></z-icon>
          </view>
          <z-avatar class="back-avatar" :src="src" mode="circle" :size="size" v-if="avatar"></z-avatar>
          <text class="backTxt" v-if="hasbacktxt" @click="goBack">{{ backTxt }}</text>
        </slot>
      </view>
      <view class="navbar-center">
        <slot></slot>
      </view>
      <view class="navbar-right">
        <slot name="right">
          
          <view class="navbar-right-icon" v-for="item in actionsList" :style="`--bg:url('${item.logo}');`" :key="item.logo" @click="jump(item.url,item.param)">
          </view>

        </slot>
      </view>
      <view class="navbar-full flex flex-center-y">
        <slot name="full"></slot>
      </view>
    </view>
  </view>
</template>

<script>
  /**
     * navbar 自定义导航栏
     * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。
     * @tutorial https://www.uviewui.com/components/navbar.html
     * @property {String} back-text 返回图标右边的辅助提示文字
     * @property {Function} custom-back 自定义返回逻辑方法
     * @property {Boolean} is-back 是否显示导航栏左边返回图标和辅助文字（默认true）
     * @property {Boolean} is-fixed 导航栏是否固定在顶部（默认true）
     * @example <z-navbar class="navbar" back-text="返回" title="这是个标题"></z-navbar>
     * <style>
     * 
     * .navbar{
       --navbar-color: 导航栏默认字体颜色 #333
       --navbar-height: 导航栏高度， 默认98rpx
       --navbar-fixed: 是否固定在顶部 
       --navbar-back-icon-size: 返回图标尺寸大小
       --navbar-fixed-bg-color： 导航栏背景色
       --navbar-fixed-bg-img:  导航栏图片
       --navbar-title-font: 导航栏标题字体大小 默认34rpx
       --navbar-title-weight： 导航栏标题之重 默认500
       --navbar-rg-font: 导航栏右边字体大小  默认32rpx
       --navbar-lf-font: 导航栏左边字体大小  默认32rpx
       --navbar-center-width: 导航标题宽度
       --navbar-pad-lf: 导航栏 左边内边距  默认 1em
       --navbar-pad-rg: 导航栏 右边内边距 默认 1em
     }
     * 
    
     </style>
     */
    import {
      ref,
      computed,
      onMounted,
      nextTick
    } from "vue";
    import {
      useStore
    } from 'vuex';
    import {jump} from '../../composition/public.js';
    
    import {isArray} from "../../utils/test.js";
    export default {
      emits: ['navbarHeight'],
      props:{
        // 是否显示返回
        showBack: {
          type: Boolean,
          default: true,
        },
        // 当值是true时，不占位
        isFixed: {
          type: Boolean,
          default: false,
        },
        // 左边返回的图标
        backIconName: {
          type: String,
          default: "icon-arrow-left",
        },
        backTxt: {
          type: String,
          default: "返回",
        },
        backicon: {
          type: String,
          default: "",
        },
        hasbacktxt: {
          type: Boolean,
          default: false,
        },
        // 命名不规范，以后废弃使用下面的 onCustomBack
        customBack: {
          type: [Function, null],
          default: null,
        },
        // 自定义返回逻辑
        onCustomBack: {
          type: [Function, null],
          default: null,
        },
        /// 是否显示底部边框
        border: {
          type: [String, Boolean],
          default: false,
        },
        avatar: {
          type: Boolean,
          default: false,
        },
        // 右上角图标
        actions: {
          type: [Array,Boolean],
          default: []
        },
        
        /// 上面头像的url
        src: {
          type: String,
          default: "",
        },
        /// 上面头像的尺寸
        size: {
          type: [String, Number],
          default: "default",
        },
      },
      setup(props,{emit}){
        let statusheight = ref(0);
        // 图标生成
        const actionsList = computed(()=>{
          if( isArray(props.actions) && props.actions.length>0||props.actions===false){
            return props.actions||[];
          }else{
            const store = useStore();
            return store.state.actions||[]
          }
        });
        onMounted(() => {
          uni.getSystemInfo({
            success: (res) => {
              // 有些手机没有设置--status-bar-height
              statusheight = res.statusBarHeight;
            },
          });
          nextTick(() => {
            uni
              .createSelectorQuery()
              .in()
              .select(".navbar-fixed-box")
              .fields({
                  size: true,
                  rect: true,
                  scrollOffset: true,
                },
                (data) => {
                  // console.log( "得到布局位置信息" + JSON.stringify(data));
                  // console.log("节点离页面顶部的距离为" + data.top);
                  if (data) {
                    // tabsScrollWidth = data.width;
                    emit("navbarHeight", data.height);
                  }
                }
              )
              .exec();
          });
        });
        
        function goBack() {
          // 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
          // customBack以后要废弃
          // customBack以后要废弃
          // customBack以后要废弃
          // customBack以后要废弃
          // customBack以后要废弃
          // customBack以后要废弃
          // customBack以后要废弃
          if (typeof props.customBack === "function") {
            props.customBack();
          } else if (typeof props.onCustomBack === "function") {
            props.onCustomBack();
          } else {
            // console.log(getCurrentPages(),'((((((((((()))))))))))');
            // 只有一个页面，返回到首页
            if(getCurrentPages().length==1){
              if(uni.getStorageSync('lastRouter')){
                // console.log(uni.getStorageSync('lastRouter').path);
                uni.switchTab({
                  url: uni.getStorageSync('lastRouter').path
                })
              }else{
                uni.reLaunch({
                  url: "/"
                })
              }
              
            }else{
              uni.navigateBack();
            }
          }
        }
        // let  navbarStyle = computed(()=>{
        // 	//     let style = '';
        // 	//     let {
        // 	//         isFixed
        // 	//     } = this;
        // 	//     if (!isFixed) {
        // 	//         style += '--navbar-fixed: relative';
        // 	//     }
        
        // 	//     return style
        // })
        return {
          goBack,
          computed,
          jump,
          statusheight,
          actionsList
        }
      }
    }
  
 
</script>

<style scoped lang="scss">
  .clear::after,
  .clear::before {
    content: "";
    display: table;
    clear: both;
  }

  .navbar-box {
    --status-height: 0;
    --height: 88rpx;
    --center-width: 300rpx;
    padding-top: var(--status-bar-height, var(--status-height));
    height: var(--navbar-height, var(--height));
    width: 100%;
    // box-sizing: border-box;
    position: var(--navbar-fixed);
    color: var(--navbar-color, var(--color-main, #333));
    box-sizing: content-box;
    /* #ifndef APP-NVUE */
    flex-shrink: 0;
    /* #endif */
    // background-color: red;
    // background-image: linear-gradient(to bottom,red 0,red 88rpx, blue 88rpx, blue 100%);
    z-index: var(--navbar-index, 99);
  }

  .navbar-fixed-box {
    width: 100%;
    position: fixed;
    padding-top: var(--status-bar-height, var(--status-height));
    height: var(--navbar-height, var(--height));
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    /* box-shadow: 0 1rpx 0 0 #f4f4f4; */
    background-color: var(--navbar-fixed-bg-color, #fff);
    background-image: var(--navbar-fixed-bg-img);
    box-sizing: content-box;
    // opacity: 0;
  }

  .navbar-left {
    --pad-lf: 15rpx;
    --font: 32rpx;
    width: calc((100vw - var(--navbar-center-width, var(--center-width))) / 2);
    height: 100%;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    padding-left: var(--navbar-pad-lf, var(--pad-lf));
    font-size: var(--navbar-lf-font, var(--font));
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
    /* background-color: red; */
  }

  .navbar-left.hasback {
    opacity: 1;
    pointer-events: auto;
  }

  .backTxt {
    padding-left: 0.3em;
    color: inherit;
  }
  .navbar-left-icon{
    --size: 50rpx;
    --icon-size: var(--navbar-back-icon-size, var(--size));
    background-image: var(--navbar-back-bg);
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
    width: var(--navbar-back-icon-size, var(--size)) ;
    height: var(--navbar-back-icon-size, var(--size));
  }


  .back-icon {
    opacity: var(--navbar-back-icon-default-opacity,1);
    // --icon-color: inhert;
  }

  .back-avatar {
    margin-left: 10rpx;
  }

  /* 标题中部 */
  .navbar-center {
    --font: 34rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    /*文本溢出显示省略号*/
    white-space: nowrap;
    /*文本不会换行（单行文本溢出）*/
    width: var(--navbar-center-width, var(--center-width));
    height: 100%;
    // line-height: var(--navbar-height, var(--height));
    font-size: var(--navbar-title-font, var(--font));
    font-weight: var(--navbar-title-weight, 500);
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: var(--navbar-center-justify-content,center);
    // text-align: center;
  }

  /*  */
  .navbar-right {
    --font: 28rpx;
    width: calc((100vw - var(--navbar-center-width, var(--center-width))) / 2);
    height: 100%;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    align-content: center;
    justify-content: flex-end;
    font-size: var(--navbar-rg-font, var(--font));
    padding-right: var(--navbar-pad-rg, 1em);
  }

  .navbar-full {
    width: 100%;
    height: var(--navbar-height, var(--height));
    position: absolute;
    padding-top: var(--status-bar-height, var(--status-height));
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-sizing: content-box;
    background-color: inherit;
    // background-color: blue;
  }

  .navbar-full:empty {
    opacity: 0;
    pointer-events: none;
  }

  .navbar-border {
    /* --btm: 0 1rpx 0 0 #f4f4f4; */
    --btm: none;
    box-shadow: var(--navbar-btm, var(--btm));
    border-bottom: solid 1rpx #ececec;
  }
  .navbar-right-icon{
    width: var(--navbar-right-icon-width);
    height: var(--navbar-right-icon-height);
    background-image: var(--bg);
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .navbar-right-icon+.navbar-right-icon{
    margin-left: var(--navbar-right-pad-lf,unset);
  }
</style>
