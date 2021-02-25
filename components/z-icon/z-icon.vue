<template>
    <view class="icon-box" :class="['iconfont',type]" :style='coinStyle'></view>
</template>

<script>
    /**
     * z-icon 图标
     * @description 此为css样式生成的图标
     * @tutorial https://www.uviewui.com/components/z-icon.html
     * @param {String} type 图标类型  
     * @param {String} animation 改变图标是否 有动画效果 默认是false
     * @example <z-icon class="icon" type="delta-rg"></z-icon> 
        <style>
            .icon{
                --icon-size : 图标大小,默认28rpx
                --icon-color: 图标颜色 
            }
        </style>
     */
    export default {
        name: 'z-icon',
        props: {
            // 图标类型
            type: {
                required: true,
                type: String,
                default: '',
                // validator: (value) => {
                //     // 这个值必须匹配下列字符串中的一个
                //     let typeTxt =
                //         "delta-rg,delta-lf,delta-top,delta-btm,\
                //         up-arrow,left-arrow,right-arrow,down-arrow,\
                //         close,add,del";
                //     let typeList = typeTxt.split(',');
                //     return typeList.indexOf(value) !== -1
                // },
            },
            animation: {
                type: Boolean,
                default: false,
            }



        },
        computed:{
          coinStyle(){
              let style = '';
              if(this.animation){
                  style+=`--icon-transition: all ease-in-out 0.3s 0;`
              }
              
              return style
          }  
        },
        data() {
            return {}
        },
        methods: {

        }
    }
</script>
<style>

</style>
<style scoped>
    @import './icon.css';
    @import '../../iconfont.css';
    .icon-box {
        --size: 28rpx;
        display: inline-block;
        width: 1em;
        height: 1em;
        position: relative;
        transition: all ease-in-out 0.3s 0s;
        /* transition: var(--icon-transition,none); */
        color: var(--icon-color, var(--mian-color, inherit));
        font-size: var(--icon-size, var(--font-size, var(--size)));
        vertical-align: top;
        flex-shrink: 0;
    }
    .icon-box::after,.icon-box::before{
        /* content: ""; */
        transition: var(--icon-transition,none);
    }
</style>
