<template>
  <view v-if="show" class="notice-bar">
    <view class="direction-row">
      <view class="icon-wrap">
        <slot name="leftIcon"></slot>
      </view>
      <view class="notice-box" id="notice-box">
        <view class="notice-content" id="notice-content" :style="{
						animationDuration: animationDuration,
						animationPlayState: animationPlayState,
					}">
          <text class="notice-text" @click="click" >{{showText}}</text>
        </view>
      </view>
      <view class="icon-wrap">
        <slot name='rightIcon'>

        </slot>
        <!-- <icon @click="getMore" class="right-icon" v-if="moreIcon" name="arrow-right" :size="26" :color="computeColor"></icon>
				<icon @click="close" class="right-icon" v-if="closeIcon" name="close" :size="24" :color="computeColor"></icon> -->
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      // 显示的内容，数组
      list: {
        type: Array,
        default () {
          return [];
        }
      },
      // 是否显示左侧的音量图标
      volumeIcon: {
        type: Boolean,
        default: true
      },
      // 是否显示右侧的右箭头图标
      moreIcon: {
        type: Boolean,
        default: false
      },
      // 是否显示右侧的关闭图标
      closeIcon: {
        type: Boolean,
        default: false
      },
      // 是否自动播放
      autoplay: {
        type: Boolean,
        default: true
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },

      // 水平滚动时的滚动速度，即每秒滚动多少rpx，这有利于控制文字无论多少时，都能有一个恒定的速度
      speed: {
        type: [Number, String],
        default: 160
      },
      // 播放状态，play-播放，paused-暂停
      playState: {
        type: String,
        default: 'play'
      },
    },
    data() {
      return {
        textWidth: 0, // 滚动的文字宽度
        boxWidth: 0, // 供文字滚动的父盒子的宽度，和前者一起为了计算滚动速度
        animationDuration: '10s', // 动画执行时间
        animationPlayState: 'paused', // 动画的开始和结束执行
        showText: '' // 显示的文本
      };
    },
    watch: {
      list: {
        immediate: true,
        handler(val) {
          this.showText = val.join('，');
          this.$nextTick(() => {
            this.initSize();
          });
        }
      },
      playState(val) {
        if (val == 'play') this.animationPlayState = 'running';
        else this.animationPlayState = 'paused';
      },
      speed(val) {
        this.initSize();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initSize();
      });
    },
    methods: {
      initSize() {
        let query = [],
          boxWidth = 0,
          textWidth = 0;
        let textQuery = new Promise((resolve, reject) => {
          uni.createSelectorQuery()
            .in(this)
            .select(`#notice-content`)
            .boundingClientRect()
            .exec(ret => {
              this.textWidth = ret[0].width;
              resolve();
            });
        });
        query.push(textQuery);
        Promise.all(query).then(() => {
          // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#notice-box的宽度，因为中设置了.notice-content样式中设置了padding-left: 100%
          // 恰巧计算出来的结果中已经包含了#notice-box的宽度
          this.animationDuration = `${this.textWidth / uni.upx2px(this.speed)}s`;
          // 这里必须这样开始动画，否则在APP上动画速度不会改变(HX版本2.4.6，IOS13)
          this.animationPlayState = 'paused';
          setTimeout(() => {
            if (this.playState == 'play' && this.autoplay) this.animationPlayState = 'running';
          }, 10);
        });
      },
      // 点击通告栏
      click(index) {
        this.$emit('click');
      },
      // 点击关闭按钮
      close() {
        this.$emit('close');
      },
      // 点击更多箭头按钮
      getMore() {
        this.$emit('getMore');
      }
    }
  };
</script>

<style scoped>
  .notice-bar {
    --pad: 18rpx 24rpx;
    padding:var(--notice-pad,var(--pad));
    overflow: hidden;
  }

  .direction-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left-icon {
    display: inline-flex;
    align-items: center;
  }

  .notice-box {
    flex: 1;
    display: flex;
    overflow: hidden;
    margin-left: 12rpx;
    line-height: 1.3;
  }

  .right-icon {
    margin-left: 12rpx;
    display: inline-flex;
    align-items: center;
  }

  .notice-content {
    animation: loop-animation 10s linear infinite both;
    text-align: right;
    /* // 这一句很重要，为了能让滚动左右连接起来 */
    padding-left: 100%;
    display: flex;
    flex-wrap: nowrap;
  }

  .notice-text {
    font-size: 26rpx;
    word-break: keep-all;
    white-space: nowrap
  }

  @keyframes loop-animation {
    0% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
