
//滚动组件
// 下拉刷新效果未完成
Vue.prototype.bus = new Vue()
Vue.component('scroll', {
  template: `
  <div class="scroll-container flex flex_top " ref="scrollContainer"  @touchstart='_touchStart($event)'
  @touchmove='_touchMove($event)' @touchend='_touchEnd($event)'>
    <div class="absolute_top z_9999 bg_f55" ref="scrollhead">
      <slot name="scrollhead"></slot>
    </div>
    <div class="absolute_top w_100 z_10" :style="'top:'+start_distance+'px'" ref="refreshbg">
      <slot name='refreshbg'>我是头部</slot>
    </div>
    <div class="scroll-main relative z_100" ref="scrollMain" >
      <slot></slot>
    </div>
    <div class="absolute_btm_center pad_btm_20 txt_c z_10"><slot name="scrollfoot">~~~~我是有底线的~~~~</slot></div>

  </div>
  `,
  props: {
    bodyMove:{
      type:[String,Number,Boolean],
      default: false,
    },
    lowerThreshold:{
      //距底部多远时，触发 上拉加载更多 事件
      type:[String,Number],
      default: 50,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return parseFloat(value) === parseFloat(value);
      }
    },
    refreshing:{
      type:Function
    },
    refreshend:{
      //下拉刷新事件
      type:Function
    },
    pullup:{
      //上拉加载更多事件
      type:Function
    },
    
  },
  data() {
    return {

      boxWidth: 0,
      start_distance:0,//scrollhead 的高度
      MaxMove: 0,   // 最大移动距离
      distance: 0, //移动的距离
      start: 0,  //滑动的Y轴初始坐标
      inertia: 100, //惯性
      startTime: 0,//开始滑动的时间戳
      isTop: false,
      iscall:false,//判断是否触发了上拉加载更多事件
    }
  },
  mounted() {
    this.__init__();//初始化
  },
  methods: {
    __init__(){
      const {scrollMain,scrollhead }= this.$refs;

      this.start_distance = scrollhead.clientHeight;
      //设置初始scrollMain //top
      this.distance = scrollhead.clientHeight;
      scrollMain.style.top = this.distance + 'px';
    },
    _touchStart(ev) {//开始滑动
      ev = ev || event;
      ev.preventDefault();

      const {scrollMain,scrollContainer }= this.$refs;
      
      this.MaxMove = scrollMain.clientHeight - scrollContainer.clientHeight;
      scrollMain.style.transition = 'none';
      //console.log(ev.targetTouches);
      //console.log(ev.changedTouches);
      if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.start = ev.touches[0].clientY; // 记录x轴开始位置
        this.startTime = new Date().getTime();
        this.iscall = false;
      }
    },
    _touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      let move;//实时滑动距离//实时坐标
      let { distance, MaxMove, start ,start_distance} = this;

      const scrollMain = this.$refs.scrollMain;

      if (ev.touches.length == 1) {
        //滑动时距离浏览器左侧的距离
        move = ev.touches[0].clientY;
        //实时移动的位置=实时的滑动的距离-起始位置
        if (distance + move - start > start_distance) {
          // console.log(distance,move,start,'左边超出')
          distance = distance+( move - start) * 0.3;
          //如果有设置下拉刷新中函数
          if(this.refreshing){
            //下拉刷新中
            let proportion = (move-start)/this.$refs.refreshbg.clientHeight;//进度
            this.refreshing(proportion);
          }
          // console.log(distance,'左边超出2')
        } else if (distance + move - start <-MaxMove) {
          distance = -MaxMove + (distance + move - start + MaxMove) * 0.3;
        } else {
          distance += move - start;
          console.log(distance,move,start,this.lowerThreshold,-MaxMove);
          console.log(distance + move - start-this.lowerThreshold < -MaxMove);
          
        }
        if(this.pullup&&(distance -this.lowerThreshold < -MaxMove)&&move - start<0&&!this.iscall){
          this.iscall = true;
        }
        scrollMain.style.top = distance + 'px';
        
      }
    },
    _touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      let end = '';
      let endTime = new Date().getTime();
      const scrollMain = this.$refs.scrollMain;
      let { distance, MaxMove, inertia, start, startTime,start_distance } = this;
      scrollMain.style.transition = 'all ease-out .3s';
      if (ev.changedTouches.length == 1) {
        end = ev.changedTouches[0].clientY;

        //在0~最大可滑动距离范围内滑动

        if (endTime - startTime < 300) {
           end - start > 0 ? end += inertia : end -= inertia;
          
        } 
          if (distance + end - start >start_distance) {
            // console.log(distance,end,start,'超出顶部')
            distance = start_distance;
            //下拉刷新松开
            if(this.refreshend){
              this.refreshend();
            }
          } else if (distance + end - start < -MaxMove) {
            //超出底部
            distance = -MaxMove ;
          } else {
            distance += end - start;
          }
        this.distance = distance;
        
        scrollMain.style.top = distance + 'px';
      }
    },
  },
  computed: {

  },
  watch:{
    iscall(newval){
      if(newval){
        this.pullup();
      }
    },
    isTop(newval){
      const {scrollMain,scrollContainer }= this.$refs;
      this.MaxMove = scrollMain.clientHeight - scrollContainer.clientHeight;
      this.bus.$emit("scrolltopchange", newval);
    }
  }
})





Vue.component('scrollTop', {
  template: `
  <div >
    <div :slot="istop?'scrollhead':'default'"><slot></slot></div>
  </div>
  `,
  props: {
  },
  data() {
    return {
      istop
    }
  },
  mounted() {
    this.bus.$on("ScrollIsTop", val => { 
      this.istop = val;
    })
  },
  methods: {

  },
  computed: {

  },
  watch:{
  }
})