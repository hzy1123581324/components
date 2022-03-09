<template>
    <view :class="['sticky-box',elClass]" ref="stickyBoxs" style="`--cell-height:${height}px;`">
        <view :class="['sticky-absolute',fixed&&'active']" :style="stickyStyle">
            <slot></slot>
        </view>
        <view class="sticky-relate" >
            <slot></slot>
        </view>
    </view>
</template>

<script>
    /**
     * sticky 吸顶
     * @description 该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时， 就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。
     * @tutorial https://www.uviewui.com/components/sticky.html
     * @property {String Number} offset 吸顶时与顶部的距离，单位rpx（默认0）
     * @property {String Number} index 自定义标识，用于区分是哪一个组件
     * @event {Function} fixed 组件吸顶时触发
     * @example <sticky offset="200"><view>塞下秋来风景异，衡阳雁去无留意</view></sticky>
     */
    import guid from "../../utils/guid.js";
    let height = 0;
    export default {
        name: "sticky",
        props: {
            // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
            offset: {
                type: [Number, String],
                default: 0
            },
            //列表中的索引值
            index: {
                type: [Number, String],
                default: ''
            },
        },
        data() {
            return {
                // fixed: false,
                height: 'auto',
                stickyTop: -1,
                elClass: guid(),
                left: 0,
                width: 'auto',
                // offsetTop: 0,
            };
        },
        watch: {
            offset(val) {
                // this.initObserver();
                this.getRaceSize();
            },
            "parentRect.top": function(){
                this.getRaceSize();
            }
        },
        inject: ['getScrollTop','getParentRect'],
        computed: {
            stickyStyle() {
                let h_style=`height:${this.height||'auto'}`
                return `--offset: ${uni.upx2px(this.offset)}px;${h_style}`;
            },
            scrollTop() {
                // 该方法从父组件传递
                return this.getScrollTop();
            },
            parentRect(){
                return this.getParentRect();
            },
            fixed() {
                let {
                    stickyTop,
                    scrollTop,//轮动距离
                } = this;
                console.log(stickyTop,
                    scrollTop,'999999999999999999999999999999')
                    if(stickyTop==-1){
                        return false;
                    }else if (scrollTop - stickyTop >= 0) {
                    this.$emit('fixed')
                    return true;
                }
                return false;
            }
        },
        mounted() {
            this.getRaceSize();
            // console.log('888888888888');
        },
        methods: {
            // 计算吸顶距离
            async getRaceSize() {
                let stickyTop = 0;
                let view = uni.createSelectorQuery().in(this).select('.' + this.elClass);
                // await view.boundingClientRect(data => {
                //     console.log("得到布局位置信息" + JSON.stringify(data));
                //     // console.log("节点离页面顶部的距离为" + data.top);
                //     let stickyTop = data.top - uni.upx2px(this.offset);
                //     console.log(stickyTop,'7777777');
                //     this.height = data.height;
                //     this.stickyTop = stickyTop;
                // })
                // .scrollOffset((data)=>{
                //     console.log(data,'曾是是的咖啡机阿拉山口的风景水电费 ')
                // }).exec();
                
                
                view = uni.createSelectorQuery().in(this).select('.' + this.elClass);
                
                view
                // .fields({
                //     dataset: true,
                //   size: true,
                //   scrollOffset: true
                // }, data => {
                //   console.log("得到节点信息" + JSON.stringify(data));
                //   console.log("节点的宽为" + data.width);
                // })
                .boundingClientRect(data => {
                    // console.log("得到布局位置信息" + JSON.stringify(data));
                    // console.log("节点离页面顶部的距离为" + data.top);
                    let stickyTop = data.top - uni.upx2px(this.offset)- (this.parentRect.top||0);
                    // console.log(stickyTop,'7777777');
                    this.height = data.height;
                    this.stickyTop = stickyTop;
                }).exec();
                
                return stickyTop;
            }
        }
    };
</script>

<style scoped lang="scss">
    .sticky-box {
        // --cell-height: 50px;
        position: unset;
    }

    .sticky-absolute {
        position: absolute;
        top: var(--offset, 0);
        left: 0;
        right: 0;
        z-index: 99;
        width: 100%;
        // height: 100%;
        height: var(--cell-height, auto);
        text-align: inherit;
        background-color: #fff;
        pointer-events: none;
        opacity: 0;
    }

    .sticky-absolute.active {
        transition: all ease-in-out 0.1s 0s; 
        pointer-events: auto;
        opacity: 1;
    }
    
</style>
