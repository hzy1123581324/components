<template>
	<view class="flex-font-box" :style="fontStyle">{{content}}</view>
</template>
<script>
    /**
     * 背景色是字体颜色，只是透明度不一样，
     * @description 适用各种场景的按钮
     * @tutorial https://ext.dcloud.net.cn/plugin?id=329
     * @property {String} type = [default|navigation] 按钮类型
     *     @value default 默认按钮，没有其他功能
     *     @value navigation 路由按钮功能跟 navigation 一样
     * @property {String} shape = [square|circle] 按钮类型
     *      @value square 默认圆角
     *      @value circle 两边为半圆
     * @property {Boolean} ripple 是否开启点击水波纹效果 默认开启
     * @property {Boolean} plain 是否镂空 默认不镂空 
     * @property {Boolean} disable 是否禁用，默认不禁用 
     * @property {Function } postpone 仿重复点击事件，传入一个方法 
     * @property {Boolean} animation = [ture|false] 是否开启动画
     * @property {String,Nubmer} stayTime  接口调用后必须等待多少时间才可点击
     * @property {String,Nubmer} outTime 超出时间，后可以点击
     * @event {Function} change 打开关闭弹窗触发，e={show: false}
     * @example <z-button class="button"></z-button>
       <style>
           .button{
              --btn-height: 按钮高度 默认 84rpx
              --btn-bor-width: 边框宽度 默认2rpx
              --btn-bor-color: 边框颜色 默认 当前字体颜色
              --btn-color  按钮字体颜色 默认#333
              --btn-bg: 按钮背景色  默认red
              --btn-img:  一般用于设置渐变色
              --btn-disable-bg 按钮禁用背景色  默认颜色不变
              --btn-disable-color 按钮禁用字体颜色 默认#fff
              --btn-disable-opacity 按钮禁用透明度 默认1
              --btn-disable-bor-color
              --btn-font-size: 字体大小 默认32rpx
              --btn-font-weight: 字重   默认600
              --btn-radius: 圆角，8rpx
           }
           
       </style>
     
     */
    export default {}
</script>
<script setup>
    /*
    * @dev 根据宽度计算字体大小
    */ 
	import {
		ref,
		reactive,
		watch,
		computed
	} from "vue";

	const props = definedProps({
		content: {
			type: String,
			required: true,
			default: ''
		},
		max: {
			type: [Number, String],
			default: 60
		},
		min: {
			type: [Number, String],
			default: 18
		},
	})
	let fontBoxWidth = ref(0);
	let timer = ref('');

	watch(() => props.content, (newval, oldval) => {
		setTimeout(getWidth, 300)
	});
	let fontStyle = computed(()=>{
		
		    let {max,min,fontBoxWidth,content}= props;
		    if(!content||fontBoxWidth==0){
		        return '';
		    }
		    let fontsize = fontBoxWidth.value/content.value.length;
		    // console.log(fontBoxWidth,content.length,fontsize,'8888888888888888888888888');
		    if(!max){
		        max = fontsize
		    }
		    if(!min){
		        min = fontsize
		    }
		    min = uni.upx2px(min);
		    max = uni.upx2px(max);
		    if(min-fontsize<=0&&fontsize-max<=0&&fontsize!=0){
		        return `--font-size: ${fontsize}px;`
		    }else if(fontsize<min){
		        return `--font-size: ${min}px;`
		    }else if(fontsize>max){
		        return `--font-size: ${max}px;`
		    }
		
	});
	function getWidth() {
		/// **************************注意********************************c
		/// **************************注意********************************c
		/// **************************注意********************************c
		/// **************************注意********************************c
		/// **************************注意********************************c
		/// 原来是有this的，但是vue3 没有this了， 所以要看看效果是否有问题
		// uni.createSelectorQuery().in(this).select('.flex-font-box').fields({
		uni.createSelectorQuery().in().select('.flex-font-box').fields({
			size: true,
			rect: true,
			scrollOffset: true,
		}, data => {
			// console.log("得到布局位置信息" + JSON.stringify(data));
			// console.log("节点离页面顶部的距离为" + data.top);
			if (data) {
				clearInterval(timer.value);
				timer.value = null;
				fontBoxWidth.value = parseFloat(data.width);

			}
		}).exec();
	}
</script>

<style scoped>
	.flex-font-box {
		max-width: 100%;
		/* width: 100%; */
		max-height: 100%;
		height: auto;
		display: inline-block;
		word-wrap: break-word;
		word-break: break-all;
		/* 强制英文单词断行  */
		font-size: var(--font-size, inherit)
	}
</style>
