//heredoc方法输出注释中的组件代码
function heredoc(fn) {
  return fn.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}
//输出组件代码
document.write(heredoc(function () {
/*
<style>
.head-box{
		color: #fff;
	}
	.head-title{
		height: 13.066667vw;
		margin: 0 10.66667vw;
	}
	.head-right{
		height:5.33333vw;
		min-width: 13.33333vw;
		line-height: 5.33333vw;
	}
</style>
<script type="text/x-template" id="headBar">
<div class="w_100 clear head-box" ref="headBox" :style="'padding-top:'+pad_top">
		<div class="relative" >
			<div class="back absolute_lf_center mar_lf_30 " v-show="showBack" @click="back()" ></div>
			<div class="head-title txt_c flex flex_center fs32" >
				<slot></slot>
			</div>
			<div class="head-right txt_rg absolute_rg_center color_999 mar_rg_30">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</script>
*/}))

Vue.component('headBar',{
template: "#headBar",
props:{
    showBack:{
      type: Boolean,
      default: true
    },
  },
data: function () {
  return {
    title:Global.page.title,
    pad_top:0,
  }
},
mounted(){
  this.pad_top = api.safeArea.top+'px';
  this.$emit('show',this.$refs.headBox.clientHeight);
  
},
methods: {
  back:function(){
    if(this.backTo){
      $cyz.closeToWin(this.backTo);
    }else{
      $cyz.closeWin();
    }
  },
  tap:function(){
    this.$emit('headrg');
  }

},
computed: {

}
})