// 验证码控件


Vue.component('code',{
  template: `<div class='code' ref="code-box" @click.stop="__send__">{{codetxt}}</div>`,
  props:{
    codeTxt:{
      type: String,
      default: '',
    },
    send:{
      type: Function,
    },

  },
  data: function () {
    return {
    }
  },
  mounted(){
      
  },
  methods: {
    __init__(){
      this.codetxt
    },
    __send__(){
      this.send();
      this.__wait__();
    },
    __wait__(){

    }
  },
  computed: {
    
  },
  watch: {
    
  },
})
