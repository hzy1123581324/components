
// 圆弧背景组件

Vue.component('racBox', {
  props: {
    bg: {
      type: String,
      required: true,
    },
    radian: {//控制弧度比例
      type: String,
      default: '0.8',
    }
  },
  data: function () {
    return {
      racBg: {}
    }
  },
  watch: {
    radian: function () {
      this.change();
    }
  },
  mounted: function () {
    this.change();
  },
  methods: {
    change() {
      let Height = this.$refs.racBg.clientHeight;
      let Width = this.$refs.racBg.clientWidth;;
      let radius = Width * this.radian ; //半径
      let percentage = (Height - radius) / Height * 100;
      let bg_str = "radial-gradient(circle at 50% " + percentage + "%," + this.bg + " 0," + this.bg + " " + radius + "px, rgba(0, 0, 0, 0) " + radius + "px)";
      this.racBg = {
        "background-image": [
          "-moz-"+bg_str,
          "-webkit-"+bg_str,
          "-o-"+bg_str,
          bg_str,
        ]
      }
    }
  },
  template: '<div :style="racBg" ref="racBg"><slot></slot></div>',

})
