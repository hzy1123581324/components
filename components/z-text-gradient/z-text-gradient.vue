<template>
	<view class="text-gradient-main">
		<slot>{{txt}}</slot>
		<view class="text-gradient">
			<slot>{{txt}}</slot>
		</view>
	</view>
</template>

<script setup>
	/**
	 * textGradient 文字渐变
	 * @description 通过css 实现文字渐变 ，支持ios 
	 * @tutorial https://www.uviewui.com/components/button.html
	 * @property {String} txt  显示的文本
	 * @example  <textGradient :txt="txt" ></textGradient>
	 */
	export default {}
	
	const props = defineProps({
		txt:{
			type: String,
			default: ''
		}
	})
</script>

<style scoped>
	/* 文字渐变 */
	.text-gradient-main {
		--font-size: 20rpx;
		--color: red;
		--gradient: -webkit-gradient(linear, 0 0, 0 bottom, from(#FBEE00), to(rgba(251, 246, 147, .6)));
		display: inline-block;
		font-family: '微软雅黑';
		font-size: var(--font-size);
		position: relative;
		color: var(--color);
	}

	.text-gradient {
		/* content: attr(data-text);  */
		color: var(--color);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		mask-image: var(--gradient);
		-webkit-mask-image: var(--gradient);
	}
</style>
