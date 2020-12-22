<template>
    <view :class="['icon-box',type]">
        
    </view>
</template>

<script>
    /**
     * z-icon 图标
     * @description 此为css样式生成的图标
     * @tutorial https://www.uviewui.com/components/z-icon.html
     * @param {String} type 图标类型  
     * @example <z-icon class="icon" type="delta-rg"></z-icon> 
        <style>
            .icon{
                --icon-size : 图标大小,默认28upx
            }
        </style>
     */
    export default{
        name: 'z-icon',
        props:{
            type: String,
            default: '',
            validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    let typeTxt="delta-rg,delta-lf,delta-top,delta-btm";
                    let typeList = typeTxt.split(',');
                    return typeList.indexOf(value) !== -1
                  }
            
        },
        data(){
            return {}
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    @import './icon.css';
    .icon-box{
        --size: 28upx;
        display: inline-block;
        width: 1em;
        height: 1em;
        position: relative;
        font-size: var(--icon-size,var(--font-size,var(--size)));
        
    }
    
</style>
