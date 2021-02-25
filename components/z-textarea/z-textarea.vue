<template>
    <view id="text-area-hzy">
        <textarea :class="['test-area-into',classStyle]" v-model="value" auto-focus="true" wx:if="showTextarea" @blur="textareaBlur"
            :placeholder="placeholder" />
        <view :class="['test-area-view',classStyle]" @tap="showTextarea = true">{{value||placeholder}}</view>
    </view>
</template>

<script>
/**
 * textarea 自定义多行文本框
 * @description 此组件一般用于解决textarea层级过高的问题
 * @tutorial https://www.uviewui.com/components/navbar.html
 * @property {String} value value值
 * @property {String} placeholder 占位符
 * @property {String} classStyle 外部样式
 * @example <z-textarea v-model="value" placeholder="占位符" classStyle=''></z-textarea>
 */
export default {
        props: {
            value: {
                type: String,
                default: '',
            },
            placeholder:{
                type: String,
                default: ''
            },
            classStyle: {
                
            }
            
        },
        data() {
            return {
                showTextarea: false,
            }
        },
        onLoad() {

        },
        methods: {
            textareaBlur(){
                this.showTextarea = false;
            }
        },
        watch: {

        },
        computed: {

        }
    }
    
</script>

<style>
    .test-area-into,.test-area-view{
        width: 100%;
        height: 100%;
    }
</style>
