<template>
    <view class="text-area-box">
        <textarea :class="['test-area-into',classStyle]" v-model="modelValue" :maxlength="maxlength" :auto-height="true" :auto-focus="true" @blur="textareaBlur"
            :placeholder="placeholder" placeholder-class="placeholder-class" @input="change" v-if="showTextarea" />
        <view :class="['test-area-view',currentValue==''&&'placeholder-class' ,classStyle]"  v-show="!showTextarea"  @click="showTextarea = true">{{currentValue||placeholder}}</view>
    </view>
</template>

<script setup>
    /**
     * textarea 自定义多行文本框
     * @description 此组件一般用于解决textarea层级过高的问题
     * @tutorial https://www.uviewui.com/components/navbar.html
     * @property {String} value value值
     * @property {String} placeholder 占位符
     * @property {String} classStyle 外部样式
     * @example <z-textarea v-model="value" placeholder="占位符" classStyle=''></z-textarea>
     */
    import {ref} from "vue";
    let currentValue = ref("");
    let showTextarea = ref(false);
    const props = defineProps({
        autoFocus: {
            type: Boolean,
            default: true,
        },
        modelValue: {
            type: String,
            default: '',
        },
        maxlength: {
            type: Number,
            default: -1,
        },
        placeholder: {
            type: String,
            default: ''
        },
        classStyle: {
            type: String,
            default: ''
        }

    });

    function textareaBlur() {
        showTextarea = false;
    }
    
    function change(e){
        currentValue.value = e.detail.value;
    }
    function clear(){
        
    }
</script>

<style scoped>
    .text-area-box{
        padding: var(--textarea-padding,0);
        position: relative;
        box-sizing: border-box;
    }
    .test-area-into,
    .test-area-view {
        width: 100%;
        height: 100%;
        min-height: inherit;
        max-height: inherit;
        font-size: inherit;
        color: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        word-wrap: break-word;
        word-break: break-all;
        word-spacing: normal;
        box-sizing: border-box;
    }

    .placeholder-class{
        color: var(var(--textarea-place-color),inherit);
        font-size: var(var(--textarea-place-font-size),inherit);
    }
    .test-area-into {
        z-index: 10;
    }
    .iconicon-shanchu{
        transform: translateY(-50rpx);
    }
</style>
