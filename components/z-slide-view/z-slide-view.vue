<template>
  <view class="slide-view-box">
    <scroll-view id="slideViewBox" :scroll-x="true" :scroll-left='scollx' scroll-with-animation="false"
      class="slide-view-item" @scroll="scrollChange">
      <view class="menu-black">
        <view class="menu-item" v-for="(item,index) in list" :key="index">
          <view class="menu-item-currency">
            <text>{{item.tradeCurrencyName}}/{{item.currencyName}}</text>
            <text class="rateSon" v-if="item.rise >= 0">+{{item.rise}}%</text>
            <text class="rateSon red" v-else>{{item.rise}}%</text>
          </view>
          <view :class="['menu-item-currency-price',item.rise >= 0?'up':'down']">
            {{item.currentPrice|number3(4)}}
          </view>
          <view class="menu-item-currency-cny">
            ¥ {{(item.currentPrice * item.basePrice * item.usdtPirce)|number2(2)}}
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 进度条 -->
    <movable-area class="progress-bar">
      <movable-view class="progress-item" damping="100" :x="movex" direction="horizontal" :style='countProgressStyle'
        @change="movableChange"></movable-view>
    </movable-area>
  </view>
</template>

<script>
  /**
   * slide-view 滑动导航
   * @description 这是一个可以活动的导航，带进度条
   * @tutorial https://www.uviewui.com/components/button.html
   * @property {Array} list  传入数组
   * @example <z-slide-view class="slide-view" :lsit="list"></z-slide-view>
   */
  import {
    nextTick,
    onMounted,
    watch,
    computed,
    getCurrentInstance
  } from 'vue';
  export default {
    name: 'slide-view',
    emits: ['itemtap'],
    props: {
      list: {
        type: Array,
        required: true,
        default: () => {
          return []
        },
      },

    },
    setup(props, {
      emit
    }) {
      const {
        proxy
      } = getCurrentInstance();
      let movex = ref(0);
      let scollx = 0;
      let timer = null;
      let move_type = null;
      let bigWidth = ref(0);
      let scrollWidth = ref(0);
      let progressWidth = 0;
      const countProgressStyle = computed(() => {
        let column = bigWidth.value / scrollWidth.value * 100
        return `width: ${column}%;`
      })
      onMounted(() => {
        init();
      })

      function init() {
        nextTick(() => {
          uni.createSelectorQuery().in(proxy).select("#slideViewBox").fields({
            size: true,
            rect: true,
            scrollOffset: true
          }, data => {
            // console.log(data)
            bigWidth.value = data.width;
            scrollWidth.value = data.scrollWidth
          }).exec();
          uni.createSelectorQuery().in(proxy).select(".progress-bar").fields({
            size: true,
            rect: true,
            // scrollOffset: true
          }, data => {

            progressWidth = data.width;
            // console.log(progressWidth,'&&&&')
          }).exec();
        })
      },
      function itemtap(item) {
        emit('itemtap', item);
      }
      // 移动进度条
      function movableChange(event) {
        // console.log(event,'一点')
        // console.log('666666666666666666');
        if (move_type && move_type != 'movable') {
          return;
        }
        move_type = 'movable';
        clearTimeout(timer);
        timer = setTimeout(() => {
          move_type = null;
        }, 100)
        // let scollx = event.detail.scrollLeft;
        // console.log(scollx,'一点')
        let change_rate = scrollWidth.value / progressWidth;

        const Scollx = event.detail.x;
        // console.log(change_rate,scrollWidth.value,progressWidth,'&&&&&&&&&&&&&&&&&&&')
        nextTick(() => {
          scollx.value = Scollx * change_rate;
        })
        // console.log(event,'一点')
      }

      function scrollChange(event) {
        // console.log(event);
        // console.log('888888888888');
        if (move_type && move_type != 'scroll') {
          return;
        }
        // console.log('777777777777777');
        move_type = 'scroll';
        clearTimeout(timer);
        timer = setTimeout(() => {
          move_type = null;
        }, 500)
        let scollx = event.detail.scrollLeft;
        let change_rate = progressWidth / event.detail.scrollWidth;
        nextTick(() => {
          movex.value = scollx * change_rate;
        })
      }
      watch(props.list, (newlval, oldval) => {
        init();
      })
      return {
        scrollChange,
        movex,
        scollx,
        countProgressStyle,
        movableChange,
      }
    },
  }
</script>

<style scoped>
  .slide-view-box {
    position: relative;
    padding-top: 20rpx;
  }

  .slide-view-box::after,
  .slide-view-box::before {
    content: '';
    display: table;
    clear: both;
  }

  .slide-view-item {
    width: 100%;
    white-space: nowrap;
  }

  .menu-item {
    margin-right: 47rpx;
    display: inline-block;
    flex-wrap: wrap;
    min-width: 200rpx;
  }


  /* 进度条 */
  .progress-bar {
    width: 55rpx;
    height: 4rpx;
    border-radius: 16rpx;
    background-color: #9A9A9A;
    margin: 40rpx auto 0rpx;
  }

  .progress-item {
    height: 100%;
    display: inline-block;
    border-radius: 16rpx;
    background-color: #fff;
  }

  .menu-item-currency {
    font-size: 22rpx;
    font-family: DIN;
    font-weight: bold;
    color: #FFFFFF;
    vertical-align: text-bottom;
    line-height: 1;
  }

  .rateSon {
    margin-left: 10rpx;
    font-size: 20rpx;
    font-family: DIN;
    font-weight: 500;
    color: #66CC99;
  }

  .rateSon.red {
    color: #DA436B;
  }

  .menu-item-currency-price {
    font-size: 34rpx;
    font-family: DIN;
    font-weight: bold;
    margin-bottom: 24rpx;
    margin-top: 20rpx;
  }

  .menu-item-currency-price.up {
    color: #66CC99;
  }

  .menu-item-currency-price.down {
    color: #DA436B;
  }

  .menu-item-currency-cny {
    font-size: 22rpx;
    font-family: Myriad Pro;
    font-weight: 400;
    line-height: 22rpx;
    color: #BBBBBB;
  }
</style>
