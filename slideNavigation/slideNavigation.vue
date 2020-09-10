<template>
    <view class="slide-navigation-box">
        <scroll-view id="scrollBox" :scroll-x="direction" :scroll-left='scollx' scroll-with-animation="true" class="slide-navigation-item" :style="countStyle" @scroll="scrollChange">
            <view class="menu-item" v-for="(items,index) in _list" :key="index" >
                <navigator :url="item.url" :open-type="item.show==1?'switchTab':'navigate'" hover-class="none" class="menu-box" v-for="item in items" :key="item.id" >
                    <view class="menu-icon"><image :src="item.pic"></image></view>
                    <view class="menu-title">{{ item.name }}</view>
                    <view class="menu-details">{{ item.name }}</view>
                </navigator>
            </view>
        </scroll-view>
        <!-- 进度条 -->
        <movable-area class="progress-bar"  v-if="_list.length>1">
            <movable-view class="progress-item" damping="100" :x="movex" direction="horizontal" :style='countProgressStyle' @change="movableChange"></movable-view>
        </movable-area>
    </view>
</template>

<script>
    /**
     * SlideNavigation 滑动导航
     * @description 
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {Array} list  传入数组
     * @property {Boolean} direction 是否横向滚动 
     * @property {String,Number} row  一版排列行数
     * @property {String,Number} column  一版排列的列数
     * @property {Sting,Number} iconSize 图标尺寸默认88
     * @example <SlideNavigation :lsit="list"></SlideNavigation>
     */
    let change_rate,move_type;
    export default {
        name: 'SlideNavigation',
        props: {
            list: {
                type: Array,
                default: ()=>{
                    return []
                }
            },
            direction: {
                type: Boolean,
                default: true,
            },
            row:{
                type: [String,Number],
                default: 2,
            },
            column:{
                type: [String,Number],
                default: 5,
            },
            iconSize:{
                type: [String,Number],
                default: 88,
            }, 
        },
        data() {
            return {
                movex: 0,
                scollx: 0,
                timer: null,
                move_type: null,
            };
        },
        created() {
            
        },
        watch:{
            // movex(newval,oldval){
                
            // },
            // scollx(newval,oldval){
                
            // }
        },
        computed:{
            // 处理传入数据 
            _list(){
                let {list,row,column} = this;
                let _list = [[]];
                let len = row * column;
                for (let i = 0; i < list.length; i++) {
                    let list_len = _list.length;
                    if(_list[list_len-1].length==len){
                        _list.push([])
                    }
                    _list[_list.length-1].push(list[i]);
                  // _list[i % _column] || (_list[i % _column] = []);
                  // _list[i % _column].push(list[i]);
                }
                console.log(_list,'处理后的数据')
                return _list;
            },
            // 修改样式
            countStyle(){
                let {column,iconSize} = this;
                column = 100/column;
                if(/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(iconSize)){
                    // #ifdef APP-PLUS 
                    iconSize = uni.upx2px(iconSize)+'px';
                    // #endif
                    // #ifdef H5
                    iconSize = uni.upx2px(iconSize)+'px';
                    // #endif
                    // 微信小程序
                    // #ifdef MP-WEIXIN
                    iconSize+='rpx';
                    // #endif

                }
                return `--item-width: ${column}%;--icon-size:${iconSize};`
            },
            // 进度条样式
            countProgressStyle(){
                let column = (100/this._list.length)||30;
                return `width: ${column}%;`
            }
        },
        mounted() {
        },
        methods: {
            // 移动进度条
            movableChange(event){
                // console.log(event,'888888888888888');
                if(this.move_type&&this.move_type!='movable'){
                    return ;
                }
                this.move_type = 'movable';
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this.move_type = null;
                },600)
                // this.movex = event.detail.x;
                if(!change_rate){
                    let top = 0;
                    let len = this._list.length;
                    const query = uni.createSelectorQuery().in(this);
                    query.select('#scrollBox').boundingClientRect(data => {
                      // console.log("得到布局位置信息" + JSON.stringify(data));
                      // console.log("节点离页面顶部的距离为" + data.top);
                      // top = data.top;
                      let scrollWidth = data.width * len;
                      change_rate= uni.upx2px(120)/scrollWidth;
                    }).exec();
                    // console.log(top,'99dd9d9d9d9d9d9d9')
                    // scrollWidth
                    // change_rate= uni.upx2px(120)/;
                }
                
                this.$nextTick(()=> {
                    this.scollx  = event.detail.x/change_rate;
                })
            },
            
            scrollChange(event){
                // console.log(event);
                if(this.move_type&&this.move_type!='scroll'){
                    return ;
                }
                this.move_type = 'scroll';
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this.move_type = null;
                },600)
                let scollx = event.detail.scrollLeft;
                if(!change_rate){
                    change_rate= uni.upx2px(120)/event.detail.scrollWidth;
                }
                // console.log(change_rate,'&&&&&&&&&&&&&&&&&&&')
                this.$nextTick(()=> {
                    this.movex = scollx * change_rate;
                })
            }
        }
    }
</script>

<style scoped>
    .slide-navigation-box{
        position: relative;
    }
    .slide-navigation-box::after,.slide-navigation-box::before{
        content: '';
        display: table;
        clear: both;
    }
    .slide-navigation-item{
        width: 100%;
/*         display: flex;
        flex-wrap: wrap; */
        white-space: nowrap;
        /* position: relative; */
        margin-bottom: 38upx;
    }
    .menu-item{
        vertical-align: text-top;
        display: inline-block;
        width: 100%;
        height: 100%;
        white-space: normal;
        padding-top: 41upx;
    }
    .menu-box{
        width: var(--item-width);
        text-align: center;
        display: inline-block;
        padding-bottom: 36upx;
        color: #828282;
        font-size: 18upx;
        line-height: 25upx;
    }
    .menu-title{
        font-size: 24upx;
        margin-top: 10upx;
        line-height: 34upx;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000000;
    }
    .menu-icon image{
        width:var(--icon-size);
        height:var(--icon-size);
        border-radius: 50%;
        /* margin: 0 auto; */
    }
    
    /* 进度条 */
    .progress-bar{
        /* position: absolute; */
        width: 120upx;
        height: 6upx;
        border-radius: 16upx;
        background-color: #e0e0e0;
        /* bottom:26upx; */
        /* left: 50%; */
        /* margin-left: -50upx; */
        margin: 0 auto 26upx;
        /* z-index: 90; */
    }
    .progress-item{
        height: 100%;
        display: inline-block;
        
        border-radius: 16upx;
        background-color: #E22F24;
    }
</style>
