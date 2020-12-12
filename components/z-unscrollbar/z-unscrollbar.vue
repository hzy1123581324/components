<template>
    <view class="outer-container">
        <view class="inner-container">
            <view class="content">
                <slot></slot>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        props: {
            
        },
        methods: {
            handleScroll(e) {
                const top = e.target.scrollTop;

                if (top > 100) {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            }
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll, true);
        },
        destroyed() {
            window.removeEventListener("scroll", this.windowScroll, true);
        }
    };
</script>
<style scoped>
    .outer-container {
        width: 200px;
        height: 200px;
    }

    .outer-container {
        border: 5px solid purple;
        position: relative;
        overflow: hidden;
    }

    .inner-container {
        position: absolute;
        left: 0;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .inner-container::-webkit-scrollbar {
        display: none;
    }
</style>
