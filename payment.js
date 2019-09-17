
//仿支付宝支付密码组件

Vue.component('payment', {
  template:`
  <div class="">
    <div class="w_100 h_100" @click="showPayment = !showPayment"><slot></slot></div>
    <div class="paymentBox  fs36" v-show="showPayment" @click="showPayment = !showPayment">
        <div class="paymentTitle lh98 bg_f9 txt_c bor_btm bor_e2" @click.stop>
            <div class="absolute_lf_center back-icon size38 z_9999 mar_lf_30 color_97" @click="showPayment = !showPayment"></div>
            <div class="color_13">请输入支付密码</div>
        </div>
        <div class="bg_f9 clear" @click.stop>
          <div class="payment-init-box h98 flex radius_10">
              <div :class="['payment-init flex_grow flex_shrink',passWord.length-1>=index&&'satisfy']" v-for="(item,index) in 6"></div>
          </div>
          <div class="payment-forget" v-show="forget">
              <div class="txt_rg fs32 mar_rg_30" @click="getpayword">忘记密码</div>
          </div>
        </div>

        <div class="payment-keyboard flex flex_center flex_wrap" @click.stop>
            <div class="w_33 lh98 txt_c bg_fff payment-numcell fs40 color_31" v-for="item in nums" :key="item" @click="passWord += item">{{item}}</div>
            <div class="payment-cancel w_33 lh98 h98 " @click=" passWord = passWord.slice(0,-1)">
              <svg class="payment-cancel-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.67 253">
                  <g >
                    <path d="M54.63,136.23,148.12,253V0L54.63,116.77A12.54,12.54,0,0,0,54.63,136.23Z"/>
                    <path d="M388,0H147.67V253h240a13,13,0,0,0,13-13V12.72A12.73,12.73,0,0,0,388,0ZM330.74,166.1a12,12,0,0,1-17,17l-39.6-39.6-39.6,39.6a12,12,0,0,1-17-17l39.6-39.6L217.6,86.9a12,12,0,1,1,17-17l39.6,39.6,39.6-39.6a12,12,0,0,1,17,17l-39.6,39.6Z"/>
                  </g>
              </svg>
            </div>
        </div>
    </div>

  </div>
  `,
  props:{
    password:{
    },
    pay:{
      type:Function,
    },
    forget:{
      type: Function,
    }
  },
  data() {
    return {
      showPayment: false,
      passWord:'',
      nums:['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    }
  },
  mounted() {
  },
  methods:{
    getpayword(){
      this.forget();
    }
  },
  computed:{

  },
  watch:{
    showPayment(newval){
      if(newval){
        const scrollTop = $('body').scrollTop();//body设置为fixed之后会飘到顶部，所以要动态计算当前用户所在高度
        $('body').css({
            'overflow':'hidden',
            'position': 'fixed',
            'top': scrollTop*-1
        });
      }else{
        this.passWord = '';
        $('body').css({
          'overflow':'auto',
          'position': 'static',
          'top': 'auto'
      });
      }
    },
    passWord(newval){
      if(newval.length>=6){
        this.pay&&this.pay(newval);
        this.$emit("update:password", newval);
        setTimeout(()=>{
          this.showPayment = false;
        },500)
      }

    
    }
  }
})



// demo
/* <payment :password.sync="password">{{password || '这是内容'}}</payment> */
/* <payment :password.sync="password" :forget="func">{{password || '这是内容'}}</payment> */