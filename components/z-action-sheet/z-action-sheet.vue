<template>
  <z-popup type="bottom" v-model="actionSheetShow" @change="modelChange">
    <view class="action-sheet-box flex-reverse">
      <view class="action-sheet-title">
        <view class="action-sheet-title-txt">
          <slot name="title"></slot>
        </view>
        <!-- <u-icon class="action-sheet-title-icon" name="close" color="#AFBBC4" @click.native="actionSheetShow=false"></u-icon> -->
      </view>
      <view class="place"></view>
      <scroll-view scroll-y="true" class="action-sheet-items">
        <slot>
          <view class="action-sheet-item" v-for="(item,index) in list" :key="item.id||item[keyName]"
            @click="sellItem(index)">
            {{item[keyName]}}
          </view>
        </slot>
      </scroll-view>
      <view class="place"></view>
    </view>
  </z-popup>
</template>

<script>
  /**
     * action-sheet 底部选择面板
     * @description 用于选择列表中的某一项
     * @tutorial https://www.zviewui.com/components/action-sheet.html
     * @property {String} keyName 列表项要展示的数据，默认是 title
     * @property {Array} list  要展示的数据 默认 是空列表 
     * @property {Boolean} selAfterClose 选择后是否关闭，默认是关闭 
     * @property {String,Number } index 选中那一项默认是空字符
     * @example <z-action-sheet class="action-sheet" :list="list" v-model:index='index' v-model="modelValue"></z-action-sheet>
     * @example <z-action-sheet class="action-sheet" :list="list" :active.sync='active' :show.sync="show"></z-action-sheet>

        <style>
            .action-sheet{
                --action-sheet-bg-color: 组件底色 ；默认#F5F7F9
                --action-sheet-radius： 组件圆角度 默认 10rpx
                --action-sheet-font-item-height: 列表项的高度 默认98rpx
                --action-sheet-font-size: 组件字体大小
                --action-sheet-item-font: 组件列表项字体大小，默认继承父元素
                --action-sheet-item-color 组件列表项字体颜色， 默认#14191D
                --action-sheet-item-bg-color 组件列表项背景色 ， 默认白色
            }
        </style>
     */
  import {
    computed
  } from 'vue';
  let timer = '';
  export default {
    name: 'z-action-sheet',
    props: {
      modelValue: {
        required: true,
        type: Boolean,
        default: false,
      },
      keyName: {
        type: String,
        default: 'name',
      },
      list: {
        required: true,
        type: Array,
        default: () => {
          return []
        }
      },
      // 选择后是否关闭
      selAfterClose: {
        type: Boolean,
        default: true
      },
      index: {
        required: true,
        type: [String, Number],
        default: 0,
      }
    },
    setup(props, {
      emit
    }) {

      const actionSheetShow = computed({
        set(val) {
          emit("update:modelValue", val)
        },
        get() {
          return props.modelValue;
        }
      })

      function modelChange(data) {
        // console.log(data,'监听popup变化');
        emit('change', data);
      }

      function sellItem(index) {
        emit("update:index", index);
        if (props.selAfterClose) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            actionSheetShow.value = false;
          }, 600)
        }
      }
      return {
        sellItem,
        modelChange,
        actionSheetShow
      }
    }
  }
</script>
<style scoped>
  .action-sheet-box {
    --font-main: 28rpx;
    --radius: 10rpx;
    --item-height: 98rpx;
    background-color: var(--action-sheet-bg-color, #F5F7F9);
    border-radius: var(--action-sheet-radius, var(--bor-radius, var(--radius))) var(--action-sheet-radius, var(--bor-radius, var(--radius))) 0px 0px;
    font-size: var(--action-sheet-font-size, --font-main);
    overflow: hidden;
    width: var(--action-sheet-width, 100vw);
    margin: 0 auto;
    max-height: var(--action-sheet-max-height, 80%);

  }

  .action-sheet-title {
    height: var(--action-sheet-font-item-height, var(--item-height));
    display: flex;
    justify-content: space-between;
    padding: 0 37rpx;
    align-items: center;
  }

  .account-item-title-txt {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 33px;
    color: #14191D;
  }

  .action-sheet-title-icon {
    font-size: 24rpx;
    color: var(--action-sheet-icon-color, #AFBBC4);
  }

  .action-sheet-items {
    max-height: 50vh;
  }

  .action-sheet-item {
    height: var(--action-sheet-font-item-height, var(--item-height));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: var(--action-sheet-item-font, inherit);
    font-weight: 400;
    color: var(--action-sheet-item-color, #14191D);
    background-color: var(--action-sheet-item-bg-color, #fff);
  }

  .action-sheet-item+.action-sheet-item {
    margin-top: 2rpx;
  }

  .place {
    height: 40rpx;
    background-color: var(--action-sheet-item-bg-color, #fff);
  }
</style>
