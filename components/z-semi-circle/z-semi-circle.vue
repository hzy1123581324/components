<template>
    <view class="semiCircle" :style="stickyStyle" ref="semiCircle">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: "semiCircle",
        props: {
            // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
            bg: {
                type: String,
                default: '#f55'
            },
            radian: { //控制弧度比例
                type: String,
                default: '1.6',
            }
        },
        data() {
            return {
                width: 0,
                height: 0,
            };
        },
        watch: {},
        computed: {
            // uZIndex() {
            //     return this.zIndex ? this.zIndex : this.$u.zIndex.sticky;
            // }
            stickyStyle() {
                let {
                    height,
                    width,
                    radian
                } = this;
                let radius = width * this.radian; //半径
                let percentage = (height - radius) / height * 100;
                let bg_str =
                    `radial-gradient(circle at 50% ${percentage}%,${this.bg} 0,${this.bg} ${radius}px,rgba(0, 0, 0, 0) ${radius}px)`;
                return {
                    "background-image": [
                        "-moz-" + bg_str,
                        "-webkit-" + bg_str,
                        "-o-" + bg_str,
                        bg_str,
                    ]
                }
            },


        },
        mounted() {
            const query = uni.createSelectorQuery().in(this);
            query.select('.semiCircle').boundingClientRect(data => {
                this.height = data.height;
                this.width = data.width;
            }).exec();
        },
        methods: {}
    };
</script>

<style>
    .semiCircle {}
</style>
