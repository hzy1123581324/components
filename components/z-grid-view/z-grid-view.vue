<template>
	<view class="grid-view-box">
		<view :class="{'grid-view-item': true,'left-space': index%column!=0,'top-space': index>=column}" v-for="(item,index) in list" :key="index" :style="gridViewStyle(index)">
			<!-- <view class="">
				{{item}}
			</view> -->
			<slot :item="item"></slot>
		</view>
	</view>
</template>

<script setup>
	/*
	* 长列表
	*/ 
	import {computed} from "vue";
	const props = defineProps({
		column: {
			type: Number,
			default: 2
		},
		list: {
			type: Array,
			default: []
		}
	});
	
	function gridViewStyle (index){
		if(index % props.column==0){
			return '';
		} else {
			return `--grid-view-mar-lf:var(--grid-view-space,0)`;
		}
		
	}
 
</script>

<style scoped>
	.grid-view-box{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.grid-view-item{
		min-width: var(--grid-view-width);
		display: flex;
		flex-direction: var(--grid-flex-direction,column);
		flex-shrink: 0;
	}
	.left-space{
		margin-left:var(--grid-view-lf-space,var(--grid-view-space,0));
	}
	.top-space{
		margin-top: var(--grid-view-top-space,var(--grid-view-space,0));
	}
</style>
