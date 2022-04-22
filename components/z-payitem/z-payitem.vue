
<template>
    <view class="pay-item">
        <view class="password-items">
            <view :class="['password-item',modelValue.length>index&&'active']" v-for="(item,index) in maxlength" :key="item"></view>
        </view>
        <view class="pay-item-input">
            <input class="pay-item-init" :type="inputType"  :maxlength="maxlength" v-model="modelValue" @input="pwdChange" />
        </view>
    </view>
</template>

<script>
    /**
     * payItem 
     * @description  验证码密码输入框
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String} inputType 输入类型
     * @property {String} modelValue 用户输入的密码
     * @property {String} modelValue 用户输入的密码
     * @property {Boolean} keyboard  是否使用键盘
     * @example <payItem class="payItem" v-model="pwd"></payItem>
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
                validator(value) {
                  return ['number','text'].indexOf(value)>-1;
                }
            },
            // 用户输入的密码
            modelValue: {
                type: String,
                default: '',
            },
            // 密码最大长度
            maxlength: {
              type: [Number,String],
              default: 6,
              validator(value){
                return !isNaN(value);
              }
            },
            // 是否使用键盘
            keyboard: {
                type: Boolean,
                default: true,
            }

            
        },
        setup(prop,context){
           function  pwdChange(e){
                // console.log(e,'*************');
                // let pwd =e.detail.value;
                // if(pwd.length==6){
                    // context.emit('update:modelValue', e.detail.value);
                // }
                
            }
            
            return {
              pwdChange,
            }
        }
        // watch:{
        //     pwd(newval){
        //         this.pwd_ = newval;
        //     }
        // },
        // data() {
        //     return {
        //         pwd_: '',
        //     };
        // },

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
