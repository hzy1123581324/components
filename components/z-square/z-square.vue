<template>
    <div class="square-box" :style='squareStyle'>
        <div class="square">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    /**
     * square  正方形
     * @description 仅用css制作正方形
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String} src 图片地址
     * @example
     * <square></square>
     */

    export default {};
		
		import {computed,} from 'vue';
		const props = defineProps({
			src: {
				type: String,
				default: '',
			}
		})
		const squareStyle = computed(()=>{
			if (src.value) {
			    return `--bg-image: url(${src.value})`;
			} else {
			    return "";
			}
		});
		
</script>

<style scoped>
    .square-box {
        height: 0;
        box-sizing: content-box;
        padding-top: 100%;
        position: relative;
        background-image: var(--bg-image);
    }

    .square-box img {
        -o-object-fit: cover;
        object-fit: cover;
    }

    .square-box .square {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }

    .square-box .square:empty {
        display: none;
    }
</style>
