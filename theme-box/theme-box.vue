<template>
    <view :class="['root',theme||getTheme]">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: 'theme-box',
        props: {
            // 指定风格
            theme: {
                type: String,
                default: ''
            }
        },
    }
</script>
