
//导航栏

// 修改点击事件

Vue.component('navbar', {
  template: `
  <div class='navbar-box txt_c'>
        <div class="navbar-main clear" ref="navbarMain" >
            <div :class="['h_100 f_nowrap lf', len>5&&'navbar-container']" ref="navbarBox" >
                <div :class="['navbar-item', key==navbarIndex&&'navbar-item-active color_main']" v-for="(item,key) in nav" :key="item[keyname]||item"  @touchstart='_touchStart($event)'
                @touchmove='_touchMove($event,key)' @touchend='_touchEnd($event,key)'>
                    <div class="absolute_center ellipsis pad_lf_rg_24 lh1-5">{{item[keyname]||item}}</div>
                </div>
                <div class="navbar-progress bg_main" ref="navbarProgress"></div>
            </div>
        </div>
        <div class="panel-handl flex flex_center absolute_rg_center" ref="panelHandl" @click="showpanel = !showpanel" v-show="nav.length>5">
            <div :class="['next', showpanel?'rotate_270':'rotate_90']"></div>
        </div>
        <div :class="['panel-main bor_top',showpanel&&'panel-main-active'] " >
            <div class="panel-scroll pad_24 pad_lf_rg_30 flex flex_wrap " v-show="showpanel">
                <div class="panel-item mar_btm_24 color_31 flex flex_center" v-for="(item,key) in nav"
                    :key="item[keyname]||item" @click="navbarIndex = key">{{item[keyname]||item}}</div>
            </div>
        </div>
    </div>
  `,
  props: {
    index: {
      type: [Number, String],
      default: 0,
    },
    nav: {
      type: Array,
      required: true,
    },
    keyname: {
      type: String,
      default: 'name'
    },
    showPanel:{
      type:[Number,String,Boolean],
      default : false,
    }
  },
  data() {
    return {
      navbarIndex: this.index,//下标
      showpanel: this.showPanel,
      boxWidth: 0,
      cellWidth: '',//单元格宽度,
      len: this.nav.length,//数组长度
      MaxMove: 0,   // 最大移动距离
      distance: 0, //移动的距离
      start: 0,  //滑动的x轴初始坐标
      inertia: 0, //惯性
      startTime: 0,//开始滑动的时间戳
      istap: false,//是否为点击事件
    }
  },
  mounted() {
    let { len } = this;
    let navbarBox = this.$refs.navbarBox;
    this.MaxMove = navbarBox.clientWidth - this.$refs.navbarMain.clientWidth;
    this.inertia = 1 * this.MaxMove / this.len;
    navbarBox.style.transition = 'all ease-out .3s';
    this.cellWidth = (navbarBox.clientWidth - (len > 5 ? this.$refs.panelHandl.clientWidth : 0)) / len;
    this._choice(this.navbarIndex);
  },
  methods: {
    _touchStart(ev) {//开始滑动
      ev = ev || event;
      ev.preventDefault();
      this.$refs.navbarBox.style.transition = 'none';
      //console.log(ev.targetTouches);
      //console.log(ev.changedTouches);
      if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.start = ev.touches[0].clientX; // 记录x轴开始位置
        this.startTime = new Date().getTime();
        this.istap = true;
      }
    },
    _touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      let move;//实时滑动距离//实时坐标
      let { distance, MaxMove, start } = this;
      if (ev.touches.length == 1) {
        //滑动时距离浏览器左侧的距离
        move = ev.touches[0].clientX;
        //实时移动的位置=实时的滑动的距离-起始位置
        if (distance + move - start > 0) {
          // console.log(distance,move,start,'左边超出')
          distance = distance + (move - start) * 0.3;
          // console.log(distance,'左边超出2')
        } else if (distance + move - start < -MaxMove) {
          distance = -MaxMove + (distance + move - start + MaxMove) * 0.3;
        } else {
          distance += move - start;
        }
        this.$refs.navbarBox.style.marginLeft = distance + 'px';
        // console.log(distance, 'PPPPPPPPPPPPPPPPPPPPPPPPPPPPP')
        this._progress(distance);
        this.istap = false;
      }
    },
    _touchEnd(ev, key) {
      ev = ev || event;
      ev.preventDefault();
      let end = '';
      let endTime = new Date().getTime();
      let { distance, MaxMove, inertia, start, startTime, istap } = this;
      this.$refs.navbarBox.style.transition = 'all ease-out .3s';
      if (ev.changedTouches.length == 1) {
        end = ev.changedTouches[0].clientX;

        //在0~最大可滑动距离范围内滑动

        if (endTime - startTime < 300) {
          distance += end - start > 0 ? end - start + inertia : end - start - inertia;
          // distance > 0 && (distance = 0);
          // distance + MaxMove < 0 && (distance = -MaxMove);
        } else {
          if (distance + end - start > 0) {
            // console.log(distance,end,start,'左边超出')
            distance = distance + (end - start) * 0.3;
            // console.log(distance,'左边超出2')
          } else if (distance + end - start < -MaxMove) {
            distance = -MaxMove + (distance + end - start + MaxMove) * 0.3;
          } else {
            distance += end - start;
          }

        }
        if (istap) {
          this.navbarIndex = key
        } else {
          this._countIndex(distance, end - start);
        }
      }
    },
    _countIndex(distance, direction) {
      let { len, MaxMove, navbarIndex, cellWidth } = this;
      let navbarBox = this.$refs.navbarBox
      if (distance >= 0) {//超出左边
        // console.log('*************************************')
        navbarBox.style.marginLeft = 0 + 'px';
        this.distance = 0;
        this._progress(this.distance);
        return navbarIndex > 2 && (this.navbarIndex = 2);
      }
      if (distance + MaxMove <= 0) {//超出右边
        // console.log('++++++++++++++++++')
        if (navbarIndex < len - 3) {
          this.navbarIndex = len - 3
        }
        navbarBox.style.marginLeft = -MaxMove + 'px';
        this.distance = -MaxMove;
        this._progress(this.distance);
        return
      }
      let Index = distance / -cellWidth + 2;
      if (direction >= 0) {//向右
        this.navbarIndex = Index >> 0;
      } else {//向左
        this.navbarIndex = (Index >> 0) + 1;
      }
    },
    _choice(key) {
      let { distance, MaxMove, cellWidth } = this;
      distance = -cellWidth * (key - 2);
      distance >= 0 && (distance = 0);
      distance + MaxMove < 0 && (distance = -MaxMove);
      this.distance = distance;
      // console.log('地沙滩上',this.distance);
      this._progress(this.distance);
      this.$refs.navbarBox.style.marginLeft = this.distance + 'px';
    },
    _progress(distance) {
      let { cellWidth, navbarIndex, MaxMove, len } = this;
      let navbarProgress = this.$refs.navbarProgress;
      let progressWidth = navbarProgress.clientWidth;
      // let handlWidth = len > 5 ? this.$refs.panelHandl.clientWidth : 0;
      let progress = 0;
      if (distance > 0) {
        progress = 0;
      } else if (-distance / cellWidth <= 2 || ((MaxMove + distance) / cellWidth <= 2 && -distance <= MaxMove)) {
          // console.log('##################33333333333333');
          progress = cellWidth * navbarIndex + (cellWidth - progressWidth) / 2;
        } else if (-distance > MaxMove) {
          // console.log('##################################');
          progress = cellWidth * (len - 1);
        } else {
          // console.log('##################44444444444444');
          progress = -distance + cellWidth * 2 + (cellWidth - progressWidth) / 2;
        }
        navbarProgress.style.left = progress + 'px';

      },


    },
    computed: {

    },
    watch: {
      showPanel(newVal){
        this.showpanel = newVal;
      },
      showpanel(newval){
        if(newval){
          const scrollTop = $('body').scrollTop();//body设置为fixed之后会飘到顶部，所以要动态计算当前用户所在高度
          $('body').css({
              'overflow':'hidden',
              'position': 'fixed',
              'top': scrollTop*-1
          });
        }else{
          $('body').css({
            'overflow':'auto',
            'position': 'static',
            'top': 'auto'
        });
        }
      },
      navbarIndex(newVal, oldVal) {
        // console.log(oldVal,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        this._choice(newVal);
        // console.log('&&&&&&&&&&&&&&&&&&&&&');
        if (!this.showpanel) {
          this.$emit("update:index", newVal);
        }
      },
      index(newVal) {
        // console.log(newVal,'8888888');
        this.navbarIndex = newVal;
      }
    }
  })



  //实例 全属性
  // <navbar :index.sync='classindex' :nav="range" :show-panel="false" ></navbar>