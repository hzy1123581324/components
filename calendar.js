
//日历组件
// 完成度80% 还差范围限制，动画效果
Vue.component('calendar', {
  template: `
  <div class="calendar-box">
  <div class="calendar-handl-box" @click=" showcalendar = !showcalendar">
      <slot></slot>
  </div>
  <div class='calendar-mask' v-show="showcalendar">
      <div class=" fs30 txt_c radius_10 pad_lf_rg_24 clear calendar-main"
          >
          <div class="flex_between_x flex flex_center_y mar_top_40 fs24 calendar-title z_9999">
              <div class='flex'>
                  <div @click="__upperYear">上一年</div>
                  <div class="mar_lf_24" @click="__upperMonth">上个月</div>
              </div>
              <div class="fs36">{{nowYear}}年{{nowMonth}}月</div>
              <div class='flex'>
                  <div @click="__nextMonth">下个月</div>
                  <div class="mar_lf_24" @click="__nextYear">下一年</div>
              </div>
          </div>
          <div class='calendar-days-box f_nowrap  z_9999' @touchstart='_touchStart($event)'
              @touchmove='_touchMove($event)' @touchend='_touchEnd($event)'>
              <div class="w_100 line_block" v-for="(list,index) in 3" :key="list" :style="'left:'+moveLeft"
                  ref="calendar">
                  <div class="calendar-week flex pad_btm_8 mar_top_30 pad_top_24">
                      <div class="fs22 color_68 flex_grow" v-for="item in week" :key="item" style="width:8vw">
                          {{item}}
                      </div>
                  </div>

                  <div class="calendar-days flex flex_wrap pad_btm_24 ">
                      <div :class="['h60 calendar-day-item flex flex_center', item.indexOf('new')>-1?'':'calendar-day-item-unuse',]"
                          v-for="(item,key) in days[index]" :key="item"
                          @click.stop="(item.indexOf('new')>-1&&index==1)?__sel(key):''">
                          <div
                              :class="['size60 lh60 radius_30',__checkSels(key,index)&&'calendar-day-item-active']">
                              {{item |getnum}}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="calendar-close colse-icon size60 radius_30" @click=" showcalendar = false"></div>
</div>
  `,
  props: {
    start: {
      type: String,
      default: '2016-07-02'
    },
    end: {
      type: String,
      default: '2016-07-02'
    },
    showCalendar: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      days: [],
      days_arr: [],//放置当前显示的天数
      nextDay_arr: [],
      nowYear: new Date().getFullYear(),
      nowMonth: (new Date().getMonth() >= 9 ? '' : '0') + (new Date().getMonth() + 1),//展示当前项的月份
      sels: {},
      today: new Date().getDate(),

      moveLeft: 0,
      moveStart: 0,//滑动初始值
      cantap: true, //是否可以点击
      showcalendar: false,

    }
  },
  mounted() {
    this.__init__();
  },
  methods: {
    __init__() {
      let { nowMonth, nowYear, days_arr, nextDay_arr } = this;
      for (let i = 1; i <= 31; i++) {
        days_arr.push('new' + (i < 9 ? '0' : '') + i);
        if (i < 14) {
          nextDay_arr.push('next' + (i < 9 ? '0' : '') + i);
        }
      }
      console.log(this.nextDay_arr, this.days_arr.push);
      this.__setDays();

    },
    __isLeapYear(Year) {
      //判断是否为闰年
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return true;
      } else {
        return false;
      }
    },

    //滑动事件
    _touchStart(ev, col) {//开始滑动
      ev = ev || event;
      // ev.preventDefault();

      if (ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕

        this.moveStart = ev.touches[0].clientX;// 记录x轴开始位置

      }
    },
    _touchMove(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.touches.length == 1) {
        //滑动时距离浏览器左侧的距离
        this.moveLeft = ev.touches[0].clientX - this.moveStart + 'px';

      }
    },
    _touchEnd(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.changedTouches.length == 1) {
        let end = ev.changedTouches[0].clientX;
        let { moveStart, moveLeft } = this;
        if (end - moveStart > 10) {
          moveLeft = '100%';
          this.__upperMonth();
        } else if (end - moveStart < -10) {
          moveLeft = '-100%';
          this.__nextMonth();
        } else {
          moveLeft = '0';
        }
        this.moveLeft = moveLeft;
        console.log('moveLeft:' + moveLeft);
        this.$refs.calendar[0].style.transition = 'all ease-in-out .3s';
        this.$refs.calendar[1].style.transition = 'all ease-in-out .3s';
        this.$refs.calendar[2].style.transition = 'all ease-in-out .3s';
        this.__animation();
        //在0~最大可滑动距离范围内滑动


      }
    },
    __setDays(month = parseInt(new Date().getMonth()) + 1) {
      let { nowYear } = this;

      this.__getDayNumByYearMonth(month, nowYear);//显示的月份
      this.__getDayNumByYearMonth(month == 1 ? 12 : month - 1, month == 1 ? nowYear - 1 : nowYear);//下一个月
      this.__getDayNumByYearMonth(month == 12 ? 1 : parseInt(month) + 1, month == 1 ? parseInt(nowYear - 1) : nowYear);//上一个月
      this.cantap = true;
    },
    __getDayNumByYearMonth(month, year) {
      //根据年月判断天数
      let { days_arr, upperdays = [], nextDay_arr, nowMonth, days } = this;
      let nowdayLen = this.__monthHasDays(month, year);//显示的当前月
      let upperdayLen = this.__monthHasDays(month == 1 ? 12 : month - 1, month == 1 ? year - 1 : year);//上个月
      let week_days = parseInt(new Date(`${year}/${month}/1`).getDay()) || 7;
      //生成
      for (let i = week_days; i > 0; i--) {
        upperdays.push('upper' + (upperdayLen - i + 1));
      }
      days_arr = days_arr.slice(0, nowdayLen);
      [...days_arr] = [...upperdays, ...days_arr, ...nextDay_arr];

      this.$set(days, month - nowMonth + 1, days_arr.slice(0, 42))
    },
    __monthHasDays(month, year) {
      let day_len = 31;
      switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
          day_len = 30;
          break;
        case 2:
          day_len = this.__isLeapYear(year) ? 29 : 28;
          break;

      }

      return day_len;
    },
    //操作函数
    __upperYear() {//点击上一年

      let { nowMonth, nowYear, cantap } = this;
      if (!cantap) {
        return;
      }
      this.nowYear = nowYear - 1;
      this.__setDays(nowMonth, this.nowYear);
    },
    __nextYear() {//点击下一年
      let { nowMonth, nowYear, cantap } = this;
      if (!cantap) {
        return;
      }
      this.nowYear = parseInt(nowYear) + 1;
      this.__setDays(nowMonth, this.nowYear);
    },
    __upperMonth() {//点击上一个月
      let { nowMonth, nowYear, cantap } = this;
      if (!cantap) {
        return;
      }
      this.moveLeft = '100%';
      this.$refs.calendar[0].style.transition = 'all ease-in-out .3s';
      this.$refs.calendar[1].style.transition = 'all ease-in-out .3s';
      this.$refs.calendar[2].style.transition = 'all ease-in-out .3s';
      setTimeout(() => {
        if (nowMonth == 1) {
          this.nowYear = parseInt(nowYear) - 1;
          this.nowMonth = '12';
        } else {
          let newval = parseInt(nowMonth) - 1;
          this.nowMonth = (newval > 9 ? '' : '0') + newval;
        }
      }, 290)
      this.__animation();
    },
    __nextMonth() {//点击下一个月
      let { nowMonth, nowYear, cantap } = this;
      if (!cantap) {
        return;
      }
      this.moveLeft = '-100%';
      this.$refs.calendar[0].style.transition = 'all ease-in-out .3s';
      this.$refs.calendar[1].style.transition = 'all ease-in-out .3s';
      this.$refs.calendar[2].style.transition = 'all ease-in-out .3s';
      setTimeout(() => {
        if (nowMonth == 12) {
          this.nowYear = parseInt(nowYear) + 1;
          this.nowMonth = '01';
        } else {
          let newval = parseInt(nowMonth) + 1
          this.nowMonth = (newval > 9 ? '' : '0') + newval;
        }
      }, 290)
      this.__animation();
    },
    __sel(index) {
      console.log(index);
      let { sels, nowMonth, nowYear } = this;
      nowMonth = parseInt(nowMonth);
      sels[`${nowYear}/${nowMonth}`] || this.$set(sels, `${nowYear}/${nowMonth}`, []);
      this.$set(sels[`${nowYear}/${nowMonth}`], index, !sels[`${nowYear}/${nowMonth}`][index]);
      console.log(this.sels);
    },
    //操作函数结束
    __checkSels(key, index) {
      let { sels, nowMonth, nowYear } = this;
      nowMonth = parseInt(nowMonth);
      let sels_key = '';
      if (index == 1) {
        sels_key = `${nowYear}/${nowMonth}`;
      } else if (index == 0) {
        sels_key = `${nowMonth == 1 ? nowYear - 1 : nowYear}/${nowMonth == 1 ? 12 : nowMonth - 1}`;
      } else {
        sels_key = `${nowMonth == 12 ? parseInt(nowYear) + 1 : nowYear}/${nowMonth == 12 ? 1 : nowMonth + 1}`;
      }
      if (sels[sels_key] && sels[sels_key][key]) {
        return true;
      } else {
        return false;
      }
    },
    __animation() {
      setTimeout(() => {
        this.$refs.calendar[0].style.transition = 'none';
        this.$refs.calendar[1].style.transition = 'none';
        this.$refs.calendar[2].style.transition = 'none';
        this.moveLeft = '0';

      }, 300)
    },

  },
  watch: {
    nowMonth(newval) {
      this.__setDays(newval);
      let { sels_key, nowYear } = this;
      this.sels_key = [
        `${newval == 1 ? nowYear - 1 : nowYear}/${newval == 1 ? 12 : newval - 1}`,
        `${nowYear}/${newval}`,
        `${newval == 12 ? parseInt(nowYear) + 1 : nowYear}/${newval == 12 ? 1 : parseInt(newval) + 1}`,
      ]
      // this.sels_key;
    },
    showCalendar(newval) {
      this.showcalendar = newval;
    },
    showcalendar(newval) {
      this.$emit('update:showCalendar', newval);
    }
  },
  filters: {
    getnum(val) {
      if (typeof (val) == 'number') {
        return val
      } else {
        return val.replace(/[^0-9]/ig, "")
      }
    }
  }

})
//demo
//demo
//demo
//demo
//demo
//demo
//demo
// <calendar :start="2019-12-12" :end="2020-12-12" :show-calendar="false">这是内容</calendar>