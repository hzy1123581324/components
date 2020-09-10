<template>
    <view class="chat-box">
        <!-- 聊天室主体 -->
        <view class="chat-title">某某某</view>
        <view class="chat-main">
            <scroll-view scroll-y="true" class="chat-main-scroll">

                <view v-for="item in chatRecord" :key="item.id"></view>
            </scroll-view>
        </view>
        <!-- 输入框 -->
        <view class="chat-input-area">
            <view class="input-area" contenteditable="true">

            </view>
            <view class="send-btn">发送</view>
        </view>
    </view>
</template>

<script>
    /**
     * counter 聊天室
     * @description 自定义聊天室
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String,Number} time 倒计时时间
     * @example <chat></chat>
     */

    export default {
        name: "chat",
        props: {},
        data() {
            return {
                chatRecord: [{
                    date: 1010101,
                    id: 1,
                    originId: 1,
                    type: 1, //1文本，2图片，3视频，4.
                }, ],
            };
        },
        onLoad() {},
        mounted() {},
        methods: {},
        watch: {},
        computed: {},
    };
</script>
<style scoped>
    .chat-box {
        width: 100%;
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    .chat-title {
        text-align: center;
        line-height: 76upx;
        font-size: 32upx;
        font-weight: 600;
    }

    .chat-main {
        flex-grow: 1;
        height: 50vh;
    }

    .chat-main-scroll {
        max-height: 100%;
    }

    .chat-input-area,
    .chat-title {
        flex-shrink: 0;
    }

    .chat-input-area {
        display: flex;
        height: 80upx;
        white-space: pre-wrap;

    }

    .input-area {
        /* contenteditable:true; */
        flex-grow: 1;

    }
</style>
