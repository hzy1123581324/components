<template>
    <view :id="'tabs-panel-'+index">
        <slot/>
    </view>
</template>

<script>
    export default {
        name: 'z-tabs-panel',
        // inject: ['panelid'],
        props:{
            index: {
                type: [Number,String],
                default: 0,
            }
        },
        mounted() {
            
        },
        methods:{
            
        }
    }
</script>

<style>
</style>
