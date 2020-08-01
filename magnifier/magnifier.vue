<template>
	    <view class="magnifier-box" id="magnifier">
	        <view class="small-box" id="small-box" @touchstart="showBig = true"  @touchend="showBig = false">
	            <view id="float-box" class="float-box"></view>
				<slot>
					<image :src="src"  mode="widthFix"/>
				</slot>
	            
	        </view>
	        <view class="big-box" id="big-box" v-show="showBig">
	            <slot>
	            	<image :src="src"  mode="widthFix" />
	            </slot>
	        </view>
	    </view>
</template>

<script>
	/**
	 * magnifier 放大镜
	 * @description 图片放大镜，常用于展示商品图片
	 * @tutorial https://www.uviewui.com/components/button.html
	 * @property {String} src 图片路径
	 * @example <magnifier :num.sync="num"></magnifier>
	 */
	export default {
		name: "magnifier",
		props: {
			src: {
				type: String,
				default: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/bao/uploaded/i2/1026430696/O1CN011H0o7UD6ZwLT3vl_!!1026430696.jpg_430x430q90.jpg',
			}
		},
		data: function() {
			return {
				showBig: false,
			};
		},
		created: function() {
			// this.src = 'https://img.alicdn.com/imgextra/https://img.alicdn.com/bao/uploaded/i2/1026430696/O1CN011H0o7UD6ZwLT3vl_!!1026430696.jpg_430x430q90.jpg'
		},
		mounted: function() {
			 //找五个个元素：demo，smallBox,foatBox,bigfloatBox,imgs,
			 return 
			var objDemo = document.getElementById("demo");
			var objSmallBox = document.getElementById("small-box");
			var objFloatBox = document.getElementById("float-box");
			var objBigBox = document.getElementById("big-box");
			var objBigBoxImg = objBigBox.getElementsByTagName("img")[0];

			//给小盒子添加事件，移入和移出
			//移入：浮动的box和和bigBox显示
			objSmallBox.onmouseover = function () {
				objFloatBox.style.display = "block";
				objBigBox.style.display = "block";
			}
			//移除：浮动的box和bigBox隐藏
			objSmallBox.onmouseout = function () {
				objFloatBox.style.display = "none";
				objBigBox.style.display = "none";
			}

			//给小盒子添加鼠标移动事件
			objSmallBox.onmousemove = function (ev) {
				var _event = ev || window.event;//做兼容性，兼容IE
				//1计算值：
				var left = _event.clientX - objDemo.offsetLeft - objSmallBox.offsetLeft - objFloatBox.offsetWidth / 2;
				var top = _event.clientY - objDemo.offsetTop - objSmallBox.offsetTop - objFloatBox.offsetHeight / 2;

				//5.优化，在前面加判断,不让其溢出，加判断
				if (left < 0) left = 0;
				if (top < 0) top = 0;
				if (left > objSmallBox.offsetWidth - objFloatBox.offsetWidth)
					left = objSmallBox.offsetWidth - objFloatBox.offsetWidth;
				if (top > objSmallBox.offsetHeight - objFloatBox.offsetHeight)
					top = objSmallBox.offsetHeight - objFloatBox.offsetHeight;

				//2把值赋值给放大镜
				objFloatBox.style.left = left + "px";
				objFloatBox.style.top = top + "px";

				//3计算比例
				var percentX = left / (objSmallBox.offsetWidth - objFloatBox.offsetWidth);
				var percentY = top / (objSmallBox.offsetHeight - objFloatBox.offsetHeight);

				//4利用这个比例计算距离后赋值给右侧的图片
				objBigBoxImg.style.left = -percentX * (objBigBoxImg.offsetWidth - objBigBox.offsetWidth) + "px";
				objBigBoxImg.style.top = -percentY * (objBigBoxImg.offsetHeight - objBigBox.offsetHeight) + "px";
			}
		},
		methods: {
		}
	};
</script>

<style scoped>
	.magnifier-box{
		display: inline-block;
	}
	.small-box{
		display: inline-block;
		cursor: zoom-in;
		vertical-align: bottom;
		position: relative;
	}
	/* 悬浮层 */
	.float-box{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		
	}
	.big-box{
		position: absolute;
		left: 100%;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 100;
	}
	image{
		vertical-align: bottom;
	}
</style>
