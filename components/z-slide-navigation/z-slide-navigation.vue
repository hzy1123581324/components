<template>
  <view class="slide-navigation-box">
    <scroll-view id="scrollBox" :scroll-x="direction" :scroll-left='scollx' scroll-with-animation="true" class="slide-navigation-item"
      :style="countStyle" @scroll="scrollChange">
      <view class="menu-item" v-for="(items,index) in _list" :key="index">
        <view hover-class="none" class="menu-box" v-for="item in items" :key="item.id" @tap="itemtap(item)">
          <navigator hover-class="none" :url="item[keyUrl]">
            <slot v-bind:item="item">
              <view class="menu-icon">
                <image :src="item[keyIcon]"></image>
              </view>
              <view class="menu-title">{{ item[keyTitle] }}</view>
              <view class="menu-details">{{ item[keySubtitle] }}</view>
            </slot>
          </navigator>
        </view>
      </view>
    </scroll-view>
    <!-- 进度条 -->
    <movable-area class="progress-bar" v-if="_list.length>1">
      <movable-view class="progress-item" damping="100" :x="movex" direction="horizontal" :style='countProgressStyle'
        @change="movableChange"></movable-view>
    </movable-area>
  </view>
</template>

<script>
  /**
     * slide-navigation 滑动导航
     * @description 这是一个可以活动的导航，带进度条
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {Array} list  传入数组
     * @property {Boolean} direction 是否横向滚动 
     * @property {String,Number} row  一版排列行数
     * @property {String,Number} column  一版排列的列数
     * @property {Sting,Number} iconSize 图标尺寸默认88
     * @property {Sting} keyIcon 图标变量默认pic
     * @property {Sting} keyTitle 主标题变量默认title
     * @property {Sting} keySubtitle 副标题变量默认subtitle
     * @example <z-slide-navigation class="slide-navigation" :lsit="list"></z-slide-navigation>
     * <style>
         .slide-navigation{
             --title-font-size: 24rpx;   标题字体大小
             --title-space: 10rpx;   标题与图标的距离
             --title-color: inherit;  标题颜色默认继承
             --subtitle-font-size: 18rpx;   副标题字体大小
             --subtitle-space: 8rpx;   副标题与标题之间的距离
             --subtitle-color: inherit;   副标题颜色默认继承
             --item-space: 36rpx;    行与行之间的距离
             --icon-size： 88rpx;  图标大小
             --title-font-weight 标题字重 默认 500
             --subtitle-font-weight 副标题字重 默认400
             --icon-radius:  图标圆角  默认 50%
         }
          
     </style>
     */
  let change_rate, move_type;
  export default {
    name: 'slide-navigation',
    props: {
      list: {
        type: Array,
        required: true,
        default: () => {
          return []
        },
      },
      direction: {
        type: Boolean,
        default: true,
      },
      // 行数
      row: {
        type: [String, Number],
        default: 3,
      },
      // 列数
      column: {
        type: [String, Number],
        default: 5,
      },
      keyIcon: {
        type: String,
        default: 'pic'
      },
      keyTitle: {
        type: String,
        default: 'title'
      },
      keySubtitle: {
        type: String,
        default: 'subtitle'
      },
      keyUrl: {
        type: String,
        default: 'url'
      }
    },
    data() {
      return {
        movex: 0,
        scollx: 0,
        timer: null,
        move_type: null,
      };
    },
    created() {},
    watch: {},
    computed: {
      // 处理传入数据 
      _list() {
        let {
          list,
          row,
          column
        } = this;
        let _list = [
          []
        ];
        let len = row * column;
        for (let i = 0; i < list.length; i++) {
          let list_len = _list.length;
          if (_list[list_len - 1].length == len) {
            _list.push([])
          }
          _list[_list.length - 1].push(list[i]);
          // _list[i % _column] || (_list[i % _column] = []);
          // _list[i % _column].push(list[i]);
        }
        // console.log(_list,'处理后的数据')
        return _list;
      },
      // 修改样式
      countStyle() {
        let {
          column,
          iconSize
        } = this;
        column = 100 / column;
        return `--item-width: ${column}%;`
      },
      // 进度条样式
      countProgressStyle() {
        let column = (100 / this._list.length) || 30;
        return `width: ${column}%;`
      }
    },
    mounted() {},
    methods: {
      itemtap(item) {
        this.$emit('itemtap', item);
      },
      // 移动进度条
      movableChange(event) {
        // console.log(event,'888888888888888');
        if (this.move_type && this.move_type != 'movable') {
          return;
        }
        this.move_type = 'movable';
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.move_type = null;
        }, 600)
        // this.movex = event.detail.x;
        if (!change_rate) {
          let top = 0;
          let len = this._list.length;
          const query = uni.createSelectorQuery().in(this);
          query.select('#scrollBox').boundingClientRect(data => {
            // console.log("得到布局位置信息" + JSON.stringify(data));
            // console.log("节点离页面顶部的距离为" + data.top);
            // top = data.top;
            let scrollWidth = data.width * len;
            change_rate = uni.upx2px(120) / scrollWidth;
          }).exec();
          // console.log(top,'99dd9d9d9d9d9d9d9')
          // scrollWidth
          // change_rate= uni.upx2px(120)/;
        }

        this.$nextTick(() => {
          this.scollx = event.detail.x / change_rate;
        })
      },

      scrollChange(event) {
        // console.log(event);
        if (this.move_type && this.move_type != 'scroll') {
          return;
        }
        this.move_type = 'scroll';
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.move_type = null;
        }, 600)
        let scollx = event.detail.scrollLeft;
        if (!change_rate) {
          change_rate = uni.upx2px(120) / event.detail.scrollWidth;
        }
        // console.log(change_rate,'&&&&&&&&&&&&&&&&&&&')
        this.$nextTick(() => {
          this.movex = scollx * change_rate;
        })
      }
    }
  }
</script>

<style scoped>
  .slide-navigation-box {
    position: relative;
    --title-font-size: 24rpx;
    /*标题字体大小*/
    --title-space: 10rpx;
    /*标题与图标的距离*/
    --title-color: inherit;
    /*标题颜色默认继承*/
    --subtitle-font-size: 18rpx;
    /*副标题字体大小*/
    --subtitle-space: 8rpx;
    /*副标题与标题之间的距离*/
    --subtitle-color: inherit;
    /*副标题颜色默认继承*/
    --item-space: 36rpx;
    /*行与行之间的距离*/
    --icon-size: 88rpx;
    /*图标大小*/
  }

  .slide-navigation-box::after,
  .slide-navigation-box::before {
    content: '';
    display: table;
    clear: both;
  }

  .slide-navigation-item {
    width: 100%;
    /* display: flex;
        flex-wrap: wrap; */
    white-space: nowrap;
    /* position: relative; */
    /* margin-bottom: 38rpx; */
  }

  .menu-item {
    vertical-align: text-top;
    display: inline-flex;
    width: 100%;
    height: 100%;
    white-space: normal;
    /* padding-top: 41rpx; */
    flex-wrap: wrap;
  }

  .menu-box {
    vertical-align: text-top;
    width: var(--item-width);
    text-align: center;
    display: inline-block;
    padding-bottom: var(--item-space);
    /* color: #828282; */
    font-size: var(--title-font-size);
    line-height: 1;
  }

  .menu-title {
    font-size: var(--title-font-size);
    margin-top: var(--title-space);
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: var(--title-font-weight, 500);
    color: var(--title-color);
  }

  .menu-icon image {
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: var(--icon-radius, 50%);
    /* margin: 0 auto; */
  }

  .menu-details {
    font-weight: var(--subtitle-font-weight, 400);
  }

  .menu-details:empty {
    display: none;
  }

  /* 进度条 */
  .progress-bar {
    /* position: absolute; */
    width: 120rpx;
    height: 6rpx;
    border-radius: 16rpx;
    background-color: #e0e0e0;
    /* bottom:26rpx; */
    /* left: 50%; */
    /* margin-left: -50rpx; */
    margin: 0 auto 26rpx;
    /* z-index: 90; */
  }

  .progress-item {
    height: 100%;
    display: inline-block;

    border-radius: 16rpx;
    background-color: #E22F24;
  }
</style>
