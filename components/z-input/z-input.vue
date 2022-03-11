<template>
	<view class="input-box">
		<!-- 前缀 -->
		<slot name='prefix'>
		</slot>
		<!-- 输入框 -->
		<input class="input-into" :type="type == 'password' ? 'text' : type" :value="defaultValue"
			:password="type == 'password' && !showPassword" :placeholder="placeholder"
			placeholderClass="input-placeholder" :disabled="disabled" :maxlength="maxlength" :focus="focus"
			@focus="onFocus" @blur="handleBlur" @input="handleInput" @confirm="onConfirm" />
		<!-- 后缀 -->
		<slot name='suffix'>
			<view class="" @click="clear" v-if="defaultValue">
				<z-icon class="suffix-icon" type="close"></z-icon>
			</view>
		</slot>
		<!-- 报错提示 -->
		<view class="input-error" v-if="errMsg">
			{{errMsg}}
		</view>
	</view>

</template>

<script setup>
	/*
	 * @dev z-input 组件实现了前置跟后置，加 错误提示
	 *
	 */

	import {
		ref,
		computed,
		onBeforeMount,
		watch
	} from "vue";
	let errMsg = ref('');
	let defaultValue = ref("");
	let throttle,watchThrottle;
	
	const emit = defineEmits(['update:modelValue','focus','confirm']);
	const props = defineProps({
		modelValue: {
			type: String,
			default: "",
		},
		/// 输入类型默认文本框
		type: {
			type: String,
			default: "text",
		},
		/// 是否自动获取焦点
		focus: {
			type:Boolean,
			default: false
		},
		/// 占位符
		placeholder: {
type: String,
			default: "",
		},

		/// 是否禁用
		disabled: {
			type: Boolean,
			default: false,
		},
		/// 输入的最大长度
		maxlength: {
			type: Number,
			default: -1
		},
		showClear:{
			type: Boolean,
			default: true,
		}

	})

	let focused = computed({
		get() {
			return props.focus;
		},
		set(val) {
			props.focus
		}
	});
	
	onBeforeMount(()=>{
		defaultValue.value = props.modelValue;
	});
	
	watch(()=>props.modelValue,(newval,oldval)=>{
		if(watchThrottle){
				clearTimeout(watchThrottle);
			}
			watchThrottle = setTimeout(()=>{
				defaultValue.value = newval;
			},100);
		
	})
	
	// 监听获得焦点事件
	function onFocus() {
		focused = true;
		emit("focus");
	}
	// 监听失去焦点事件
	function handleBlur() {

	}
	//监听输入框输入
	function handleInput(e) {
		let { value = "" } = e.detail || {};
		if(throttle){
			clearTimeout(throttle);
			throttle = null;
		}
		throttle = setTimeout(()=>{
			defaultValue.value = value;
			if(defaultValue.value!=props.modelValue){
				emit("update:modelValue",value);
			}
		},300);
		
	}
	// 点击键盘确认键
	function onConfirm() {
		emit("confirm", defaultValue.value);
	}
	/// 清空输入框
	function clear() {
		defaultValue.value = '';
		emit("update:modelVlaue",'');
	}
</script>

<style scoped>
	.input-box {
		width: 100%;
		--height: 98rpx;
		--border: 1rpx solid var(--border-color, currentColor);
		height: var(--input-height, var(--height));
		border-radius: var(--input-border, 0);
		border: var(--input-border,var(--border));
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
	}

	.input-into {
		flex-grow: 1;
		width: 30%;
		flex-shrink: 0;
		height: 100%;
		padding-right: var(--input-into-pd-rg,2.5em);
	}

	.input-placeholder {
		font-size: var(--input-place-font-size, inherit);
		color: var(--input-place-color, inherit)
	}
	/* 错误信息 */
	.input-error{
		color: var(--input-err-color,red);
		font-size: var(--input-err-fs, inherit);
		padding: var(--input-pad,1em);
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.suffix-icon{
		--icon-size : 28rpx;
		--icon-color: #141414; 
		
	}
</style>
