<template>
    <view class="code-box" @click="__getcode">
        <text class="code-active" v-show="active_time>0">{{active_time}}s</text>
        <text class="code-default" v-show="active_time<=0">
            <slot>{{i18n&&i18n.$validation.getCode}}</slot>
        </text>
    </view>
</template>

<script>
    /**
     * counter 验证码组件
     * @description 验证码组件
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String,Number} time 倒计时时间
     * @property {Function} getcodefun 验证码发送成功回调
     * @property {String,Number} codetype 验证码类型//1=电话，2邮箱
     * @property {String,Number} quhao 手机区号
     * @property {String,Number} phone 向该手机号发送验证码
     * @property {String} email 向该邮箱发送验证码
     * @property {Boolean,Number,} trigger 接口调用后立即处于可点击状态
     * @example <codeTxt :num.sync="num"></codeTxt>
     */
    let timer = '';
    export default {
        name: 'codeTxt',
        props: {
            // 倒计时时间
            time: {
                type: [String, Number],
                default: 60,
            },
            // 回调
            getcodefun: {
                type: Function,
                // required: true,

                // default:(resolve, reject)=>{
                //     console.log(222222)
                //     setTimeout(()=>{
                //         resolve();
                //     },1000)
                // }
            },
            //  验证码类型
            codetype: {
                type: [Number, String],
                default: 1, //1=电话，2邮箱
            },
            // 手机区号
            quhao: {
                //区号
                type: [String, Number],
                default: '86',
            },
            // 向该手机号发送验证码
            phone: {
                type: [String, Number],
                // required: true,
            },
            // 向该邮箱发送验证码
            email: {
                type: [String],
                // required: true,
            },
            // 是否可点击
            trigger: {
                //接口调用后立即处于可点击状态
                type: [Boolean, Number, ],
                default: false,
            },
        },
        data() {
            return {
                active_time: 0,
            }
        },
        onLoad() {},
        mounted() {},
        methods: {
            async __getcode() {
                let {
                    active_time
                } = this;
                if (active_time <= 0) {
                    let res = '';
                    if (this.getcodefun) {

                        res = await this.getcodefun();
                    } else {
                        res = await this.getcode()
                    }

                    if (res) {
                        this.active_time = this.time;
                        timer = setInterval(() => {
                            let {
                                active_time
                            } = this;
                            this.active_time--;
                            if (this.active_time <= 0) {
                                clearInterval(timer);
                            }
                        }, 1000)
                    } else {

                        if (this.trigger) {
                            this.active_time = 0;
                            clearInterval(timer);
                        }
                    }
                } else {
                    return this.toast(this.i18n.$validation.getCoded)
                }
            },
            async getcode(resolve, reject) {
                let {
                    codetype
                } = this;
                let {
                    active_time,
                    phone,
                    email
                } = this;
                if (!phone && codetype == 1) {
                    return uni.showToast({
                        title: this.i18n.phone,
                        icon: 'none',
                    })
                }
                if (!email && codetype == 2) {
                    return uni.showToast({
                        title: this.i18n.email,
                        icon: 'none',
                    })
                }
                // if(!(/^1[3456789]\d{9}$/.test(phone+''))&&codetype==1){
                //     return uni.showToast({
                //             title: '手机号码有误，请重填',
                //             icon: 'none',
                //             success:()=> {
                //                 // this.$emit("checkphone", false);
                //                 // 以下支持双向数据绑定打开，以上关闭
                //                 this.$emit("update:phone", '');
                //             }
                //         })
                // }
                if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) && codetype == 2) {
                    return uni.showToast({
                        title: this.i18n.email1,
                        icon: 'none',
                        success: () => {
                            // this.$emit("checkphone", false);
                            // 以下支持双向数据绑定打开，以上关闭
                            this.$emit("update:email", '');
                        }
                    })
                }
                if (codetype == 1) {
                    return this.tel_code(resolve, reject);
                } else {
                    return this.email_code(resolve, reject);
                }
            },
            tel_code(resolve, reject) {
                var that = this;
                var data = {
                    action: 'authen',
                    xfrom: 'reg'
                };
                data.mobile = this.quhao + this.phone;
                this.$net.ajax("/service/sms", data, "POST").then((result) => {
                    // console.log(result)
                    if (result === false) {
                        reject();
                    } else {
                        resolve();
                    }
                })
            },
            email_code(resolve, reject) {
                var that = this;
                var data = {};
                data.email = this.email;
                this.$net.ajax("/service/send_email", data, "POST").then((result) => {
                    // console.log(result)
                    if (result === false) {
                        reject();
                    } else {
                        resolve();
                    }

                })
            },
        },
        watch: {

        },
        computed: {},
    }
</script>
<style scoped>
    .code-box {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: inherit;
    }

    .code-active {
        color: #2E74F3;
    }

    .code-default {
        cursor: pointer;
    }
</style>
