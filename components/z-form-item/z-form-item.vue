<template>
    <view :class="['form-box',layout]">
        <label class="label" :for="labelid">
            <slot name="label">
                {{labelName}}
            </slot>
        </label>
        <view class="">
            <slot name="default"></slot>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'z-form-item',
        props:{
            layout: {
                type: String,
                default: 'line',
                validator: function (value) {
                        // 这个值必须匹配下列字符串中的一个
                        let typeTxt="line,block";//line 在同一行，block另起一行
                        let typeList = typeTxt.split(',');
                        return typeList.indexOf(value) !== -1
                }
            },
            
        },
        data(){
            return {
                
            }
        }
    }
</script>

<style scoped>
    
</style>
