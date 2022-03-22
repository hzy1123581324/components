<template>
    <view :class="['root',themeDataClass]" :style="themeData">
        <slot></slot>
    </view>
</template>

<script setup>
    // getTheme是全局属性
    
    /**
     * theme 风格组件 存在root 节点不需要使用该组件
     * @description 该组件用于切换风格
     * @tutorial https://www.uviewui.com/components/noticeBar.html
     * @property {String} theme 强制指定风格
     * @example <z-theme-box class="tabs" :index.sync="index" :list="list"></z-theme-box>
     * <style>
         .theme-box{
         }
     </style>
     */
    // export default {
    //     name: 'z-theme-box',
    //     props: {
    //         // 指定风格
    //         theme: {
    //             type: String,
    //             default: ''
    //         }
    //     },
    // }
		const props = defineProps({
			/// 放在行内样式的
			themeData:{
				type: [String,Object,Array],
				default: '',
			},
			/// 定义风格样式类
			themeDataClass: {
				type: String,
				default: ''
			}
		})
		
</script>
