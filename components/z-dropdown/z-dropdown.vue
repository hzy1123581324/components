<template>
    <view class="dropdown-box">
        <view class="dropdown-title">
            <view class="dropdown-title-item" v-for="(item,index) in list" :key="item.id" @click="titleclick(index)">
                <slot name="drop-title" v-bind:item ="item">
                    <text>{{item[keyname]}}</text>
                    <z-icon type="down-arrow" :class="['title-icon',titleIndex==index&&'active']"></z-icon>
                </slot>
            </view>
        </view>
        <view class="dropdown-content" v-show="titleIndex>=0">
            <view class="dropdown-mask">
                
            </view>
            <view class="dropdown-main">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'z-dropdown',
        props:{
            list: {
              type: Array,
              default:()=>{
                  return [];
              }
            },
            keyname: {
                type: String,
                default: 'name',
            },
            
        },
        data(){
            return {
               titleIndex: -1,
            }
        },
        methods:{
            titleclick(index){
                if(this.titleIndex == index){
                    this.titleIndex =-1;
                }else{
                    this.titleIndex = index;
                }
            }
        }
    }
</script>

<style scoped>
    .dropdown-box{
        width: 100%;
    }
    .dropdown-title{
        width: 100%;
        display: flex;
        text-align: center;
        background-color: var(--dropdown-head-bg-color,#fff);
    }
    .dropdown-title-item{
        --height: 88rpx;
        flex: 1 0;
        height: var(--dropdown-head-h,var(--height));
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .title-icon{
        margin-left: 1em;
        margin-top: -0.4em;
        transform-origin: center 75%;
    }
    .active{
        transform: rotate(-180deg);
    }
    
    /* 弹出内容 */
    .dropdown-mask{
        position: absolute;
        min-height: 1px;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(51,51,51,0.5);
        /* box-shadow: ; */
    }
    .dropdown-content{
        position: relative;
        max-height: 100vh;
        overflow: hidden;
    }
</style>
