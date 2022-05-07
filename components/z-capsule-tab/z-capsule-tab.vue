<template>
  <view class="capsule-tab-box" :style="varStyle">
    <view class="capsule-tab-views">
      <view :class="['capsule-tab-item',activeIndex==index&&'active']" v-for="(item,index) in list" :key="item.id"
        @click="activeIndex = index">
        {{item[keyname]}}
      </view>
    </view>
    <view class="capsule-tab-shadow"></view>
  </view>
</template>

<script>
  /**
   * Calendar 胶囊标签
   * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
   * @tutorial https://ext.dcloud.net.cn/plugin?id=56
   * @property {String} date 自定义当前时间，默认为今天
   * @property {Boolean} lunar 显示农历
   * @property {String} startDate 日期选择范围-开始日期
   * @property {String} endDate 日期选择范围-结束日期
   * @property {Boolean} range 范围选择
   * @property {Boolean} insert = [true|false] 插入模式,默认为false
   *     @value true 弹窗模式
   *     @value false 插入模式
   * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
   * @property {Boolean} showMonth 是否选择月份为背景
   * @event {Function} change 日期改变，`insert :ture` 时生效
   * @event {Function} confirm 确认选择`insert :false` 时生效
   * @event {Function} monthSwitch 切换月份时触发
   * @example <calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
   */
  import {computed} from 'vue';
  export default {
    name: 'capsule-tab',
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
        default: 'name',
      },
      index: {
        type: [String, Number],
        default: 0,
      }
    },
    setup(props,{emit}){
     const activeIndex = computed({
       set(newval){
         emit('update:index', newval)
       },
       get(){
         return props.index
       }
     });
      
     const  varStyle = computed(()=>{
        let {
          list,
          activeIndex,
        } = props;
        let percentageWidth = 100 / list.length;
        let percentageLeft = activeIndex / list.length * 100;
        return `--percentageWidth: ${percentageWidth}%;--shadow-bg-lf:${percentageLeft}%; `
      });
    },
  }
</script>

<style scoped>
  .capsule-tab-box {
    position: relative;
    overflow: hidden;
    --height: 78rpx;
    height: var(--capsule-tab-height, var(--height));
    border-radius: var(--capsule-tab-radius, calc(var(--capsule-tab-height, var(--height)) / 2));
    text-align: center;
    --transition: all ease-in-out 0.3s 0s;

  }

  .capsule-tab-views {
    position: relative;
    z-index: 2;
    color: var(--capsule-tab-item-color, var(--theme-color, inherit));
    font-size: var(--capsule-tab-item-font-size, inherit);
    font-weight: var(--capsule-tab-item-font-weight, inherit);
    display: flex;
    height: 100%;
    line-height: var(--capsule-tab-height, var(--height));
    /* flex: 1 0; */
  }

  .capsule-tab-item {
    width: var(--percentageWidth);
    /* flex-shrink: 0; */
    flex: 1 0;
    --shadow: 2rpx 0 0 0 var(--theme-color, inherit) inset;
    box-shadow: var(--capsule-tab-item-shadow, var(--shadow));
    transition: var(--transition);
  }

  .capsule-tab-item.active {
    color: var(--capsule-tab-item-active-color, inherit);
    font-size: var(--capsule-tab-item-active-font-size, inherit);
    font-weight: var(--capsule-tab-item-active-font-weight, inherit);
  }

  .capsule-tab-shadow {
    position: absolute;
    width: var(--percentageWidth);
    height: 100%;
    top: 0;
    left: var(--shadow-bg-lf);
    background-color: var(--capsule-tab-shadow-bg, var(--theme-color));
    z-index: 1;
    transition: var(--transition);
  }
</style>
