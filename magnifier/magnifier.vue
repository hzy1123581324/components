<template>
    <view class="magnifier-box" id="magnifier">
        <view class="small-box" ref="smallbox">
            <view id="float-box" class="float-box" @mousemove="moving($event)" @mouseout="showBig = false" :style="floatStyle"></view>
            <slot>
                <image :src="src" mode="widthFix" />
            </slot>
        </view>
        <view class="big-box" id="big-box" v-show="showBig" :style="bigStyle">
            <slot>
                <image :src="bigsrc||src" mode="widthFix" />
            </slot>
        </view>
    </view>
</template>

<script>
    /**
     * magnifier 放大镜
     * @description 图片放大镜，常用于展示商品图片
     * @tutorial https://www.uviewui.com/components/magnifier.html
     * @property {String} src 图片路径
     * @property {String} bigsrc 大图图片路径
     * @property {String,Number} multiple 大图放大的倍数
     * @example <magnifier src="https://img.alicdn.com/bao/uploaded/i2/1026430696/O1CN011H0o7UD6ZwLT3vl_!!1026430696.jpg_430x430q90.jpg"></magnifier>
     * @example <magnifier><image src="https://img.alicdn.com/bao/uploaded/i2/1026430696/O1CN011H0o7UD6ZwLT3vl_!!1026430696.jpg_430x430q90.jpg"></image></magnifier>
     */
    export default {
        name: "magnifier",
        props: {
            src: {
                type: String,
                default: '',
            },
            bigsrc: {
                type: String,
                default: "",
            },
            multiple: {
                type: [String, Number],
                default: 1.5,
            },
        },
        data: function() {
            return {
                showBig: false,
                offsetX: 0,
                offsetY: 0,
                imgWidth: 0,
                imgHeight: 0,
            };
        },
        created: function() {},
        watch: {
            showBig(newval) {
                if (!newval) {
                    this.offsetX = 0;
                    this.offsetY = 0;
                }
            },
        },
        computed: {
            bigStyle() {
                let {
                    floatX,
                    floatY,
                    multiple,
                    imgWidth
                } = this;
                if (imgWidth == 0) {
                    return `--left:0%;--top:-0%;--scale:1;`;
                } else {
                    return `--left:-${floatX * multiple}px;--top:-${
          floatY * multiple
        }px;--scale:${multiple};`;
                }
            },
            floatStyle() {
                let {
                    floatWidth,
                    floatHeight,
                    floatX,
                    floatY
                } = this;
                return `--width:${floatWidth}px;--height:${floatHeight}px;--floatLeft:${floatX}px;--floatTop: ${floatY}px;`;
            },
            floatWidth() {
                let {
                    imgWidth,
                    multiple = 1
                } = this;
                return imgWidth / multiple;
            },
            floatHeight() {
                let {
                    imgHeight,
                    multiple = 1
                } = this;
                return imgHeight / multiple;
            },
            floatX() {
                let {
                    offsetX,
                    floatWidth,
                    imgWidth
                } = this;
                if (offsetX < floatWidth / 2) {
                    return 0;
                } else if (parseFloat(offsetX) + floatWidth / 2 > imgWidth) {
                    return imgWidth - floatWidth;
                } else {
                    return offsetX - floatWidth / 2;
                }
            },
            floatY() {
                let {
                    offsetY,
                    floatHeight,
                    imgHeight
                } = this;
                if (offsetY < floatHeight / 2) {
                    return 0;
                } else if (parseFloat(offsetY) + floatHeight / 2 > imgHeight) {
                    return imgHeight - floatHeight;
                } else {
                    return offsetY - floatHeight / 2;
                }
            },
        },
        mounted: function() {
            setTimeout(() => {
                this.imgWidth = this.$refs.smallbox.offsetWidth;
                this.imgHeight = this.$refs.smallbox.offsetHeight;
            }, 500);
            return;
        },
        methods: {
            moving(event) {
                this.showBig = true;
                let {
                    offsetX,
                    offsetY
                } = event;
                this.offsetX = offsetX;
                this.offsetY = offsetY;
            },
        },
    };
</script>

<style scoped>
    .magnifier-box {
        display: inline-block;
        position: relative;
        margin-top: 30px;
        margin-left: 30px;
    }

    .small-box {
        display: inline-block;
        cursor: zoom-in;
        vertical-align: bottom;
        position: relative;
    }

    /* 悬浮层 */
    .small-box:hover .float-box::after {
        opacity: 1;
        pointer-events: auto;
    }

    .float-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        z-index: var(--index10, 10);
    }

    .float-box::after {
        opacity: 0;
        pointer-events: none;
        content: "";
        width: var(--width, 10%);
        height: var(--height, 10%);
        background-color: rgba(255, 255, 234, 0.5);
        position: absolute;
        left: var(--floatLeft, 0);
        top: var(--floatTop, 0);
    }

    .big-box {
        position: absolute;
        left: 120%;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 100;
        overflow: hidden;
    }

    .big-box img {
        width: calc(100% * var(--scale, 1));
        height: calc(100% * var(--scale, 1));
        left: var(--left, 50%);
        top: var(--top, 50%);
    }

    img {
        vertical-align: bottom;
    }
</style>
