//heredoc方法输出注释中的组件代码
function heredoc(fn){
  return fn.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}
//输出组件代码
document.write(heredoc(function(){
/*
<style>
.switch_boxs{
  border:2px solid ;
  background-color: #ececec;
  transition:all .2s linear;
  -webkit-transition:background .2s linear;
  -moz-transition:background .2s linear;
  -ms-transition:background .2s linear;
  -o-transition:background .2s linear;
  box-sizing: content-box;
}
.switch_items{
  width:50%;
  height:100%;
  position: relative;
  left:0;
  top:0;
  border-radius: 50%;
  background-color: #fff;
  transition:all .2s linear;
  -webkit-transition:all .2s linear;
  -moz-transition:all .2s linear;
  -ms-transition:all .2s linear;
  -o-transition:all .2s linear;
  box-shadow: 0px 0px 2px inset #f7f7f7;
}
.switch_boxs.active .switch_items{
  left:50%;
}
</style>
<script type="text/x-template" id="switch">
<div class="switch_boxs" :class="[is_active&&'active']" :style="'color:'+(is_active?activeColor:color)+';background-color:'+(is_active?activeColor:color)+';'" @click="tap">
  <div class="switch_items" ></div>
</div>
</script>
*/}))

Vue.component('switchBtn',{
  template: "#switch",
  props: {
    state:[String, Number,Boolean],
    activeColor:{
      type:String,
      default:'',
    },
    color:{
      type:String,
      default:'#ddd',
    },
  },
  data: function () {
    return {
        is_active:this.state||false,
        style:'',
    }
  },
  mounted:function(){
  
  },
  methods: {
    tap:function(){
      this.is_active=!this.is_active;
      this.$emit('change',this.is_active);
    }
  
  },
  watch:{
    state: function(val){
      this.is_active = val;
    }
  },
  computed: {
    // style: function () {
    //   var style='';
    //   style+='color:'+(this.is_active?this.activeColor:this.color)+';';
    //   style+='background-color:'+(this.is_active?this.activeColor:this.color)+';';
    //   return style;
    // },
  }
  })