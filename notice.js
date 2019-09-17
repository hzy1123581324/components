
//输出组件代码
document.write(heredoc(function () {
/*
<style>
.news {
  position: relative;
  overflow: hidden;
  padding: 0.1rem 0.3rem;
  height: 0.84rem;
  box-sizing: border-box;
  background-color:#fff;
}
.news::before {
  content: "";
  width: 0.74rem;
  height: 0.64rem;
  display: block;
  overflow: hidden;
  background-image: url("../images/new_icon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
}
.news ul {
  padding-left: 1.24rem;
  box-sizing: border-box;
  width: 100%;
}
.news ul li {
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  height: 0.64rem;
  line-height: 0.64rem;
  font-size: 0.3rem;
  display: block;
  overflow: hidden;
  padding: 0.1rem;
}

.marquee_list {
  position: absolute;
  top: 0px;
  left: 0px;
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -0.84rem;
}
</style>
<script type="text/x-template" id="notice">
<div class="news" v-if="news.length > 0" >
　　<ul class="marquee_list" :class="{ marquee_top : animate }">
　　　　<li v-for="item in news" :key="keyname?item[keyname]:item" v-bind:data="item"><slot>{{item.title}}</slot></li>
　　</ul>
</div>
</script>

*/}))

Vue.component('notice', {
  template: `
  <div class="swiper-container h_100" id="notice">
    <div class="swiper-wrapper h_100">
      <div class="swiper-slide h_100 flex flex_center_y" v-for="(item,key) in news" :key="keyname?item[keyname]:item" >
        {{item[keyname]}}
      </div>
    </div>
  </div>
  `,
  props: {
    news:{
      type: Array,
      required: true
    },
    keyname: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      animate: false,
      timer: ''
    }
  },
  mounted() {
  },
  methods: {
  },
  computed: {

  },
  watch:{
    news: function(val){
      console.log("这是监视器"+val);
      if(val.length==0){
        return;
      }
      this.data = val;
      // alert(JSON.stringify(val)+'5555555555555555555555555555555')
      setTimeout(()=>{
        var swiper = new Swiper('#notice', {
          loop:true,
          direction : 'vertical',
          autoplay:2000,
          onReachEnd: function (swiper) {
          },
          noTouchMove: function (swiper) {
          }
        })
      },300)
    }
  }
})