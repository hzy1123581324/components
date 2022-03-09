<template>
    <view class="flex-font-box" :style="fontStyle">{{content}}</view>
</template>

<script>
    export default {
        name: 'z-flex-font',
        props:{
            content: {
                type: String,
                required: true,
                default: ''
            },
            max: {
                type: [Number,String],
                default: 60
            },
            min: {
                type: [Number,String],
                default: 18
            },
        },
        data() {
            return {
                fontBoxWidth: 0,
                timer: ''
            }
        },
        mounted() {
            // if (!this.fontBoxWidth) {

            //     this.timer = setInterval(this.getWidth, 300);
            // } else {
            //     clearInterval(this.timer);
            //     this.timer = null;
            // }
        },
        watch:{
            content(newval){
                setTimeout(this.getWidth,300)
                // this.getWidth();
            }
        },
        computed: {
            fontStyle() {
                let {max,min,fontBoxWidth,content}= this;
                if(!content||fontBoxWidth==0){
                    return '';
                }
                let fontsize = this.fontBoxWidth/this.content.length;
                console.log(this.fontBoxWidth,this.content.length,fontsize,'8888888888888888888888888');
                if(!max){
                    max = fontsize
                }
                if(!min){
                    min = fontsize
                }
                min = uni.upx2px(min);
                max = uni.upx2px(max);
                if(min-fontsize<=0&&fontsize-max<=0&&fontsize!=0){
                    return `--font-size: ${fontsize}px;`
                }else if(fontsize<min){
                    return `--font-size: ${min}px;`
                }else if(fontsize>max){
                    return `--font-size: ${max}px;`
                }
            }
        },
        methods: {
            getWidth() {
                uni.createSelectorQuery().in(this).select('.flex-font-box').fields({
                    size: true,
                    rect: true,
                    scrollOffset: true,
                }, data => {
                    console.log( "得到布局位置信息" + JSON.stringify(data));
                    console.log("节点离页面顶部的距离为" + data.top);
                    if (data) {
                        clearInterval(this.timer);
                        this.timer = null;
                        this.fontBoxWidth =parseFloat(data.width);

                    }
                }).exec();
            }
        }
    }
</script>

<style>
    .flex-font-box{
        max-width: 100%;
        /* width: 100%; */
        max-height: 100%;
        height: auto;
        display: inline-block;
        word-wrap:break-word;
        word-break:break-all;/* 强制英文单词断行  */
        font-size: var(--font-size,inherit)
    }
</style>
