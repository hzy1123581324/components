<template>
    <view class="capsule-tab-box" :style="varStyle">
        <view class="capsule-tab-views">
            <view :class="['capsule-tab-item',activeIndex==index&&'active']" v-for="(item,index) in list" :key="item.id" @click="activeIndex = index">
                {{item[keyname]}}
            </view>
        </view>
        <view class="capsule-tab-shadow"></view>
    </view>
</template>

<script>
    export default {
        name: 'capsule-tab',
        props: {
            list: {
                required: true,
                type: Array,
                default: () => {
                    return [];
                }
            },
            keyname: {
                type: String,
                default: 'name',
            },
            index:{
                type: [String, Number],
                default: 0,
            }
        },
        data() {
            return {
                activeIndex : 0
            }
        },
        computed: {
            varStyle() {
                let {
                    list,
                    activeIndex,
                } = this;
                let percentageWidth = 100 / list.length;
                let percentageLeft = activeIndex/list.length * 100;
                return `--percentageWidth: ${percentageWidth}%;--shadow-bg-lf:${percentageLeft}%; `
            },
        },
        watch:{
            activeIndex(newval){
                this.$emit('update:index',newval);
            },
            index(newval){
                this.activeIndex = newval;
            }
        },
        mounted() {
            this.activeIndex = this.index;
        },

    }
</script>

<style scoped>
    .capsule-tab-box {
        position: relative;
        overflow: hidden;
        --height: 78rpx;
        height: var(--capsule-tab-height, var(--height));
        border-radius: var(--capsule-tab-radius, calc(var(--capsule-tab-height, var(--height)) / 2));
        text-align: center;
        --transition: all ease-in-out 0.3s 0s;

    }
    .capsule-tab-views {
        position: relative;
        z-index: 2;
        color: var(--capsule-tab-item-color,var(--theme-color,inherit));
        font-size: var(--capsule-tab-item-font-size, inherit);
        font-weight: var(--capsule-tab-item-font-weight, inherit);
        display: flex;
        height: 100%;
        line-height: var(--capsule-tab-height, var(--height));
        /* flex: 1 0; */
    }

    .capsule-tab-item {
        width: var(--percentageWidth);
        /* flex-shrink: 0; */
        flex: 1 0 ;
        --shadow: 2rpx 0 0 0 var(--theme-color,inherit) inset;
        box-shadow: var(--capsule-tab-item-shadow,var(--shadow));
        transition: var(--transition);
    }
    .capsule-tab-item.active{
        color: var(--capsule-tab-item-active-color,inherit);
        font-size: var(--capsule-tab-item-active-font-size, inherit);
        font-weight: var(--capsule-tab-item-active-font-weight, inherit);
    }

    .capsule-tab-shadow {
        position: absolute;
        width: var(--percentageWidth);
        height: 100%;
        top: 0;
        left: var(--shadow-bg-lf);
        background-color: var(--capsule-tab-shadow-bg, var(--theme-color));
        z-index: 1;
        transition: var(--transition);
    }
</style>
