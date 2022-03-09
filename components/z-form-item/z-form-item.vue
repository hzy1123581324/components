<template>
    <view :class="['form-item-box',layout]">
        <label class="label" :for="labelid">
            <slot name="label">
                {{labelName}}
            </slot>
        </label>
        <view class="input-view ">
            <slot name="default">
                <!-- 输入框 -->
                <input class="input-item" :id="labelid" type="text"  :password="type=='password'"
                v-model="inputvalue"  :placeholder="placeholder" 
                placeholder-class="place" v-if="type!= 'textarea'" />
                <!-- 多行文本框 -->
                <textarea class="text-area-item input-item" :id="labelid" :auto-height="autoHeight" v-model="inputvalue"  :placeholder="placeholder" 
                placeholder-class="place" v-else></textarea>
                <z-icon :class="['input-icon' ,inputvalue?'active':'inactive']" type="icon-close-circular" @click.native="inputvalue=''"></z-icon>
                <!-- <z-icon :class="[inputvalue?'active':'inactive']" type="icon-close-circular" @click.native="inputvalue=''"></z-icon> -->
            </slot>
        </view>
    </view>
</template>

<script>
    /**
     * form-item 表单item
     * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
     * @tutorial https://www.uviewui.com/components/topTips.html
     * @example <z-form-item class="form-item"></z-form-item>
        <style>
            .form-item{
                --form-item-box-pad: 组件最外层的内边距 。默认 32rpx
                --form-item-label-font-size label 的字体大小  默认24rpx
                --form-item-label-lh  label 的行高 默认 1
                --form-item-label-color  label 的字体颜色 默认--color-main
                --form-item-label-mar-rg   label 的右外边距 默认 2em 
                --form-item-input-height  组件输入框 高度 默认 98rpx
                --form-item-input-mar-top 组件输入框的margin-top 默认 0 
                --form-item-input-color  组件输入框有值时的颜色  默认--color-main
                --form-item-input-place-color  组件输入框占位符的颜色
                --form-item-input-font-size: 组件输入框的字体大小  默认28rpx
                --form-item-text-area-height: 
            }
        </style>
     */
    export default {
        name: 'z-form-item',
        props:{
            type: {
                type: String,
                default: 'text',
            },
            labelid: {
                type: String,
                default: '',
            },
            // 
            labelName: {
                type: String,
                default: '',
            },
            //占位符
            placeholder: {
                type: String,
                default: '',
            },
            // 多行文本框是否自动增高
            autoHeight: {
                type: Boolean,
                default: false
            },
            layout: {
                type: String,
                default: 'block',
                validator: function (value) {
                        // 这个值必须匹配下列字符串中的一个
                        let typeTxt="line,block";//line 在同一行，block另起一行
                        // let typeList = typeTxt.split(',');
                        return typeTxt.indexOf(value) !== -1
                }
            },
            
        },
        data(){
            return {
                inputvalue: '',
            }
        },
        watch: {
            inputvalue(newval){
                // 关联v-model
                //  v-model 等价于  :value='yourData' @input='val => yourData = val'
                this.$emit("input",newval);
            }
        }
        
    }
</script>

<style scoped>
    .form-item-box{
        --pad: 32rpx;
        --input-height: 98rpx;
        padding:var(--form-item-box-pad,var(--pad));
    }
    .form-item-box.line{
        display: flex;
        align-items: center;
    }
    .label{
        --size: 24rpx;
        font-size: var(--form-item-label-font-size,var(--size));
        line-height: var(--form-item-label-lh,1);
        color: var(--form-item-label-color,var(--color-main));
        margin-right: var(--form-item-label-mar-rg,2em);
    }
    .input-view{
        display: flex;
        align-items: center;
    }
    .input-item{
        --font-size: 28rpx;
        height: var(--form-item-input-height,var(--input-height));
        margin-top: var(--form-item-input-mar-top,0);
        flex-grow: 1;
        width: 50%;
        font-size: var(--form-item-input-font-size,var(--font-size));
        color: var(--form-item-input-color, var(--color-main))
    }
    .text-area-item{
        height: var(--form-item-text-area-height,var(--input-height));
    }
    .place{
        color: var(--form-item-input-place-color,var(--placeholder-color))
    }
    .active{
        pointer-events: auto;
        opacity: 1;
    }
    .inactive{
        pointer-events: none;
        opacity: 0;
    }
    .input-icon{
        --font-size: 32rpx;
        font-size:var(--form-item-icon-font-size,var(--font-size));
    }
</style>
