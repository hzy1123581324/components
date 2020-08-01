<template>
	<view class="text-gradient-main">
		{{txt}}
		<view class="text-gradient">
			{{txt}}
		</view>
	</view> 
</template>

<script>
	export default {
		props:{
			txt:{
				type: String,
				default: '爱的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的爱的发的发的',
			},

		},
		watch:{
			pwd(newval){
	
			}
		},
		data() {
			return {

			};
		},
		methods:{

		}
	}
</script>

<style>
	 /* 文字渐变 */
	.text-gradient-main {  
		display: inline-block;
		font-family: '微软雅黑';
		font-size: 20upx;
		position: relative; 
		color: red;
	}  
	  
	.text-gradient {  
		/* content: attr(data-text);  */
		color: #FBEE00;  
		position: absolute;  
		left: 0; 
		top: 0;
		z-index: 2;
		mask-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FBEE00), to(rgba(251,246,147,.6)));
		-webkit-mask-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FBEE00), to(rgba(251,246,147,.6)));
	}
</style>
