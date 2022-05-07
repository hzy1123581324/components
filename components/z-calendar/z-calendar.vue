<template>
  <view class="calendar" @touchmove.stop.prevent="clean">
    <view v-if="!insert&&show" class="calendar-mask" :class="{'calendar--mask-show':aniMaskShow}" @click="clean"></view>
    <view v-if="insert || show" class="calendar-content"
      :class="{'calendar--fixed':!insert,'calendar--ani-show':aniMaskShow}">
      <view v-if="!insert" class="calendar-header calendar--fixed-top">
        <view class="calendar-header-btn-box" @click="close">
          <text class="calendar-header-text calendar--fixed-width">取消</text>
        </view>
        <view class="calendar-header-btn-box" @click="confirm">
          <text class="calendar-header-text calendar--fixed-width">确定</text>
        </view>
      </view>
      <view class="calendar-header">
        <view class="calendar-header-btn-box" @click="pre">
          <view class="calendar-header-btn calendar--left"></view>
        </view>
        <view class="calendar-header-text">{{ (nowDate.year||'') +'年'+( nowDate.month||'') +'月'}}</view>
        <view class="calendar-header-btn-box" @click="next">
          <view class="calendar-header-btn calendar--right"></view>
        </view>
        <view class="calendar-backtoday" @click="backtoday">回到今天</view>
      </view>
      <view class="calendar-box">
        <view v-if="showMonth" class="calendar-box-bg">
          <view class="calendar-box-bg-text">{{nowDate.month}}</view>
        </view>
        <view class="calendar-weeks">
          <view class="calendar-weeks-day" v-for="item in ['日','一','二','三','四','五','六']" :key='item'>
            <text class="calendar-weeks-day-text">日</text>
          </view>
        </view>
        <view class="calendar-weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
          <view class="calendar-weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
            <calendar-item :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate">
            </calendar-item>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import Calendar from './util.js';
  import CalendarItem from './calendar-item.vue'
  /**
   * Calendar 日历
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
  import {ref,reactive, watch,onBeforeMount,nextTick} from 'vue';
  export default {
    components: {
      CalendarItem
    },
    emits: ['confirm','change'],
    props: {
      date: {
        type: String,
        default: ''
      },
      selected: {
        type: Array,
        default () {
          return []
        }
      },
      lunar: {
        type: Boolean,
        default: false
      },
      startDate: {
        type: String,
        default: ''
      },
      endDate: {
        type: String,
        default: ''
      },
      range: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      }
    },
    setup(){
      let show = ref(false);
     let  weeks = reactive([]);
     let  calendar = reactive({});
      let  nowDate = reactive({});
     let  aniMaskShow = ref(false);
      let cale = null;
      onBeforeMount(()=>{
        // 获取日历方法实例
        cale = new Calendar({
          date: props.date,
          selected: props.selected,
          startDate: props.startDate,
          endDate: props.endDate,
          range: props.range,
        })
        init(cale.date.fullDate)
      })
      
      
      // 取消穿透
     function clean() {}
     function init(date) {

        Object.assign(weeks,cale.weeks)
        nowDate = calendar = cale.getInfo(date)
      }
     function open() {
        show.value = true
        nextTick(() => {
          setTimeout(() => {
            aniMaskShow.value = true
          }, 50)
        })
      }
     function close() {
        aniMaskShow.value = false
        nextTick(() => {
          setTimeout(() => {
            show.value = false
          }, 300)
        })
      }
     function confirm() {
        setEmit('confirm')
        close()
      }
     function change() {
        if (!props.insert) return
        setEmit('change')
      }
     function monthSwitch() {
        let {
          year,
          month
        } = nowDate
        emit('monthSwitch', {
          year,
          month: Number(month)
        })
      }
      function setEmit(name) {
        let {
          year,
          month,
          date,
          fullDate,
          lunar,
          extraInfo
        } = calendar
        emit(name, {
          range: cale.multipleStatus,
          year,
          month,
          date,
          fulldate: fullDate,
          lunar,
          extraInfo: extraInfo || {}
        })
      }
     function choiceDate(weeks) {
        if (weeks.disable) return
        calendar = weeks
        // 设置多选
        cale.setMultiple(calendar.fullDate)
        Object.assign(weeks,cale.weeks)

        change()
      }
      /**
       * @description 返回今天
       * 
       */
     function backtoday() {
        cale.setDate(props.date)
        Object.assign(weeks,cale.weeks)
        Object.assign(nowDate,) nowDate = calendar = cale.getInfo(this.date)
        change()
      }
      /**
       * @description 上个月
       * 
       */
     function pre() {
        const preDate = cale.getDate(nowDate.fullDate, -1, 'month').fullDate
        setDate(preDate)
        monthSwitch()
      
      }
      /**
       * @description 下个月
       * 
       */
     function next() {
        const nextDate = cale.getDate(nowDate.fullDate, +1, 'month').fullDate
        setDate(nextDate)
        monthSwitch()
      }
      function setDate(date) {
        cale.setDate(date)
        Object.assign(weeks,cale.weeks)
        nowDate = cale.getInfo(date)
      }
      
      watch(props.selected,(newVal,oldval)=>{
        cale.setSelectInfo(nowDate.fullDate, newVal)
        Object.assign(weeks,cale.weeks)
      }
    },)
      
      return {
        clean,
        show,
        aniMaskShow,
        insert,
        close,
        confirm,
        pre,
        showMonth,
        nowDate,
        weeks,
        calendar,
        selected,
        lunar,
        choiceDate,
      }
    }

  }
</script>

<style lang="scss" scoped>
  .calendar {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
  }

  .calendar-mask {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: $uni-bg-color-mask;
    transition-property: opacity;
    transition-duration: 0.3s;
    opacity: 0;
    /* #ifndef APP-NVUE */
    z-index: 99;
    /* #endif */
  }

  .calendar--mask-show {
    opacity: 1
  }

  .calendar--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transition-property: transform;
    transition-duration: 0.3s;
    transform: translateY(460px);
    /* #ifndef APP-NVUE */
    z-index: 99;
    /* #endif */
  }

  .calendar--ani-show {
    transform: translateY(0);
  }

  .calendar-content {
    background-color: #fff;
  }

  .calendar-header {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-bottom-color: $uni-border-color;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .calendar--fixed-top {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    justify-content: space-between;
    border-top-color: $uni-border-color;
    border-top-style: solid;
    border-top-width: 1px;
  }

  .calendar--fixed-width {
    width: 50px;
    // padding: 0 15px;
  }

  .calendar-backtoday {
    position: absolute;
    right: 0;
    top: 25rpx;
    padding: 0 5px;
    padding-left: 10px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    color: $uni-text-color;
    background-color: $uni-bg-color-hover;
  }

  .calendar-header-text {
    text-align: center;
    width: 100px;
    font-size: $uni-font-size-base;
    color: $uni-text-color;
  }

  .calendar-header-btn-box {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
  }

  .calendar-header-btn {
    width: 10px;
    height: 10px;
    border-left-color: $uni-text-color-placeholder;
    border-left-style: solid;
    border-left-width: 2px;
    border-top-color: $uni-color-subtitle;
    border-top-style: solid;
    border-top-width: 2px;
  }

  .calendar--left {
    transform: rotate(-45deg);
  }

  .calendar--right {
    transform: rotate(135deg);
  }


  .calendar-weeks {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .calendar-weeks-item {
    flex: 1;
  }

  .calendar-weeks-day {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 45px;
    border-bottom-color: #F5F5F5;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .calendar-weeks-day-text {
    font-size: 14px;
  }

  .calendar-box {
    position: relative;
  }

  .calendar-box-bg {

    display: flex;

    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .calendar-box-bg-text {
    display: flex;
    width: auto;
    height: auto;
    font-size: 200px;
    font-weight: bold;
    color: $uni-text-color-grey;
    opacity: 0.1;
    text-align: center;
    line-height: 1;

  }
</style>
