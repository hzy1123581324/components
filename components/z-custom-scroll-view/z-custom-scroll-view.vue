<template>
	<scroll-view class="scroll-big-box" scroll-y="true" @scroll="throttleFun">

			<view class="expand-box" v-if="expanded>0">
				<slot name="expand" :percentage="percentage"></slot>
			</view>
      
      <view class="grow " style="height: 50%;">
        <slot></slot>
      </view>
			
			<!-- 通常固定在左下角，用于返回 -->
			<view class="scroll-fixed" v-if="fixed>0" @click="onTapScrollFixed">
				<slot name="fixed" :percentage="fixedPercentage"></slot>
			</view>

	</scroll-view>
	<view class="scroll-footer">
		<slot name="footer"></slot>
	</view>
</template>

<script setup>
	// 伸缩滚动盒子
	import {
		ref,
		reactive,
		nextTick
	} from 'vue';
	import {
		throttle
	} from "../../utils/optimize.js";
	const props = defineProps({
		/// 
		expanded: {
			type: Number,
			default: 1,
		},
		fixed: {
			type: Number,
			default: 0
		}
	});
	let scrollTop = ref(0);
	const emit = defineEmits(['onTapScrollFixed']);

	let percentage = ref(0);
	let fixedPercentage = ref(0);

	function throttleFun(e) {
		// console.log(e.detail, '4444444444');
		// event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
		if (e.detail.scrollTop <= 0) {
			percentage.value = 0;
			fixedPercentage.value = 0;
		} 
		if (props.expanded <= e.detail.scrollTop||props.expanded  == 0) {
			percentage.value = 1;
		} else {
			percentage.value =e.detail.scrollTop/ props.expanded;
		}
		if (props.fixed <= e.detail.scrollTop||props.fixed  == 0) {
			fixedPercentage.value = 1;
		} else {
			fixedPercentage.value =e.detail.scrollTop/ props.fixed;
		}

		nextTick(() => {
			scrollTop.value = e.detail.scrollTop;
		});
	}


	/// 点击了滚动固定元素
	function onTapScrollFixed() {
		emit('onTapScrollFixed', );
	}
</script>

<style scoped>
	.scroll-big-box {
		position: relative;
		flex-grow: 1;
		height: 50vh;
	}

	.scroll-content {
		display: flex;
		flex-shrink: 0;
		flex-direction: column;
    flex-grow: 1;
    height: ;
	}

	.scroll-fixed {
		position: fixed;

	}
</style>
