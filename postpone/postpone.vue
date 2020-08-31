<template>
  <view :class="['btn',!canclick&&'active']" hover-class="none" @click="_chenge">
    <slot>{{title}}</slot>
  </view>
</template>

<script>
/**
 * postpone 异步按钮
 * @description 接口返回才可以再次点击，接口请求中保持点击状态
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} title 按钮内容
 * @property {Function} tapfun 执行函数
 * @property {Boolean} canclick 是否可以点击
 * @example  <postpone :tapfun="send"></postpone>
 * @example  <postpone :tapfun="send" :canClick="false" ></postpone>
 */
export default {
  name: "postpone",
  props: {
    // 按钮内容
    title: {
      type: String,
      default: "确定",
    },
    // 执行函数
    tapfun: {
      type: Function,
      required: true,
      // default:(resolve, reject)=>{
      // 这个是实例
      // 	console.log(111)
      // 	setTimeout(()=>{
      // 		resolve();
      // 	},10000)
      // }
    },
    // 是否可以点击
    canClick: {
      type: Boolean,
      default: true,
    },
    // 必须等待多少时间才可点击
    stayTime: {
      type: [Number, String],
      default: 500,
    },
    // 超出时间，后可以点击
    outTime: {
      type: [Number, String],
      default: 3000,
    },
  },
  data() {
    return {
      canclick: true,
    };
  },
  onLoad() {},
  mounted() {
    this.canclick = this.canClick;
  },

  methods: {
    async _chenge() {
      let { canclick } = this;

      if (canclick) {
        this.canclick = false;
        const end = new Date().getTime() + (this.stayTime || 0);
        if (this.tapfun) {
          await this.tapfun();
          //   必须等待inter毫秒后才可点击
          const intver =
            new Date().getTime() - end > 0
              ? 0
              : -1 * (new Date().getTime() - end);
          setTimeout(() => {
            this.canclick = true;
          }, intver);
        } else {
          //提示没有定义函数
          this.toast(this.i18n.funNull);
        }
      } else {
        canClick && this.toast(this.i18n.dianji);
      }
    },

    async __tap() {
      return new Promise((resolve, reject) => {
        this.tapfun(this.$parent.$root, resolve, reject);
      });
    },
  },
  watch: {
    canClick(newValue, oldValue) {
      this.canclick = newValue;
    },
  },
  computed: {},
};
</script>

<style scoped lang="stylus">
.btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background:linear-gradient(0deg,rgba(249,178,36,1) 0%,rgba(255,222,98,1) 100%);
  box-shadow: var(--btn-shadow);
  border-radius: var(--btn-radius);
  font-size: 32upx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #fff;
  background: var(--btn-bg);
  letter-spacing: 8upx;

  &.active {
    opacity: 0.4;
  }
}

/* ************弥散投影按钮** 开始*********** */
.bnt_ms {
  outline: none;
  /* display: inline-block; */
  border-radius: 4px;
  color: #ffffff;
  position: relative;
  transition: all 0.3s ease-out;
  user-select: none;
  -webkit-user-select: none;
  z-index: 0;
  width: 91.4666666vw;
  height: 10.666666vw;
  margin: 14.9333333vw 0;
}

.bnt_ms:before {
  content: '';
  background: inherit;
  width: calc(100% - 6rem);
  height: 2rem;
  border-radius: 4px;
  display: inline-block;
  position: absolute;
  left: 3rem;
  bottom: 0;
  z-index: -1;
  filter: blur(0.6rem);
  -webkit-filter: blur(0.6rem);
}

/* *******************弥散投影按钮** 结束************************* */
</style>

<style>
.btn {
  margin: 0 auto;
}
</style>

