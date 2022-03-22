<template>
    <view class="font-bg" :style="`--font-bg-opacity:${opacity}` " >
        <slot></slot>
    </view>
</template>

<script setup>
    import {computed} from 'vue';
    const props = defineProps({
        opacity: {
            type: Number,
            default: 0,
        }
    });
</script>

<style scoped>
    .font-bg{
        position: relative;
    }
    .font-bg::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: currentColor;
        
        opacity: var(--font-bg-opacity,0);
    }
    
</style>
