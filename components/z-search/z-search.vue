<template>
	<input type="text" v-model="modelValue" />
</template>

<script setup>
	/*
	* @dev 这是一个搜索组件，带节流防抖
	*/ 
	
	import {ref} from "vue";
	
	defineProps({
		modelValue: {
			type: String,
		}
	})
	
</script>

<style>
</style>
