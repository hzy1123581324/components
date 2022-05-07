<template>
    <view class="read-more-box" :style="globalStyle">
        <view class="content-box" :style="contentStyle">
            <view class="content">
                <slot></slot>
            </view>
        </view>
        <view @tap="toggleReadMore" class="showmore-wrap" v-show="showSwitch">
            <!-- 状态：展开 -->
            <view class="" v-show="!showAll">
                <slot name='read-all'>
                    <view class="read-button">
                        <text>{{openText || i18n.fw_337}}</text>
                        <text class="drop"></text>
                    </view>
                </slot>
            </view>
            <!-- 状态：收起 -->
            <view class="" v-show="showAll&&toggle">
                <slot name='read-less'>
                    <view class="read-button">
                        <text>{{closeText || i18n.fw_336}}</text>
                        <text class="drop active"></text>
                    </view>
                </slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * readMore 阅读更多
     * @description 该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。
     * @tutorial https://www.uviewui.com/components/readMore.html
     * @property {String Number} show-height 内容超出此高度才会显示展开全文按钮，单位rpx（默认400）
     * @property {Boolean} toggle 展开后是否显示收起按钮（默认false）
     * @property {String} close-text 关闭时的提示文字
     * @property {String} open-text 展开时的提示文字
     * @property {Boolean} load 异步加载状态
     * @property {String} color 提示文字的颜色（默认#2979ff）
     * @example <read-more></read-more>
     */
    import {ref,computed,watch,onMounted,getCurrentInstance} from 'vue';
    export default {
        name: "read-more",
        emits:['showall'],
        props: {
            // 默认的显示占位高度，单位为rpx
            showHeight: {
                type: [Number, String],
                default: 400
            },
            // 展开后是否显示"收起"按钮
            toggle: {
                type: Boolean,
                default: true
            },
            // 关闭时的提示文字
            closeText: {
                type: String,
                default: ''
            },
            // 展开时的提示文字
            openText: {
                type: String,
                default: ''
            },
            // 提示的文字颜色
            color: {
                type: String,
                default: ''
            },
            // 异步加载完时为true
            load: {
                type: Boolean,
                default: false,
            },
            //  是否展开全部
            showall: {
                type: Boolean,
                default: false,
            }

        },
        setup(props,{emit}){
          const { proxy } = getCurrentInstance();
          let ActualHeight = ref(0);
          let  showSwitch = ref(false);
         let  eventHeight  = ref(0);
          watch(()=>props.load,(newval,oldval)=>{
            init();
          })
          let showAll = computed({
            set(val){
              emit('update:showall',val);
            },
            get(){
              return props.showall
            }
          })
           
          const  contentStyle = computed(()=>{
            return `height: ${ActualHeight.value}px;`
          });
          
         const  globalStyle = computed(()=>{
           return `${ color: props.color||''}`
         });
        function  init() {
             let view = uni.createSelectorQuery().in(proxy).select('.content');
             view.boundingClientRect(data => {
                 // console.log("得到布局位置信息" + JSON.stringify(data));
                 let limitHeight = uni.upx2px(props.showHeight);
                 eventHeight.value = data.height;
                 // 如果全部文本高度小于限制高度，拿文本高度
                 if (data.height - limitHeight <= 0) {
                     ActualHeight.value = data.height;
                     showSwitch.value = false;
                     // 文本高度大于限制高度，拿限制高度
                 } else {
                     ActualHeight.value = limitHeight;
                     showSwitch.value = true;
                 }
         
             }).exec();
         },
         // 展开或者收起
        function toggleReadMore() {
             showAll.value = !showAll.value;
             if (showAll.value) {
                 ActualHeight.value = eventHeight.value;
             } else {
                 ActualHeight.value = uni.upx2px(props.showHeight);
             }
         }
         onMounted(()=>{
           init();
         })
           return {
             showAll,
             globalStyle,
             contentStyle,
             init,
             toggleReadMore,
             ActualHeight,
             showSwitch,
             eventHeight,
             
           }
        },
    };
</script>

<style scoped>
    .read-more-box {
        --color: #2979ff;
    }

    .content-box {
        height: 0;
        overflow: hidden;
        transition: height ease-in-out 0.3s 0s;
    }

    /* 点击展开，点击收起 */
    .read-button {
        /* width: 120rpx; */
        margin: 0 auto;
        color: var(--color);
        text-align: var(--algin,center);
        font-size: 24rpx;
        line-height: 33rpx;
        margin-top: 20rpx;
    }

    .drop {
        display: inline-block;
        width: 16rpx;
        height: 18rpx;
        border-bottom: 9rpx solid transparent;
        border-top: 9rpx solid transparent;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        border-top-color: var(--color);
        border-bottom-color: transparent;
        margin-top: 8rpx;
        margin-left: 10rpx;
        vertical-align: middle;

    }

    .drop.active {
        border-bottom-color: var(--color);
        border-top-color: transparent;
        margin-top: -12rpx;
    }
</style>
