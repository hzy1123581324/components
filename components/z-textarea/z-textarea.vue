<template>
    <view id="text-area-hzy">
        <textarea :class="['test-area-into',classStyle]" v-model="value" auto-focus="true" wx:if="showTextarea" @blur="textareaBlur"
            :placeholder="placeholder" />
        <view :class="['test-area-view',classStyle]" @tap="showTextarea = true">{{value||placeholder}}</view>
    </view>
</template>

<script>
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
