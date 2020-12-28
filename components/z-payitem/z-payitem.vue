
<!-- 
 
 -->
<template>
    <view class="pay-item">
        <view class="password-items">
            <view :class="['password-item',pwd_.length>index&&'active']" v-for="(item,index) in 6" :key="item">
                
            </view>
        </view>
        <view class="pay-item-input">
            <input class="pay-item-init" :type="inputType" maxlength="6" v-model="pwd_" @input="pwdChange" />
        </view>
    </view>
</template>

<script>
    /**
     * payItem 
     * @description 商品自增自减
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String} inputType 输入类型
     * @property {String} pwd 用户输入的密码
     * @property {Boolean} keyboard  是否使用键盘
     * @example <payItem class="payItem" :pwd.sync="pwd"></payItem>
     * 
     * 修改样式,修改不成功，注意是否是优先级的问题
     * <style>
        .payItem{
            --cell-size: 54rpx;
            --cell-radius: 2rpx;
            --cell-bg: #F3F3F3;
            --cell-gauge: 30rpx;
            --dot-size: 12rpx;
            --dot-bg: #101010;
        }
     </style>
     */
    
    export default {
        name: 'payItem',
        props:{
            // 输入类型
            inputType:{
                type: String,
                default: 'number',
            },
            // 用户输入的密码
            pwd: {
                type: String,
                default: '',
            },
            // 是否使用键盘
            keyboard: {
                type: Boolean,
                default: true,
            }

            
        },
        watch:{
            pwd(newval){
                this.pwd_ = newval;
            }
        },
        data() {
            return {
                pwd_: '',
            };
        },
        methods:{
            pwdChange(e){
                console.log(e,'*************');
                let pwd =e.detail.value;
                // if(pwd.length==6){
                    this.$emit('update:pwd', pwd);
                // }
                
            },
        }
    }
</script>

<style scoped>
    .pay-item{
        position: relative;
        line-height: 1;
        display: inline-block;
        --cell-size: 54rpx;
        --cell-radius: 2rpx;
        --cell-bg: #F3F3F3;
        --cell-gauge: 30rpx;
        --dot-size: 12rpx;
        --dot-bg: #101010;
    }
    .pay-item view{
        line-height: inherit;
    }
    .password-item{
        display: inline-block;
        width: var(--cell-size);
        height: var(--cell-size);
        background-color: var(--cell-bg);
        border-radius: var(--cell-radius);
        margin-right: var(--cell-gauge);
        position: relative;
    }
    .password-item.active::after{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: calc(var(--dot-size) / -2);
        margin-top: calc(var(--dot-size) / -2);
        width: var(--dot-size);
        height: var(--dot-size);
        border-radius: calc(var(--dot-size) / 2);
        background-color: var(--dot-bg);
        box-sizing: border-box;
    }
    .pay-item-input{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
    .pay-item-init{
        width: 100%;
        height: 100%;
        min-height: 100%;
        opacity: 0;
    }
</style>
