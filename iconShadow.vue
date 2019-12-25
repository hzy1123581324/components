<!-- 
这是利用 filter实现改变图标颜色的组件，不支持渐变
 -->
<template>
	<view class="icon-shadow" id="iconBox" ref='iconBox' @click="__change_color">
		<text class="iconshadowbg" :style="'backgroundImage:url('+url+');border-right:'+ width+'px;filter: drop-shadow('+active_color+' '+width+'px 0px);'" ></text>
	</view>
</template>

<script>
	export default {
		name: 'icon-shadow',
		props: {
			url:{
				type: String,
				default: '../static/code.png',
				// required: true,
			},
			size: {
				type: [String,Number,Object],
				default: '{"width":"72upx","height":"72upx"}',
			},
			colors:{
				type: [String,Array],
				// required: true,
				default: ()=>{return ['#f55','#000','blue','green']},
			},
			colorIndex:{
				type: [String,Number],
				default: 0
			}
		},
		data() {
			return {
				width: 0,
				active_color: '',
				color_index: 0,
			}
		},
		mounted() {
			this.color_index = this.colorIndex;
			const query = uni.createSelectorQuery()
			query.select('#iconBox').boundingClientRect()
			// query.selectViewport().scrollOffset()
			query.exec((res)=>{
				// res[0].top       // #the-id节点的上边界坐标
				// res[1].scrollTop // 显示区域的竖直滚动位置
				//console.log('打印高度',res[0].height);
				//console.log('打印demo的元素的信息',res);
			  this.width = res[0].width;
			})
			this.__init__();
		},
		methods: {
			__init__(){
				// let { iconBox } = this.$refs;
				// console.log(iconBox);
				let {colors,color_index} = this;
				// console.log(colors,color_index,'%%%%%%%%%%%%%%%%%')
				
				if(typeof(colors) == 'string'){
					this.active_color = colors;
					// console.log(this.colors,this.active_color);
				}else if(typeof(colors) == 'object'){
					// console.log(color_index,'*****************')
					this.active_color = colors[color_index];
				}
				// console.log(this.active_color);
			},
			__change_color(){
				let { color_index,colors } = this;
				if(typeof(colors) == 'string'){
					return ;
				}
				color_index++;
				if(color_index>=colors.length){
					color_index = 0;
				}
				this.color_index =color_index;
				this.__init__();
				this.$emit('changeindex',this.color_index);
			}
		},
		watch: {
			colorIndex:function(){
				this.color_index = this.colorIndex;
				this.__init__();
			}
		},
		computed: {
		}
	}
</script>
<!-- <style src="./index.css"></style> -->
<style scoped lang="stylus">
	.icon-shadow
		position relative
		overflow hidden
		display inline-block
		
		
	.iconshadowbg
		// background-color green
		width 100%
		height 100%
		position absolute
		background-repeat no-repeat
		background-position center
		background-size 100%
		border-style solid
		border-color transparent
		box-sizing content-box
		border-width  0
		top 0
		left 0
		margin-left -100%
		// background-image url('../static/code.png')
		// -webkit-filter drop-shadow(#f55 72upx 0)
		// filter drop-shadow(#f55 72upx 0)
		// left: -25px;
		// background-repeat: no-repeat;
		// background-position:center;
		// background-size: 100%;
		// border-right: 25px solid transparent;
		// display: inline-block;
		// margin-right: 24px;
		// border-right 21px
</style>

<!-- 
 
 demo
 <icon-shadow class="size72" :colors="['#f55','#111','#f0f']" :colorIndex="2"></icon-shadow>
 
 -->