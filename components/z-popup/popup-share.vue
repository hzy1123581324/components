<template>
    <view class="popup-share">
        <view class="share-title"><text class="share-title-text">{{title}}</text></view>
        <view class="share-content">
            <view class="share-content-box">
                <view class="share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item,index)">
                    <image class="share-image" :src="item.icon" mode="aspectFill"></image>
                    <text class="share-text">{{item.text}}</text>
                </view>

            </view>
        </view>
        <view class="share-button-box">
            <button class="share-button" @click="close">取消</button>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'popupShare',
        props: {
            title: {
                type: String,
                default: '分享到'
            }
        },
        inject: ['popup'],
        data() {
            return {
                bottomData: [{
                        text: '微信',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
                        name: 'wx'
                    },
                    {
                        text: '支付宝',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
                        name: 'wx'
                    },
                    {
                        text: 'QQ',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
                        name: 'qq'
                    },
                    {
                        text: '新浪',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
                        name: 'sina'
                    },
                    {
                        text: '百度',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
                        name: 'copy'
                    },
                    {
                        text: '其他',
                        icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
                        name: 'more'
                    }
                ]
            }
        },
        created() {},
        methods: {
            /**
             * 选择内容
             */
            select(item, index) {
                this.$emit('select', {
                    item,
                    index
                }, () => {
                    this.popup.close()
                })
            },
            /**
             * 关闭窗口
             */
            close() {
                this.popup.close()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .popup-share {
        background-color: #fff;
    }

    .share-title {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 40px;
    }

    .share-title-text {
        font-size: 14px;
        color: #666;
    }

    .share-content {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: center;
        padding-top: 10px;
    }

    .share-content-box {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        flex-wrap: wrap;
        width: 360px;
    }

    .share-content-item {
        width: 90px;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: column;
        justify-content: center;
        padding: 10px 0;
        align-items: center;
    }

    .share-content-item:active {
        background-color: #f5f5f5;
    }

    .share-image {
        width: 30px;
        height: 30px;
    }

    .share-text {
        margin-top: 10px;
        font-size: 14px;
        color: #3B4144;
    }

    .share-button-box {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        padding: 10px 15px;
    }

    .share-button {
        flex: 1;
        border-radius: 50px;
        color: #666;
        font-size: 16px;
    }

    .share-button::after {
        border-radius: 50px;
    }
</style>
